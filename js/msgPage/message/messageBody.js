import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";


import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../../_tempDatabase/messageFuncs.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";

import{
    MsgGroupActivations
} from "../../msgPage/message/messageGroupActivations.js";

import{
    MsgGroupDeactivations
} from "../../msgPage/message/messageGroupDeactivations.js";

import{
    OtherFunctions
} from "../../msgPage/others/otherFonctions.js";

import{
    MessagesDB,
    MsgOnSendingDB,
    ChatBoxDB
} from "../../_tempDatabase/messages.js";

import{
    ChatBoxDOM, 
    ChatboxReplyDOM 
} from "../../DOM/msgPageDOM/msgDOM/chatBoxDOM.js";





class MsgBody{
    static getElemAbsolutePos(elem, isID=false){
        if(isID){
            let msgID=MsgBody.makeMsgIDUsable(elem);
            elem=document.getElementById(msgID);
        }

        let pos=elem.getBoundingClientRect();

        return pos;
    }

    static setElemAbsolutePos(position, elem, isID=false){
        if(isID){
            let msgID=MsgBody.makeMsgIDUsable(elem);
            elem=document.getElementById(msgID);
        }

        let positionTop=position["top"];
        let positionLeft=position["left"];

        if(!positionLeft || !positionTop){
            let errMsg="invalid pos param";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const msgbody=DOMGetter.getMessageBody();
        
        let pos=elem.getBoundingClientRect();

        let newTop=pos["top"]-positionTop;

        let topDiff=newTop

        msgbody.scrollTo(msgbody.scrollLeft, msgbody.scrollTop+topDiff);
    }


    static touchedThisMessageThenDrag(event){
        clearTimeout(GlobalVars.megChatTouchedTimeOut);
    
        let messageBody=DOMGetter.getMessageBody();
    
        let messageBodyPos=messageBody.getBoundingClientRect();
    
        let currentTouchYPos=event.touches[0].clientY;
        let changeYPos=GlobalVars.touchYPos-currentTouchYPos;
        if(messageBodyPos.top<=currentTouchYPos && messageBodyPos.bottom>=currentTouchYPos){
            messageBody.scrollTo(messageBody.scrollLeft, messageBody.scrollTop+changeYPos);
        }
        GlobalVars.touchYPos=currentTouchYPos;
    }
    
    static touchedThisMessage(event){
        event.preventDefault();
    
        let messageHeadCount=DOMGetter.getMessageHeadCount();
    
    
        GlobalVars.touchYPos=event.touches[0].clientY;
        let messageElement=event.target;
        if(!messageElement.dataset["id"]){
            while(!messageElement.dataset["id"]){
                messageElement=messageElement.parentElement;
            }
        }
        let messageID=messageElement.dataset["id"];
        messageID=MsgBody.makeMsgIDUsable(messageID);
    
        let senderClass=MessageFuncs.getMsgSenderClass(ChatFuncs.getActiveChat(), messageID);
    
        GlobalVars.megChatTouchedTimeOut=setTimeout(
            ()=>{
                MsgGroupActivations.allSelected_Megchecked();
                MsgGroupDeactivations.removeAllSelectedHoverEffect();
                
                let selected=document.getElementsByName(messageID)[0];
                let Megchecked=document.getElementsByName(messageID)[1].getElementsByTagName("input")[0];
                
                MsgBody.updateSelectedMessagesID(messageID, senderClass);
                
                messageHeadCount.innerHTML=GlobalVars.selectedMessagesID.length;
                selected.classList.add("s");
                Megchecked.setAttribute("checked", "true");
    
                event.target.removeEventListener("touchend", OtherFunctions.clearMegChatTouchedTimeOut);
                event.target.removeEventListener("touchcancel", OtherFunctions.clearMegChatTouchedTimeOut);
                event.target.removeEventListener("touchmove", MsgBody.touchedThisMessageThenDrag);        
            }, 1000
        );
        event.target.addEventListener("touchend", OtherFunctions.clearMegChatTouchedTimeOut);
        event.target.addEventListener("touchcancel", OtherFunctions.clearMegChatTouchedTimeOut);
        event.target.addEventListener("touchmove", MsgBody.touchedThisMessageThenDrag);
    }
    
    static selectUnselectMessage(event){
        let messageHeadCount=DOMGetter.getMessageHeadCount();
    
        const chatID=ChatFuncs.getActiveChat();

        let selected=event.target;
        let megchecked=selected.nextElementSibling.getElementsByTagName("input")[0];
        let messageID=selected.dataset["id"];
        messageID=MsgBody.makeMsgIDUsable(messageID);
    
        let senderClass=MessageFuncs.getMsgSenderClass(chatID, messageID);
    
        if(MsgBody.updateSelectedMessagesID(messageID, senderClass, chatID)){
            selected.classList.add("s");
            megchecked.setAttribute("checked", "true");    
        }else{
            selected.classList.remove("s");
            megchecked.removeAttribute("checked");    
        }
        messageHeadCount.innerHTML=GlobalVars.selectedMessagesID.length;
    }
    
    static activateMessageBodyOnscrollfunc(){
        //control show chatbox icon
        let showChatBox=DOMGetter.getShowChatBox();
        let messageBody=DOMGetter.getMessageBody();
        let msgDate=DOMGetter.getMsgDate();
    
        if(showChatBox){
            let scllTop=messageBody.scrollTop;
            if(GlobalVars.megBdScrlTop){
                if(scllTop>GlobalVars.megBdScrlTop){
                    showChatBox.style.top="65px";
                    showChatBox.style.bottom="none"
                }else{
                    showChatBox.style.top="";
                    showChatBox.style.bottom=""
                }
            }
            GlobalVars.megBdScrlTop=scllTop;
        }
    
        //control msgdate content
        let messageBodyTop=messageBody.getBoundingClientRect().top;
        let activeMsgDateBefore=messageBody.getElementsByClassName("Be")[0];
        let activeMsgDateAfter=messageBody.getElementsByClassName("Af")[0];
        
        if(activeMsgDateBefore){
            let activeMsgDateBeforeTop=activeMsgDateBefore.getBoundingClientRect().top;
            if(activeMsgDateBeforeTop>=messageBodyTop){
                msgDate.innerHTML=OtherFunctions.getMsgDateBeforeBeforefunc(activeMsgDateBefore.innerHTML);
                activeMsgDateBefore.classList.remove("Be");
                if(activeMsgDateAfter){activeMsgDateAfter.classList.remove("Af");}
                OtherFunctions.activateMsgDateBeforeAfterfunc();
            }
        }
        if(activeMsgDateAfter){
            let activeMsgDateAfterTop=activeMsgDateAfter.getBoundingClientRect().top;
            if(activeMsgDateAfterTop<=messageBodyTop){
                msgDate.innerHTML=activeMsgDateAfter.innerHTML;
                if(activeMsgDateBefore){activeMsgDateBefore.classList.remove("Be");}
                activeMsgDateAfter.classList.remove("Af");
                OtherFunctions.activateMsgDateBeforeAfterfunc();
            }
        }
    
        //control msgdate visibility
        msgDate.classList.add("add");
        clearTimeout(GlobalVars.msgDateTimeOutFunction);
        GlobalVars.msgDateTimeOutFunction=setTimeout(
            ()=>{
                msgDate.classList.remove("add");
            }, 1000
        );
    }
    
    static updateSelectedMessagesID(msgID, classN, chatID=null){
        let messageHeadReply=DOMGetter.getMessageHeadReply();
        let messageHeadInfo=DOMGetter.getMessageHeadInfo();

        if(!chatID){
            chatID=ChatFuncs.getActiveChat();
        }

        msgID=MsgBody.makeMsgIDUsable(msgID);

        if(MessageFuncs.msgIsDeleting(chatID, msgID)){
            let errMsg="funtio is not supposed to run";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, false, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let selectedIDIndex=GlobalVars.selectedMessagesID.indexOf(msgID);
        let added=false;
        if(selectedIDIndex<0){
            GlobalVars.selectedMessagesID.push(msgID);
            GlobalVars.msgSenderTracking.push(classN);
            added=true;
        }else{
            GlobalVars.selectedMessagesID.splice(selectedIDIndex, 1);
            GlobalVars.msgSenderTracking.splice(selectedIDIndex, 1);
        }
        if(messageHeadReply){
            if(GlobalVars.selectedMessagesID.length>1){
                messageHeadReply.classList.add("hide");
            }else{
                messageHeadReply.classList.remove("hide");
            }
        }
        if(messageHeadInfo){
            if(GlobalVars.selectedMessagesID.length>1){
                messageHeadInfo.classList.add("hide");
            }else{
                messageHeadInfo.classList.remove("hide");
            }
        }
        return(added);
    }

    static msgIsSelected(msgID){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        if(GlobalVars.selectedMessagesID.indexOf(msgID)>=0){
            return true;
        }else{
            return true;
        }
    }
        
    static emptySelectedMessagesID(){
        //empty the selection array
        if(GlobalVars.selectedMessagesID || GlobalVars.msgSenderTracking){
            GlobalVars.selectedMessagesID.splice(0, GlobalVars.selectedMessagesID.length); 
            GlobalVars.msgSenderTracking.splice(0, GlobalVars.msgSenderTracking.length); 
        }
    }

    static jumpToMsgByID(msgID, smooth=false){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        const msgContain=document.getElementById(msgID);

        if(!msgContain){
            let errMsg="msgContain not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const messageBody=DOMGetter.getMessageBody();
        const msgContainPos=msgContain.getBoundingClientRect();
        const messageBodyPos=messageBody.getBoundingClientRect();

        const newTOP=msgContainPos.top-messageBodyPos.top;
        if(smooth){
            messageBody.scroll({
                "top":newTOP,
                "behavior":"smooth"
            });        
        }else{
            messageBody.scrollTo(messageBody.scrollLeft, newTOP);        
        }
    }

    //should probably change to updateSeenMsg
    static checkIfUnseenMsgsAreSeenOnload(chatID){
        let lastNewSeenMsgID=null;
        let firstNewUnseenMsgID=null;
        let couldNotFindMsgDOM=null;
        let unseenMsgIDs=UnseenMsgIDs.get(chatID);

        // console.log(unseenMsgIDs.length, unseenMsgIDs);
        
        let index=0;
        while(index<unseenMsgIDs.length && !firstNewUnseenMsgID && !couldNotFindMsgDOM){
            const msgID=unseenMsgIDs[index]
            const msgIsSeeable=MsgBody.msgIsSeeable(msgID);
            // console.log("seable", msgID, msgIsSeeable);
            if(msgIsSeeable!==null){
                if(msgIsSeeable){
                    lastNewSeenMsgID=msgID;
                }else{
                    firstNewUnseenMsgID=msgID;
                }
            }else{
                couldNotFindMsgDOM=true;
            }
            index++;
        }

        if(couldNotFindMsgDOM){
            let errMsg="fatal error";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        if(lastNewSeenMsgID){
            //send seen signal
            MessageFuncs.sendMsgSeenSignal(chatID, lastNewSeenMsgID, true);
        }
    }

    static msgIsSeeable(msgID){
        let result=null;
        msgID=MsgBody.makeMsgIDUsable(msgID);
        const msgContain=document.getElementById(msgID);
        if(!msgContain){
            // console.log("err", msgID, "notFound");
            return result;
        }

        const messageBody=DOMGetter.getMessageBody();
        const msgContainPos=msgContain.getBoundingClientRect();
        const messageBodyPos=messageBody.getBoundingClientRect();

        const msgHeigthSeenRatio=0.3;
        const msgContainHeigth=msgContainPos.height;
        const msgContainAcceptableSeenLevel=msgContainHeigth*msgHeigthSeenRatio;

        const msgContainSeenLevel=messageBodyPos.bottom-msgContainPos.top;

        // console.log(
        //     "msgContainHeigth: "+msgContainHeigth,
        //     "msgContainAcceptableSeenLevel: "+msgContainAcceptableSeenLevel,
        //     "msgContainSeenLevel: "+msgContainSeenLevel,
        //     msgContainSeenLevel>=msgContainAcceptableSeenLevel
        // )


        if(msgContainSeenLevel>=msgContainAcceptableSeenLevel){
            result=true;
        }else{
            result=false;
        }

        return result;
    }

    static jumpToBottom(smooth=false){
        const messageBody=DOMGetter.getMessageBody();

        if(smooth){
            messageBody.scroll({
                "top":messageBody.scrollHeight,
                "behavior":"smooth"
            });        
        }else{
            messageBody.scrollTo(messageBody.scrollLeft, messageBody.scrollHeight);        
        }
    }

    static scrlMsgBodyToSeeMsg(){
        // console.log("scrol");
        const chatID=ChatFuncs.getActiveChat();
        const unseenMsgIDs=UnseenMsgIDs.get(chatID);
        if(!unseenMsgIDs[0]){
            // console.log("no unseen")
            return;
        }

        let firstNewUnseenMsgID=null;
        let couldNotFindMsgDOM=null;

        // console.log(unseenMsgIDs.length, unseenMsgIDs);
        
        let index=0;
        while(index<unseenMsgIDs.length && !firstNewUnseenMsgID && !couldNotFindMsgDOM){
            const msgID=unseenMsgIDs[index]
            const msgIsSeeable=MsgBody.msgIsSeeable(msgID);
            // console.log("seable", msgID, msgIsSeeable);
            if(msgIsSeeable!==null){
                if(msgIsSeeable){
                    //send seen signal
                    MessageFuncs.sendMsgSeenSignal(chatID, msgID);
                }else{
                    firstNewUnseenMsgID=msgID;
                }
            }else{
                couldNotFindMsgDOM=true;
            }
            index++;
        }

        if(couldNotFindMsgDOM){
            let errMsg="couldNotFindMsgDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            // return;
        }            
    }


    static getFirstMsgOnDomId(){
        const msgContainer=document.getElementsByClassName("msgWrapper")[0];
        // console.log(
        //     msgContainer,
        //     msgContainer.id
        // )
        return msgContainer.id;
    }

    static sendMsg(event){
        let rMsgID;
        const activeChatID=ChatFuncs.getActiveChat();
        const chatBox=DOMGetter.getChatBox();
        const chatBoxAttr=ChatBoxDB.getChatBoxAttr(activeChatID);

        if(!chatBoxAttr){
            let errMsg="chatBoxAttr not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const msg=chatBoxAttr.msg;
        const rMsgObj=chatBoxAttr.rMsg;
        if(rMsgObj){
            rMsgID=rMsgObj.msgID;
        }

        // console.log(msg);
        // console.log(rMsgID);
        if(!msg){
            let errMsg="Please type your message";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const msgSendingID=MsgOnSendingDB.addMsgOnSending(activeChatID, chatBoxAttr);
        const msgSendingInstance=MsgOnSendingDB.getMsgSendingInstance(activeChatID, msgSendingID);

        ChatBoxDOM.onclickCloseChatBoxButton();

        MessageFuncs.sendMsg(msgSendingInstance);
    }

    static makeMsgIDUsable(msgID){
        if(!/sd/.test(msgID)){
            msgID="msg-"+msgID;
        }
        return msgID;
    }
    
    static makeMsgID_DB_Usable(msgID){
        if(/sd/.test(msgID)){
            msgID=msgID.split("msg-").splice(-1)[0];
        }
        return msgID;
    }

}


export{
    MsgBody
}