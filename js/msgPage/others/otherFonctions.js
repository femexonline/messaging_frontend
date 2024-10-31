import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";



import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MsgBody
} from "../../msgPage/message/messageBody.js";

import {
    ChatBody
} from "../../msgPage/chat/chatBody.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../../_tempDatabase/messageFuncs.js";





class OtherFunctions{
    static clearMegChatTouchedTimeOut(event){
        clearTimeout(GlobalVars.megChatTouchedTimeOut);
        event.target.removeEventListener("touchend", OtherFunctions.clearMegChatTouchedTimeOut);
        event.target.removeEventListener("touchcancel", OtherFunctions.clearMegChatTouchedTimeOut);
        event.target.removeEventListener("touchmove", MsgBody.touchedThisMessageThenDrag);
        event.target.removeEventListener("touchmove", ChatBody.touchedThisChatThenDrag);
    }
    
    
    static activateMsgDateBeforeAfterfunc(){
        let Be=document.getElementsByClassName("Be")[0];
        let Af=document.getElementsByClassName("Af")[0];
        if(Be){
            Be.classList.remove("Be");
        }
        if(Af){
            Af.classList.remove("Af");
        }
    
        const msgDateBefor=OtherFunctions.getMsgDateBeforefunc();
        const msgDateAfter=OtherFunctions.getMsgDateAfterfunc();
    
        if(msgDateBefor){
            msgDateBefor.classList.add("Be");
        }
        if(msgDateAfter){
            msgDateAfter.classList.add("Af");
        }
    }
    
    static getMsgDateBeforefunc(){
        const messageBody=DOMGetter.getMessageBody();
    
        let allMsgDateClass=messageBody.getElementsByClassName("msgDate");
        let messageBodyTop=messageBody.getBoundingClientRect().top;
        let msgDateBe=null;
        for (let index = 0; index < allMsgDateClass.length; index++) {
            let msgDate = allMsgDateClass[index];
            let msgDateTop=msgDate.getBoundingClientRect().top;
            if(msgDateTop<messageBodyTop){
                msgDateBe=msgDate;
            }else{
                return msgDateBe;
            }
        }
        return msgDateBe;
    }
    
    static getMsgDateAfterfunc(){
        const messageBody=DOMGetter.getMessageBody();
    
        let allMsgDateClass=messageBody.getElementsByClassName("msgDate");
        let messageBodyTop=messageBody.getBoundingClientRect().top;
        let msgDateAf=null;
        for (let index = 0; index < allMsgDateClass.length; index++) {
            let msgDate = allMsgDateClass[index];
            let msgDateTop=msgDate.getBoundingClientRect().top;
            if(msgDateTop>=messageBodyTop){
                msgDateAf=msgDate;
                return msgDateAf;
            }
        }
        return msgDateAf;
    }
    
    static getMsgDateBeforeBeforefunc(date){
        const messageBody=DOMGetter.getMessageBody();
    
        let allMsgDateClass=messageBody.getElementsByClassName("msgDate");
        let msgDateBeBeDate=null;
        for (let index = 0; index < allMsgDateClass.length; index++) {
            let msgDate = allMsgDateClass[index];
            if(msgDate.innerHTML==date){
                return msgDateBeBeDate;
            }else{
                msgDateBeBeDate=msgDate.innerHTML;
            }
        }
        return msgDateBeBeDate;
    }

    static onclickReplyedMegLink(event){        
        let a=event.target;
        while(a.tagName!="A"){
            a=a.parentElement;
        }

        let replyedMeg=a.parentElement;

        const activeChatID=ChatFuncs.getActiveChat();
        const currentMsgID=replyedMeg.dataset.id;
        const replyedMegObj=MessageFuncs.getRepliedMsgObj(activeChatID, currentMsgID);
        if(!replyedMegObj){
            let errMsg="Error getting replyedMsgObj";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        // console.log(
        //     currentMsgID,
        //     replyedMegObj.msgID
        // );
        
        const replyedMegID=MsgBody.makeMsgIDUsable(replyedMegObj.msgID);
              
        let jumpToElem=document.getElementById(replyedMegID);
        if(jumpToElem){
            MsgBody.jumpToMsgByID(replyedMegID, true);
        }else{
            MessageFuncs.pushInPreviousMsgs(activeChatID, replyedMegID);
            jumpToElem=document.getElementById(replyedMegID);
            if(!jumpToElem){
                let errMsg="Error jumping";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode, true);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
            MsgBody.jumpToMsgByID(replyedMegID, true);
        }
    }
}


export{
    OtherFunctions
}