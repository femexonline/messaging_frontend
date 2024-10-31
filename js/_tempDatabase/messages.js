import{
    MyCodeErr
} from "../_errorHandler/errorHandler.js";

import{
    TimeFunctions
} from "../_timeFunc/timeFuncs.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
    ChatFuncs
} from "../_tempDatabase/chatsFunc.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../_tempDatabase/messageFuncs.js";

import{ 
    MsgBody 
}from "../msgPage/message/messageBody.js";



const deletedMsgText={
    "1":"deleted",
    "2":"deleted",
    "3":"deleted",
    "4":"deleted"
}






class MsgOnSendingInstance{
    /* 
        MsgOnSendingInstance would conatin:
            chatID
            msgSendingID: int  
            msg : var
            isSender : bool, true
            rMsg: object
            rMsg contains:
                chatID
                msgID,: int
                isSender,: bool
                msg,: var
                senderName: var
            ;
        ;
    */

    constructor(msgObj){

        /* expect from msgObj
            chatID
            msg,
            rMsg,
            ReplyedMegInstance contains:
                chatID
                msgID,: int
                isSender,: bool
                msg,: var
                senderName: var
        ;
        */

        this._chatID=msgObj["chatID"];
        this._msgSendingID=msgObj["msgSendingID"];
        this._msg=msgObj["msg"];
        this._isSender=true;
        this._date=new Date;
        this._date=Date.parse(this._date);
        if(msgObj["rMsg"]){
            this._rMsg=new ReplyedMegInstance(msgObj["rMsg"]);
        }
    }
    

    get chatID(){return this._chatID;}
    get msgSendingID(){return this._msgSendingID;}
    get msg(){return this._msg;}
    get isSender(){return this._isSender;}
    get date(){return this._date;}
    get dateSentString(){
        return TimeFunctions.generateTimeSentStringT1(this.date)
    }
    get rMsg(){return this._rMsg;}

    set chatID(value){}
    set msgSendingID(value){}
    set msg(value){}
    set isSender(value){}
    set date(value){}
    set dateSentString(value){}
    set rMsg(value){}

    getMsgOnSending(){
        return this;
    }
}

class MsgOnSendingDBInstance{
    constructor(){
        this._msgsOnSending={
            //object containing MsgOnSendingInstance, with chatIDs as keys and msgSendingID as subkeys
        }
    }

    getChatMsgsOnSending(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.msgsOnSending[chatID_DB];
    }

    getMsgSendingInstance(chatID, msgSendingID){
        return this.msgsOnSending[chatID][msgSendingID];
    }

    get msgsOnSending(){return this._msgsOnSending;}
    set msgsOnSending(value){}


    
    addMsgOnSending(chatID, msgObj){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        if(!this.msgsOnSending[chatID_DB]){
            this.msgsOnSending[chatID_DB]={};
        }

        msgObj.msgSendingID=Math.round(Math.random()*1589065200000);
        this.msgsOnSending[chatID_DB][msgObj.msgSendingID]=new MsgOnSendingInstance(msgObj);
        // console.log(this.msgsOnSending[chatID_DB][msgObj.msgSendingID])

        // console.log(22);
        if(ChatFuncs.isActiveChat(chatID_DB)){
            let newMsgInstance=this.msgsOnSending[chatID_DB][msgObj.msgSendingID];
            MessageFuncs.pushInMsgSending(chatID_DB, newMsgInstance);
        }
        return msgObj.msgSendingID;
    }

    deleteMsgOnSending(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        delete(this.msgsOnSending[chatID_DB][msgID]);
        if(!this.msgsOnSending[chatID_DB][msgID]){
            return true;
        }else{
            let errMsg="failed to delete msg sending";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return false;
        }
    }

    getMsgOnSendingObj(chatID, msgID, checkIfMsgExist=false){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        if(checkIfMsgExist){
            if(this.msgsOnSending[chatID_DB][msgID]){
                return true;
            }else{
                return false;
            }
        }
    
        return this.msgsOnSending[chatID_DB][msgID].getMsgOnSending();
    }


    getChatMsgOnSendingAsArr(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        let chatMsgs=this.getChatMsgsOnSending(chatID_DB);
        if(!chatMsgs){
            return [];
        }
        chatMsgs=Object.values(chatMsgs);
        chatMsgs=chatMsgs.sort((a,b)=>a.date - b.date);
        // console.log(chatMsgs);
        return chatMsgs;
    }

    hasMsgSending(chatID){
        if(!this.getChatMsgOnSendingAsArr(chatID)){
            return false;
        }
        if(this.getChatMsgOnSendingAsArr(chatID)[0]){
            return true;
        }else{
            return false;
        }
    }
}

class ChatBoxReplyMsgInstance{
    /*
        "chatID"
        "msgID",
        "isSender",
        "msg":msg,
        "senderName"://generated here
    */
   constructor(rMsgObj){
        /* expect from rMsgObj
            chatID
            msgID,
            isSender,
            msg,
        */

       if(!rMsgObj["chatID"]){
            let errMsg="incomplete rMsg param";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        if(!rMsgObj["msgID"]){
            let errMsg="incomplete rMsg param";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }


       this._chatID=ChatBody.makeChatID_DB_Usable(rMsgObj["chatID"]);
       this._msgID=rMsgObj["msgID"];
       this._isSender=rMsgObj["isSender"];
       this._msg=rMsgObj["msg"];
    }


    get chatID(){return this._chatID;}
    get msgID(){return this._msgID;}
    get isSender(){
        return this._isSender;
    }
    get msg(){return this._msg;}
    get senderName(){
        if(this._isSender){
            return "You";
        }else{
            return ChatFuncs.getChatObj(this._chatID).name;
        }
    }

    set chatID(value){}
    set msgID(value){}
    set isSender(value){}
    set msg(value){}
    set senderName(value){}
}

class ChatBoxAttributeInstance{
    /*
        "chatID"
        "msg":msg,
        rMsg:ChatBoxReplyMsgInstance
    */
    constructor(chatID, msg, rMsgObj){
        this._chatID=ChatBody.makeChatID_DB_Usable(chatID);
        if(msg){
            this._msg=msg;
        }else{
            this._msg="";
        }
        if(rMsgObj){
            this._rMsg=new ChatBoxReplyMsgInstance(rMsgObj);
        }else{
            this._rMsg=null;
        }
    }

    get chatID(){return this._chatID;}
    get msg(){return this._msg;}
    get rMsg(){return this._rMsg;}

    set chatID(value){}
    set msg(value){this._msg=value;}
    set rMsg(value){
        if(value){
            this._rMsg=new ChatBoxReplyMsgInstance(value);
        }else{
            this._rMsg=null;
        }
    }
    
}

class ChatBoxDBInstance{
    constructor(){
        this._chatBoxsAttr={
            //object containing ChatBoxAttributeInstance, with chatIDs
        }
    }

    getChatBoxAttr(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.chatBoxsAttr[chatID_DB];
    }

    getRMsgObj(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        if(!this.chatBoxsAttr[chatID_DB]){
            let errMsg="some error occored";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return null;
        }
        const rMsgObj=this.chatBoxsAttr[chatID_DB].rMsg
        if(!rMsgObj){
            let errMsg="some error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return null;
        }
        
        return rMsgObj;
    }

    get chatBoxsAttr(){return this._chatBoxsAttr;}
    set chatBoxsAttr(value){}


    chatHasChatBox(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        if(this.chatBoxsAttr[chatID_DB]){
            return true;
        }else{
            return false;
        }
        
    }

    
    addChatBoxAttr(chatID, msg, rMsgObj){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    
        this.chatBoxsAttr[chatID_DB]=new ChatBoxAttributeInstance(chatID, msg, rMsgObj);
        
        // console.log(22);
        // if(ChatFuncs.isActiveChat(chatID_DB)){
        //     let newMsgInstance=this.chatBoxsAttr[chatID_DB][msgObj.msgSendingID];
        //     MessageFuncs.pushInMsgSending(chatID_DB, newMsgInstance);
        // }
        
    }

    deleteRMsgObj(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);

        if(!this.chatBoxsAttr[chatID_DB]){
            console.log("unnessary")
            return;
        }

        this.chatBoxsAttr[chatID_DB].rMsg=null;
        if(!this.chatBoxsAttr[chatID_DB].rMsg){
            return true;
        }else{
            let errMsg="some error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return false;
        }
    }

    addRMsgObj(chatID, rMsgObj){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);

        if(!this.chatBoxsAttr[chatID_DB]){
            ChatBoxDB.addChatBoxAttr(chatID_DB, "", null);
        }

        this.chatBoxsAttr[chatID_DB].rMsg=rMsgObj;
    }

    updateMsg(chatID, msg){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        
        if(!this.chatBoxsAttr[chatID_DB]){
            ChatBoxDB.addChatBoxAttr(chatID_DB, "", null);
        }
        
        this.chatBoxsAttr[chatID_DB].msg=msg;
    }

    deleteChatBoxAttr(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);

        if(!this.chatBoxsAttr[chatID_DB]){
            console.log("unnessary")
            return;
        }
        
        delete(this.chatBoxsAttr[chatID_DB]);
        if(!this.chatBoxsAttr[chatID_DB]){
            return true;
        }else{
            let errMsg="some error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return false;
        }
    }
}







class ReplyedMegInstance{
    /*
        ReplyedMegInstance contains:
            chatID
            msgID,: int
            isSender,: bool
            msg,: var
            senderName: var
        ;
    */

   constructor(replyedMegObj){
        /*
            replyedMegObj expects:
                chatID
                msgID,: int
                isSender,: bool
                msg,: var
                //senderName: var
            ;
        */


        this._chatID=replyedMegObj["chatID"];
        this._msgID=replyedMegObj["msgID"];
        this._isSender=replyedMegObj["isSender"];
        this._msg=replyedMegObj["msg"];
        this._senderName=replyedMegObj["senderName"];
    }

    get chatID(){ return this._chatID;}
    get msgID(){ return this._msgID;}
    get isSender(){ return this._isSender;}
    get msg(){ return this._msg;}
    get senderName(){
        if(this._isSender){
            return "You";
        }else{
            return ChatFuncs.getChatObj(this._chatID).name;
        }
    }

    set chatID(value){}
    set msgID(value){}
    set isSender(value){}
    set msg(value){}
    set senderName(value){}
}

class MessageInstance{
    /* 
        MessageInstance would conatin:
            chatID : int
            msgID : int
            msg : var
            isSender : bool
            senderID:int, sender ID 
            timeSent : int, time im miliseconds
            timeSentString:         ///generated on frontend
            dateSentString:         ///generated on frontend
            first:bool, true if previous msg is not from user  ///generated on frontend
            read : var
            stared : bool
            deliverTime:
            readTime:
            drtime :array //deliverd read time eg=["timd", "dhhl"] ///set on frontend
            deleted: int or null, eg. 1,2,3,4 or null
            deletedText: var, ///set on frontend
            replyedMegObj: object
            replyedMegObj contains:
                msgID,: int
                isSender,: bool
                msg,: var
                senderName: var
            ;
            isStaring: bool
            isDeleting: bool
        ;
    */

    constructor(msgObj, lastMsgInstance, addToBottom=true){

        let lastSender=null;
        let lastMsgDate=null;
        if(lastMsgInstance){
            lastSender=lastMsgInstance["senderID"]
            lastMsgDate=lastMsgInstance["dateSentString"]
        }
        this._chatID=msgObj["chatID"];
        this._msgID=msgObj["msgID"];
        this._msg=msgObj["msg"];
        this._isSender=msgObj["isSender"];
        this._senderID=msgObj["senderID"];
        this._timeSent=msgObj["timeSent"];
        this._timeSentString=TimeFunctions.generateTimeSentStringT2(this.timeSent);
        if(addToBottom){
            if(lastMsgDate!==null){
                this._first=
                    this.senderID!=lastSender
                    ||
                    this.dateSentString!=lastMsgDate
                ;
            }else{
                this._first=true;
            }
        }else{
            this._first=true;
        }
        this._read=msgObj["read"];
        this._stared=msgObj["stared"];
        this._deliverTime=msgObj["deliverTime"];
        this._readTime=msgObj["readTime"];
        this._drtime=[
            TimeFunctions.generateTimeSentStringT1(this.deliverTime),
            TimeFunctions.generateTimeSentStringT1(this.readTime)
        ];
        this._deleted=msgObj["deleted"];
        if(msgObj["replyedMegObj"]){
            this._replyedMegObj=new ReplyedMegInstance(msgObj["replyedMegObj"]);
        }
        this._isStaring=false;
        this._isDeleting=false;
    }
    

    get chatID(){return this._chatID;}
    get msgID(){return this._msgID;}
    get msg(){return this._msg;}
    get isSender(){return this._isSender;}
    get senderID(){return this._senderID;}
    get timeSent(){return this._timeSent;}
    get timeSentString(){return this._timeSentString;}
    get dateSentString(){return TimeFunctions.generateTimeSentStringT1(this.timeSent);}
    get first(){return this._first;}
    get read(){return this._read;}
    get stared(){return this._stared;}
    get deliverTime(){return this._deliverTime;}
    get readTime(){return this._readTime;}
    get drtime(){return this._drtime;}
    get deleted(){return this._deleted;}
    get deletedText(){return deletedMsgText[this._deleted];}
    get replyedMegObj(){return this._replyedMegObj;}
    get isStaring(){
        if(this._isStaring){
            return true;
        }else{
            return false;
        }
    }
    get isDeleting(){
        if(this._isDeleting){
            return true;
        }else{
            return false;
        }
    }

    set chatID(value){}
    set msgID(value){}
    set msg(value){}
    set isSender(value){}
    set senderID(value){}
    set timeSent(value){}
    set timeSentString(value){}
    set dateSentString(value){}
    set first(value){this._first=value;}
    set read(value){this._read=value;}
    set stared(value){this._stared=value;}
    set deliverTime(value){
        this._deliverTime=value;
        this._drtime[0]=TimeFunctions.generateTimeSentStringT1(this.deliverTime);
    }
    set readTime(value){
        if(!value){
            return
        }
        this._readTime=value;
        this._drtime[1]=TimeFunctions.generateTimeSentStringT1(this.readTime);
    }
    set drtime(value){}
    set deleted(value){this._deleted=value;}
    set deletedText(value){}
    set replyedMegObj(value){}
    set isStaring(value){
        if(value){
            this._isStaring=true;
        }else{
            this._isStaring=false;
        }
    }
    set isDeleting(value){
        if(value){
            this._isDeleting=true;
        }else{
            this._isDeleting=false;
        }
    }

    getMessage(){
        return this;
    }
    
    get senderClass(){
        if(this.isSender){
            return "you";
        }else{
            return "notYou";
        }
    }
    set senderClass(value){}
    
    deleteThisMessage(delCodeNo){
        this.deleted=delCodeNo;
        this._msg=null;
        this._replyedMegObj=null;
        this._timeSentString=null;
        this._read=null;
        this._stared=null;
        this._deliverTime=null;
        this._readTime=null;
        this._drtime=null;    
    }    
}


class MessagesDBInstance{
    constructor(){
        this._messages={
            //object containing MessageInstance, with chatIDs as keys and msgID as subkeys
        }

        this.unseenMsgIDs={
            //constains objects of array, with chatID as object key
            //controlled by UnseenMsgIDs class 
        }

        this.gotAllMsgsStatus={
            // object with chaiID as key
        }
        
        this._msgInfoInView={
            /*
                chatID,
                msgID
            */
        }

        this._isSelectingMsgs; //true if selectig
    }

    getChatMessages(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.messages[chatID_DB];
    }


    getSenderClass(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        return this.getMsgInstance(chatID_DB, msgID).senderClass;
    }

    get msgInfoInView(){return this._msgInfoInView;}
    set msgInfoInView(value){}
    setMsgInfoInView(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        this._msgInfoInView.chatID=chatID_DB;
        this._msgInfoInView.msgID=msgID;
    }
    getMsgInstance(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        return this.messages[chatID_DB][msgID];
    }

    get messages(){return this._messages;}
    set messages(value){}



    get isSelectingMsgs(){return this._isSelectingMsgs;}
    set isSelectingMsgs(value){
        if(value===true || value==="true"){
            this._isSelectingMsgs=true;
        }else{
            this._isSelectingMsgs=false;
        }
    }
    

    deleteChat(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        delete(this.messages[chatID_DB]);
    }
    


    deleteMessage(chatID, msgID, delCodeNo){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        if(!delCodeNo){
            return;
        }
        this.messages[chatID_DB][msgID].deleteThisMessage(delCodeNo);
    }
    
    addMessage(chatID, msgObj, useChatFuncs=true){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        let previousMsgInstance=null;
    
        if(!this.messages[chatID_DB]){
            this.messages[chatID_DB]={};
            this.gotAllMsgsStatus[chatID_DB]=false;

            //try to get chat details from backend
            //check if chat exist, if not, fetch chat nd profile
            if(useChatFuncs){
                const chatObjIsAvailable=ChatFuncs.chatObjIsAvailable(chatID_DB);
                if(!chatObjIsAvailable){
                    //fetch chat and profile
                    ChatFuncs.fetchChatByID(chatID_DB);
                }
            }
        }else{
            previousMsgInstance=Object.values(this.messages[chatID_DB]);
            previousMsgInstance=previousMsgInstance[previousMsgInstance.length-1];
            // console.log(previousMsgInstance);
        }

        this.messages[chatID_DB][msgObj.msgID]=new MessageInstance(msgObj, previousMsgInstance);
        
        //update unread messages array
        let cccMsg=this.messages[chatID_DB][msgObj.msgID];
        if(!cccMsg.isSender && cccMsg.read!="read"){
            UnseenMsgIDs.add(chatID_DB, msgObj.msgID);
        }
        
        if(useChatFuncs){
            ChatFuncs.updateChatLastMsgObj(chatID_DB, msgObj);
            ChatFuncs.updateChatUnreadMsgCount(chatID_DB);
        }

        // console.log(22);
        if(ChatFuncs.isActiveChat(chatID_DB)){
            let newMsgInstance=this.messages[chatID_DB][msgObj.msgID];
            MessageFuncs.pushInNewMsg(chatID_DB, newMsgInstance, previousMsgInstance);
        }
        
    }

    convertMsgSendingToMsg(msgObj){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(msgObj.chatID);
        const msgSendingID=msgObj.msgSendingID;

        // console.log(msgObj.chatID, chatID_DB, msgSendingID)
        MsgOnSendingDB.deleteMsgOnSending(chatID_DB, msgSendingID);

        this.messages[chatID_DB][msgObj.msgID]=new MessageInstance(msgObj, null);
        MessageFuncs.correctFirstStatus(chatID_DB, msgObj.msgID);

    }

    addOldMessage(chatID, msgObj){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        let nextMsgInstance=null;
    
        if(!this.messages[chatID_DB]){
            this.messages[chatID_DB]={};
            this.gotAllMsgsStatus[chatID_DB]=false;
        }else{
            nextMsgInstance=Object.values(this.messages[chatID_DB]);
            nextMsgInstance=nextMsgInstance[0];
            // console.log(nextMsgInstance);
        }

        this.messages[chatID_DB][msgObj.msgID]=new MessageInstance(msgObj, null, false);

        //update first status
        let newMsg=this.messages[chatID_DB][msgObj.msgID];
        this.messages[chatID_DB][nextMsgInstance.msgID].first=
            newMsg.senderID!=nextMsgInstance.lastSender
            ||
            newMsg.dateSentString!=nextMsgInstance.lastMsgDate
        ;
    }


    getMessageObj(chatID, msgID, checkIfMsgExist=false){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        if(checkIfMsgExist){
            if(this.messages[chatID_DB][msgID]){
                return true;
            }else{
                return false;
            }
        }

        if(!this.messages[chatID_DB][msgID]){
            let errMsg="some error occoured";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return null;
        }
    
        return this.messages[chatID_DB][msgID].getMessage();
    }

    getStaredStatus(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        return this.messages[chatID_DB][msgID].stared;
    }
    
    getReadStatus(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        return this.messages[chatID_DB][msgID].read;
    }

    getMsgDelStatus(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        return this.messages[chatID_DB][msgID].deleted;
    }
    
    getIsSenderStatus(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        return this.messages[chatID_DB][msgID].isSender;
    }

    userIsSender(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        return this.messages[chatID_DB][msgID].isSender;
    }
    
    getFirstStatus(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
        
        return this.messages[chatID_DB][msgID].first;
    }
    
    
    setReadStatus(chatID, msgID, read, readTime){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        this.messages[chatID_DB][msgID].read=read;
        if(read=="read"){
            this.messages[chatID_DB][msgID].readTime=readTime;
        }
    }
    
    setStaredStatus(chatID, msgID, stared){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        this.messages[chatID_DB][msgID].stared=stared;
    }
    
    setDeliverTime(chatID, msgID, deliverTime){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);
    
        this.messages[chatID_DB][msgID].deliverTime=deliverTime;
    }
    

    setMsgInfoInView(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        this.msgInfoInView["chatID"]=chatID_DB;
        this.msgInfoInView["msgID"]=msgID;
    }    

    isLastMsgInDB(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        const timeSent=this.messages[chatID_DB][msgID].timeSent;

        let sameMsgID=msgID==ChatFuncs.getChatLastMsgObj(chatID_DB).msgID;
        let sameTime=timeSent==ChatFuncs.getChatLastMsgObj(chatID_DB).timeSent;

        console.log(
            sameMsgID,
            sameTime
        )
        
        return sameMsgID&&sameTime;
    }

    getChatMsgsAsArr(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);

        let chatMsgs=this.getChatMessages(chatID_DB);
        chatMsgs=Object.values(chatMsgs);
        // console.log(chatMsgs);
        return chatMsgs;
    }

    gotAllMsgs(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);

        return this.gotAllMsgsStatus[chatID_DB];
    }


    setMsgIsStaring(chatID, msgID, isStaring){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        // console.log(msgID_DB);
        this.messages[chatID_DB][msgID].isStaring=isStaring;
    }

    setMsgIsDeleting(chatID, msgID, isDeleting){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        this.messages[chatID_DB][msgID].isDeleting=isDeleting;
    }

    msgIsStaring(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        // console.log(msgID);
        return this.messages[chatID_DB][msgID].isStaring;
    }

    msgIsDeleting(chatID, msgID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        msgID=MsgBody.makeMsgID_DB_Usable(msgID);

        // console.log(chatID_DB);
        // console.log(msgID);
        return this.messages[chatID_DB][msgID].isDeleting;
    }
    
    
}

const MessagesDB=new MessagesDBInstance();
const MsgOnSendingDB=new MsgOnSendingDBInstance();
const ChatBoxDB=new ChatBoxDBInstance();

export{
    MessagesDB,
    MsgOnSendingDB,
    ChatBoxDB
}