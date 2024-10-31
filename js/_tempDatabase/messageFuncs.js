import{
    GenerateAPIRes
} from "../_tempDatabase/_dummyAPIResponse.js";


import{
    Settings
} from "../_settings/settings.js";

import{
    MyCodeErr
} from "../_errorHandler/errorHandler.js";


import{
    MsgApis
} from "../_apis/msgApis.js";



import{
    MessagesDB,
    MsgOnSendingDB,
    ChatBoxDB
} from "../_tempDatabase/messages.js";

import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
    MessageBodyDOM,
    MsgDateDOM,
    MsgWraperDOM,
    MsgSendingWraperDOM,
    DeletedMsgDOM,
    StarDOM,
    MsgMoreOptionsDOM,
    LoadOlderMsgsBtnDOM
} from "../DOM/msgPageDOM/msgDOM/msgBodyDOM.js";

import{
    OtherFunctions
} from "../msgPage/others/otherFonctions.js";

import{
    UpdateMsgDOM
} from "../DOM/msgPageDOM/msgDOM/updateMsgBody.js";

import{
    ChatFuncs
} from "../_tempDatabase/chatsFunc.js";

import{
    MsgBody
} from "../msgPage/message/messageBody.js";

import{
    DOMGetter,
    GlobalVars
} from "../msgPage/others/globalVariables.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import{
    MyProfile
} from "../_tempDatabase/profile.js";

import{
    MsgGroupActivations
} from "../msgPage/message/messageGroupActivations.js";




class UnseenMsgIDs{
    static add(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        if(!MessagesDB.unseenMsgIDs[chatID_DB]){
            MessagesDB.unseenMsgIDs[chatID_DB]=[];
        }
        let index=MessagesDB.unseenMsgIDs[chatID_DB].indexOf(msgID);
        if(index<0){
            MessagesDB.unseenMsgIDs[chatID_DB].push(msgID);
        }
    }

    static remove(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        if(!MessagesDB.unseenMsgIDs[chatID_DB]){
            return;
        }
        let index=MessagesDB.unseenMsgIDs[chatID_DB].indexOf(msgID);
        if(index>=0){
            MessagesDB.unseenMsgIDs[chatID_DB].splice(index, 1);
        }
    }

    static get(chatID, single=false){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        if(!single){
            return MessagesDB.unseenMsgIDs[chatID_DB];
        }
        if(!MessagesDB.unseenMsgIDs[chatID_DB]){
            return;
        }
        return MessagesDB.unseenMsgIDs[chatID_DB][0];
    }

    static count(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(
        //    "chatID:"+chatID, 
        //    "chatID_DB:"+chatID_DB, 
        //    "MessagesDB.unseenMsgIDs[chatID_DB]:"+MessagesDB.unseenMsgIDs[chatID_DB], 
        // )
        let count=MessagesDB.unseenMsgIDs[chatID_DB].length;
        return count;
    }
}



class MessageFuncs{
    static async fetchOldMsgs(chatID, fetchToID=null){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        const firstMsgInDBID=MessageFuncs.getFirstMsgInDBID(chatID_DB);
        const length=Settings.ApiSettings.messagesPerAPICall;
        if(MessagesDB.gotAllMsgs(chatID_DB)){
            return null;
        }

        fetchToID=MsgBody.makeMsgID_DB_Usable(fetchToID);

        if(fetchToID){
            const messageSection=DOMGetter.getMessage();
            let loaderBackgroundElem=DOMGetter.getLoaderBackgroundElem(messageSection);
            let contentLoaderElem=DOMGetter.getContentLoaderElem(messageSection);
            if(!loaderBackgroundElem){LoaderBackgroundDOM.append(messageSection, LoaderBackgroundDOM.create());;}
            if(!contentLoaderElem){ContentLoaderDOM.append(messageSection, ContentLoaderDOM.create(true, "boxes"));}
        }

        let messages=await MsgApis.fetchOldMsgs(chatID, fetchToID, firstMsgInDBID, length);

        if(!messages){
            alert("err");
            console.log("err");
            return;
        }

        if(messages.length<length){
            MessagesDB.gotAllMsgsStatus[chatID_DB]=true;
        }

        messages=messages.sort((a,b)=>b.msgID - a.msgID);    
        messages.forEach(msgObj => {
            MessagesDB.addOldMessage(chatID_DB, msgObj);
        });

        if(fetchToID){
            const messageSection=DOMGetter.getMessage();
            let loaderBackgroundElem=DOMGetter.getLoaderBackgroundElem(messageSection);
            let contentLoaderElem=DOMGetter.getContentLoaderElem(messageSection);
            if(loaderBackgroundElem){LoaderBackgroundDOM.delete(messageSection);}
            if(contentLoaderElem){ContentLoaderDOM.delete(messageSection);}
        }
    }

    static pushInNewMsg(chatID, newMsgInstance, previousMsgInstance){
        if(!ChatFuncs.isActiveChat(chatID)){
            let errMsg="some error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        if(newMsgInstance==previousMsgInstance){
            let errMsg="some error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        // append date if needed
        if(previousMsgInstance["dateSentString"]!=newMsgInstance["dateSentString"]){
            MsgDateDOM.append(MsgDateDOM.create(newMsgInstance["dateSentString"]));
        }

        if(!newMsgInstance["deleted"]){
            let msgIns=MsgWraperDOM.create(newMsgInstance);

            if(MessageFuncs.isSelectingMsgs()){
                MsgGroupActivations.allSelected_Megchecked(msgIns);
            }

            MsgWraperDOM.append(msgIns);
        }else{
            // let sent=newMsgInstance["isSender"];
            // let first=newMsgInstance["first"];
            DeletedMsgDOM.append(DeletedMsgDOM.create(newMsgInstance));
        }


        const msgID=newMsgInstance.msgID;
        const msgIsSeeable=MsgBody.msgIsSeeable(msgID);
        if(msgIsSeeable===null){
            let errMsg="mg id not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        if(msgIsSeeable){
            MessageFuncs.sendMsgSeenSignal(chatID, msgID)
        }
    }

    static pushInMsgSending(chatID, MsgSendingInstance){
        if(!ChatFuncs.isActiveChat(chatID)){
            let errMsg="ome error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        let previousMsgInstance;
        let skip=false;

        if(MsgOnSendingDB.hasMsgSending(chatID)){
            skip=true;
            previousMsgInstance=MsgOnSendingDB.getChatMsgOnSendingAsArr(chatID);
            previousMsgInstance=previousMsgInstance.filter((msg)=>msg.date<MsgSendingInstance.date);
            previousMsgInstance=previousMsgInstance[previousMsgInstance.length-1];
            if(!previousMsgInstance){
                skip=false;
            }
        }
        if(!skip){
            previousMsgInstance=MessageFuncs.getChatMsgsAsArr(chatID)
            previousMsgInstance=previousMsgInstance[previousMsgInstance.length-1];
        }

        if(previousMsgInstance["dateSentString"]!=MsgSendingInstance["dateSentString"]){
            MsgDateDOM.append(MsgDateDOM.create(MsgSendingInstance["dateSentString"]));
        }
        
        MsgSendingWraperDOM.append(MsgSendingWraperDOM.create(MsgSendingInstance));
    }
    


    static pushMessagesIn(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        if(!MessagesDB.messages[chatID_DB]){
            console.log("pushMessagesIn, no run")

            MessageFuncs.fetchMessages(chatID);
        }
        if(!ChatFuncs.isActiveChat(chatID)){
            return;
        }



        const msgPerPage=10;
        let firseUnseenMsgID=UnseenMsgIDs.get(chatID_DB, true);
        if(!firseUnseenMsgID){
            firseUnseenMsgID=0;
        }
        // let msgsObjToArr=Object.values(MessagesDB.messages[chatID_DB]);
        let msgsObjToArr=MessageFuncs.getChatMsgsAsArr(chatID);
        msgsObjToArr=msgsObjToArr.sort((a,b)=>b.msgID - a.msgID);
        // console.log(msgsObjToArr)
        let currentMsgID=0;
        // return;
        let index=0;
        let currentMsg;
        let lastAppendedElem=null;
        let hitSeenMsgLimit=false;
        let hitPageAndSeenLimit=false;

        while(!hitPageAndSeenLimit && index<msgsObjToArr.length){
            let currentApendElem;
            let msg=msgsObjToArr[index];
            currentMsg=msg;
            currentMsgID=msg.msgID;


            if(!firseUnseenMsgID){
                hitPageAndSeenLimit=index>=msgPerPage-1;
            }else{
                hitSeenMsgLimit=currentMsgID<=firseUnseenMsgID;
                hitPageAndSeenLimit=hitSeenMsgLimit&&index>msgPerPage-1;
            }

            // console.log(
            //     hitSeenMsgLimit,
            //     index>=msgPerPage-1,
            //     hitPageAndSeenLimit,
            // )

            if(!index){
                if(!msg["deleted"]){
                    currentApendElem=MsgWraperDOM.create(msg);

                    if(MessageFuncs.isSelectingMsgs()){
                        MsgGroupActivations.allSelected_Megchecked(currentApendElem);
                    }

                    MsgWraperDOM.append(currentApendElem);
                }else{
                    // let sent=msgg["isSender"];
                    // let first=msgg["first"];
                    currentApendElem=DeletedMsgDOM.create(msg);
                    DeletedMsgDOM.append(currentApendElem);
                }
                index++;
                lastAppendedElem=currentApendElem;
                continue;
            }


            let previousDateString=msgsObjToArr[index-1].dateSentString;
            if(previousDateString!=msg.dateSentString){
                currentApendElem=MsgDateDOM.create(previousDateString);
                MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
                lastAppendedElem=currentApendElem;
            }
            if(!msg["deleted"]){
                currentApendElem=MsgWraperDOM.create(msg);

                if(MessageFuncs.isSelectingMsgs()){
                    MsgGroupActivations.allSelected_Megchecked(currentApendElem);
                }

                MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
            }else{
                // let sent=msgg["isSender"];
                // let first=msgg["first"];
                currentApendElem=DeletedMsgDOM.create(msg);
                MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
            }
            lastAppendedElem=currentApendElem;
            index++;
        }

        if(currentMsg){
            let currentApendElem=MsgDateDOM.create(currentMsg["dateSentString"]);
            MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
            lastAppendedElem=currentApendElem;
        }

        let loadOlderMsgsBtn=DOMGetter.getLoadOlderMsgsBtn();
        if(loadOlderMsgsBtn){
            LoadOlderMsgsBtnDOM.delete();
        }

        if(msgsObjToArr.length>msgPerPage){
            LoadOlderMsgsBtnDOM.append(LoadOlderMsgsBtnDOM.create());
        }
    
        OtherFunctions.activateMsgDateBeforeAfterfunc();
    }

    static pushMsgSendingIn(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        if(!MsgOnSendingDB.hasMsgSending(chatID_DB)){
            return;
        }


        if(!ChatFuncs.isActiveChat(chatID_DB)){
            return;
        }

        let previousMsgInstance=MessageFuncs.getChatMsgsAsArr(chatID)
        previousMsgInstance=previousMsgInstance[previousMsgInstance.length-1];



        // let msgsObjToArr=Object.values(MessagesDB.messages[chatID_DB]);
        let msgSendingArr=MsgOnSendingDB.getChatMsgOnSendingAsArr(chatID);
        let index=0;
        msgSendingArr.forEach(msgSending =>{
            if(index){
                previousMsgInstance=MsgOnSendingDB.getChatMsgOnSendingAsArr(chatID);
                previousMsgInstance=previousMsgInstance.filter((msg)=>msg.date<msgSending.date);
                previousMsgInstance=previousMsgInstance[previousMsgInstance.length-1];
            }
    
            if(previousMsgInstance["dateSentString"]!=msgSending["dateSentString"]){
                MsgDateDOM.append(MsgDateDOM.create(msgSending["dateSentString"]));
            }
            
            MsgSendingWraperDOM.append(MsgSendingWraperDOM.create(msgSending));
            index++;
        });


    }


    static async pushInPreviousMsgs(chatID, pushToID=null){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        const firstMsgOnDomId=MsgBody.getFirstMsgOnDomId();
        const msgPerPage=10;

        if(!MessageFuncs.isValidMsgID(chatID_DB, firstMsgOnDomId)){
            let errMsg="some error occured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const firstMsgPos=MsgBody.getElemAbsolutePos(firstMsgOnDomId, true)

        if(!ChatFuncs.isActiveChat(chatID_DB)){
            return;
        }

        // let msgsObjToArr=Object.values(MessagesDB.messages[chatID_DB]);
        let msgsObjToArr=MessageFuncs.getChatMsgsAsArr(chatID_DB);
        msgsObjToArr=msgsObjToArr.sort((a,b)=>b.msgID - a.msgID);
        // console.log(msgsObjToArr)
        msgsObjToArr=msgsObjToArr.filter((msgObj)=>msgObj.msgID<firstMsgOnDomId);
        // console.log(msgsObjToArr);

        if(!pushToID){
            if(!MessagesDB.gotAllMsgs(chatID_DB)){
                if(msgsObjToArr.length<msgPerPage){
                    await MessageFuncs.fetchOldMsgs(chatID_DB);
                    msgsObjToArr=MessageFuncs.getChatMsgsAsArr(chatID_DB);
                    msgsObjToArr=msgsObjToArr.sort((a,b)=>b.msgID - a.msgID);
                    // console.log(msgsObjToArr)
                    msgsObjToArr=msgsObjToArr.filter((msgObj)=>msgObj.msgID<firstMsgOnDomId);
                    // console.log(msgsObjToArr);
                }
            }
        }
        
        if(pushToID){
            if(!MessageFuncs.isValidMsgID(chatID_DB, pushToID)){
                await MessageFuncs.fetchOldMsgs(chatID_DB, pushToID);
            }

            if(!MessageFuncs.isValidMsgID(chatID_DB, pushToID)){
                let errMsg="some error occured";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }

            msgsObjToArr=MessageFuncs.getChatMsgsAsArr(chatID_DB);
            msgsObjToArr=msgsObjToArr.sort((a,b)=>b.msgID - a.msgID);
            // console.log(msgsObjToArr)
            msgsObjToArr=msgsObjToArr.filter((msgObj)=>msgObj.msgID<firstMsgOnDomId);
            // console.log(msgsObjToArr);
        }


        if(!msgsObjToArr[0]){
            let errMsg="some error occured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }



        let index=0;
        let currentMsg;
        let currentMsgID=msgsObjToArr[0].msgID+1;
        let lastAppendedElem=null;

        let firstMsgOnDomInstance=MessageFuncs.getMessageObj(chatID_DB, firstMsgOnDomId);
        if(firstMsgOnDomInstance){

            MsgDateDOM.deleteFirstOnPage();

            lastAppendedElem=MsgWraperDOM.create(firstMsgOnDomInstance);

            if(MessageFuncs.isSelectingMsgs()){
                MsgGroupActivations.allSelected_Megchecked(lastAppendedElem);
                if(MsgBody.msgIsSelected(firstMsgOnDomInstance.msgID)){
                    MessageBodyDOM.markAsSelected(lastAppendedElem, chatID_DB);
                }
            }

            MsgWraperDOM.replace(firstMsgOnDomId, lastAppendedElem);

            let nextDateString=msgsObjToArr[0].dateSentString;
            if(nextDateString!=firstMsgOnDomInstance.dateSentString){
                let currentApendElem=MsgDateDOM.create(firstMsgOnDomInstance.dateSentString);
                MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
                lastAppendedElem=currentApendElem;
            }
        }

        let continu;
        if(pushToID){
            continu=pushToID<currentMsgID;
        }else{
            continu=index<msgPerPage && index<msgsObjToArr.length;
        }
        while(continu){
            let currentApendElem;
            let msg=msgsObjToArr[index];
            currentMsg=msg;
            currentMsgID=currentMsg.msgID;

            if(index){
                let previousDateString=msgsObjToArr[index-1].dateSentString;
                if(previousDateString!=msg.dateSentString){
                    currentApendElem=MsgDateDOM.create(previousDateString);
                    MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
                    lastAppendedElem=currentApendElem;
                }
            }


            if(!msg["deleted"]){
                currentApendElem=MsgWraperDOM.create(msg);

                if(MessageFuncs.isSelectingMsgs()){
                    MsgGroupActivations.allSelected_Megchecked(currentApendElem);
                }
                    
                MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
            }else{
                // let sent=msgg["isSender"];
                // let first=msgg["first"];
                currentApendElem=DeletedMsgDOM.create(msg);
                MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
            }
            lastAppendedElem=currentApendElem;
            index++;

            if(pushToID){
                continu=pushToID<currentMsgID;
            }else{
                continu=index<msgPerPage && index<msgsObjToArr.length;
            }
        }

        if(currentMsg){
            let currentApendElem=MsgDateDOM.create(currentMsg["dateSentString"]);
            MessageBodyDOM.appendElemBeforeElem(currentApendElem, lastAppendedElem);
            lastAppendedElem=currentApendElem;
        }


        let loadOlderMsgsBtn=DOMGetter.getLoadOlderMsgsBtn();
        if(loadOlderMsgsBtn){
            LoadOlderMsgsBtnDOM.delete();
        }

        if(msgsObjToArr.length>msgPerPage){
            LoadOlderMsgsBtnDOM.append(LoadOlderMsgsBtnDOM.create());
        }
        
        MsgBody.setElemAbsolutePos(firstMsgPos, firstMsgOnDomId, true)

        OtherFunctions.activateMsgDateBeforeAfterfunc();
    }



    static addMessage(chatID, msgObj, useChatFuncs){
        // console.log(22);
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        MessagesDB.addMessage(chatID_DB, msgObj, useChatFuncs);        
    }

    static getFirstMsgInDBID(chatID){
        const firstMsg=MessageFuncs.getChatMsgsAsArr(chatID)[0];
        if(!firstMsg){
            let errMsg="some error occured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        const firstMsgID=firstMsg.msgID;
        if(firstMsgID){
            return firstMsgID;
        }else{
            return null;
        }
    }
        
    static updateReadStatus(chatID, msgID, read, readTime){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        MessagesDB.setReadStatus(chatID_DB, msgID, read, readTime);
    
        UpdateMsgDOM.readElem(chatID, msgID);
        // console.log(MessageFuncs.isLastMsgInDB(chatID, msgID));
        if(MessageFuncs.isLastMsgInDB(chatID, msgID)){
            const msgObj=MessageFuncs.getMessageObj(chatID, msgID);
            ChatFuncs.updateChatLastMsgObj(chatID, msgObj);
        }
    }
    
    static updateStaredStatus(chatID, msgID, stared){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        MessagesDB.setStaredStatus(chatID_DB, msgID, stared);
    
        UpdateMsgDOM.starElem(chatID, msgID);
    }
    
    static updateDeliverTime(chatID, msgID, deliverTime){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        MessagesDB.setDeliverTime(chatID_DB, msgID, deliverTime);
    }

    static correctFirstStatus(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);

        const msgObj=MessageFuncs.getMessageObj(chatID_DB, msgID);
        let previousMsgInstance=MessageFuncs.getChatMsgsAsArr(chatID_DB);
        previousMsgInstance=previousMsgInstance.filter(msgObj=>msgObj.msgID<msgID);
        previousMsgInstance=previousMsgInstance[previousMsgInstance.length-1];

        msgObj.first=
            msgObj.senderID!=previousMsgInstance.senderID
            ||
            msgObj.dateSentString!=previousMsgInstance.dateSentString
        ;
    }
    
    
    static getMsgSenderClass(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        return MessagesDB.getSenderClass(chatID_DB, msgID);        
    }

    static getMessageObj(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        return MessagesDB.getMessageObj(chatID_DB, msgID);        
    }

    static getRepliedMsgObj(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        let replyedMegObj=MessagesDB.getMessageObj(chatID_DB, msgID).replyedMegObj;

        if(replyedMegObj) {
            return replyedMegObj;
        }else{
            return null;
        }
    }

    static setMsgInfoInView(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        MessagesDB.setMsgInfoInView(chatID_DB, msgID);        
    }

    static setMsgIsStaring(chatID, msgID, isStaring){
        // console.log(msgID_DB);
        MessagesDB.setMsgIsStaring(chatID, msgID, isStaring);
    }

    static setMsgIsDeleting(chatID, msgID, isDeleting){
        MessagesDB.setMsgIsDeleting(chatID, msgID, isDeleting);
    }

    static msgIsStaring(chatID, msgID){
        // console.log(msgID);
        return MessagesDB.msgIsStaring(chatID, msgID);
    }

    static msgIsDeleting(chatID, msgID){
        // console.log(msgID);
        return MessagesDB.msgIsDeleting(chatID, msgID);
    }

    static isSelectingMsgs(){
        return MessagesDB.isSelectingMsgs;
    }

    static setIsSelectingMsgs(value){
        MessagesDB.isSelectingMsgs=value;
    }


    
    
    static deleteMessage(chatID, msgID, delCodeNo){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        if(!delCodeNo){
            return;
        }
        MessagesDB.deleteMessage(chatID_DB, msgID, delCodeNo);
    
        UpdateMsgDOM.deletedMsgElem(chatID_DB, msgID);

        // console.log(MessageFuncs.isLastMsgInDB(chatID, msgID));
        if(MessageFuncs.isLastMsgInDB(chatID, msgID)){
            const msgObj=MessageFuncs.getMessageObj(chatID, msgID);
            console.log(msgObj);
            ChatFuncs.updateChatLastMsgObj(chatID, msgObj);
        }
    }

    static isLastMsgInDB(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        return MessagesDB.isLastMsgInDB(chatID_DB, msgID);        
    }

    static getChatMsgsAsArr(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        return MessagesDB.getChatMsgsAsArr(chatID_DB);        
    }

    static isValidMsgID(chatID, msgID){
        return MessagesDB.getMessageObj(chatID, msgID, true);
    }



    static convertMsgSendingToMsg(msgSentSignalRes){
        const chatID=msgSentSignalRes.chatID;
        const msgSendingID=msgSentSignalRes.msgSendingID;
        const msgID=msgSentSignalRes.msgID;

        MessagesDB.convertMsgSendingToMsg(msgSentSignalRes);

        if(ChatFuncs.isActiveChat(chatID)){
            let newMsgInstannce=MessageFuncs.getMessageObj(chatID, msgID);
            if(!newMsgInstannce){
                let errMsg="unale to create newMsgInstannce";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
            let newMsgElem=MsgWraperDOM.create(newMsgInstannce);

            if(MessageFuncs.isSelectingMsgs()){
                MsgGroupActivations.allSelected_Megchecked(newMsgElem);
            }

            MsgSendingWraperDOM.convertToMsg(msgSendingID, newMsgElem);
        }

    }





    

    static sendMsgSeenSignal(chatID, lastNewSeenMsgID, onLoadMsgs=false){
        if(onLoadMsgs){
            if(!ChatFuncs.isActiveChat(chatID)){
                return;
            }
        }
        // console.log("lastNewSeenMsgID", lastNewSeenMsgID);

        //api or socket for sending

        if(onLoadMsgs){
            const msgArr=MessagesDB.getChatMessages(chatID);
            const unseenMsgIDArr=UnseenMsgIDs.get(chatID);
            let index=0;
            let currentMsgID=0;
    
            while(index<unseenMsgIDArr.length && currentMsgID<lastNewSeenMsgID){
                let msg=msgArr[unseenMsgIDArr[index]];
                currentMsgID=msg.msgID;

                if(msg.read!="read" && !msg.isSender){
                    // console.log("currentMsgID", currentMsgID);
                    MessagesDB.setReadStatus(chatID, currentMsgID, "read", null);
                    UnseenMsgIDs.remove(chatID, currentMsgID);
                }
                index++;
            }
        }else{
            let msg=MessagesDB.getMessageObj(chatID, lastNewSeenMsgID);
            if(msg.read!="read" && !msg.isSender){
                MessagesDB.setReadStatus(chatID, lastNewSeenMsgID, "read", null);
                UnseenMsgIDs.remove(chatID, lastNewSeenMsgID);
            }
        }

        ChatFuncs.updateChatUnreadMsgCount(chatID);
    }

    static recieveMsgSentSignal(msgSentSignalRes){
        /*
            msgSentSignalRes expects
                chatID : int
                msgID : int
                msgSendingID: int //for messages that are beeing sent 
                msg : var
                isSender : bool
                senderID:int, sender ID 
                timeSent : int, time im miliseconds
                read : var
                stared : bool
                deliverTime:
                readTime:
                deleted: int or null, eg. 1,2,3,4 or null
                replyedMegObj: object
                replyedMegObj contains:
                    msgID,: int
                    isSender,: bool
                    msg,: var
                    senderName: var
                ;
        */
       const chatID=msgSentSignalRes.chatID;
       const msgSendingID=msgSentSignalRes.msgSendingID;


       MessageFuncs.convertMsgSendingToMsg(msgSentSignalRes);

    }

    static sendMsg(msgSendingInstance){
        // console.log(msgSendingInstance);

        /*
            send
                userId
                chatID
                msgSendingID
                msg
                rMsgID

        */

        const dataToSend={
           "userID":MyProfile.userID,
           "chatID":msgSendingInstance.chatID,
           "msgSendingID":msgSendingInstance.msgSendingID,
           "msg":msgSendingInstance.msg
        }
        if(msgSendingInstance.rMsg){
            dataToSend["rMsgId"]=msgSendingInstance.rMsg.msgID;
        }

        /*
            recieve
                chatID : int
                msgID : int
                msgSendingID: int //for messages that are beeing sent 
                msg : var
                isSender : bool
                senderID:int, sender ID 
                timeSent : int, time im miliseconds
                read : var
                stared : bool
                deliverTime:
                readTime:
                deleted: int or null, eg. 1,2,3,4 or null
                replyedMegObj: object
                replyedMegObj contains:
                    msgID,: int
                    isSender,: bool
                    msg,: var
                    senderName: var
                ;

        */


        //simulation
        let result=GenerateAPIRes.msgSentSignalRes(dataToSend);

        setTimeout(() => {
            MessageFuncs.recieveMsgSentSignal(result);
        }, 3000);


        
    }

    static msgDelSignal(){

    }
}


export{
    MessageFuncs,
    UnseenMsgIDs
}