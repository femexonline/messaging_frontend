import{
    Settings
} from "../../../_settings/settings.js";

import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";



import{
    OnloadActivations
} from "../../../msgPage/others/onloadActivations.js";

import{
    DOMGetter,
    GlobalVars
} from "../../../msgPage/others/globalVariables.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import { 
    MsgBody 
} from "../../../msgPage/message/messageBody.js";

import{
    MessagesDB,
    MsgOnSendingDB,
    ChatBoxDB
} from "../../../_tempDatabase/messages.js";

import{
    ChatFuncs
} from "../../../_tempDatabase/chatsFunc.js";





class ChatBoxDOM{
    static create(){        
        const activeChatID=ChatFuncs.getActiveChat();
        let chatBoxAttr=null;
        let chatBoxMsg=null;
        let rMsgObj=null;


        if(ChatBoxDB.chatHasChatBox(activeChatID)){
            chatBoxAttr=ChatBoxDB.getChatBoxAttr(activeChatID);
            chatBoxMsg=chatBoxAttr.msg;
            rMsgObj=chatBoxAttr.rMsg;
        }

        let chatBox=document.createElement("div");
        chatBox.id="chatBox";
        chatBox.style.display="flex";
        
    
        let closeChatBox=document.createElement("div");
        closeChatBox.id="closeChatBox";
        closeChatBox.className="material-icons flexCenter";
        closeChatBox.innerHTML="close";
        chatBox.appendChild(closeChatBox);
    
    
        let cchatBox=document.createElement("div");
        cchatBox.className="cchatBox";
    
        let textMegContain=document.createElement("div");
        textMegContain.className="textMegContain";
        if(rMsgObj){
            let replyedMeg=ChatboxReplyDOM.create(rMsgObj);
            textMegContain.appendChild(replyedMeg);
            textMegContain.classList.add("replying");
        }
    
        let textContain=document.createElement("div");
        textContain.className="textContain";
        let placeholder=document.createElement("div");
        placeholder.className="text placeholder";
        placeholder.innerHTML="Type text message";
        textContain.appendChild(placeholder);
        let chatBoxTextMsg=document.createElement("div");
        chatBoxTextMsg.id="chatBoxTextMsg";
        chatBoxTextMsg.className="text";
        chatBoxTextMsg.setAttribute("contentEditable", "true");
        if(chatBoxMsg){
            chatBoxTextMsg.innerHTML=chatBoxMsg;
            placeholder.classList.add("hide");
        }
        textContain.appendChild(chatBoxTextMsg);
    
        textMegContain.appendChild(textContain);
        cchatBox.appendChild(textMegContain);
        chatBox.appendChild(cchatBox);
    
        let sendIcon=document.createElement("div");
        sendIcon.className="material-icons flexCenter send";
        sendIcon.innerHTML="send";
        chatBox.appendChild(sendIcon);
    
        let chatBOX={
            "closeChatBox":closeChatBox,
            "chatBoxTextMsg":chatBoxTextMsg,
            "sendIcon":sendIcon
        }
        ChatBoxDOM.onload(chatBOX);
    
        return chatBox;
    }
        
    static append(chatboxElem){
        const message=DOMGetter.getMessage();
    
        if(message){
            message.appendChild(chatboxElem);
        }else{
            let errMsg="msgElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
        
    static delete(){
        const chatBox=DOMGetter.getChatBox();
    
        if(chatBox){
            let parent=chatBox.parentNode;
            parent.removeChild(chatBox);
        }else{
            let errMsg="chatBoxElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static onload(chatBoxElmArray){
        let closeChatBox=chatBoxElmArray["closeChatBox"];
        let chatBoxTextMsg=chatBoxElmArray["chatBoxTextMsg"];
        let sendIcon=chatBoxElmArray["sendIcon"];
    
        if(closeChatBox){
            closeChatBox.addEventListener("click", ChatBoxDOM.onclickCloseChatBoxButton);
        }
        if(chatBoxTextMsg){
            chatBoxTextMsg.addEventListener("keyup", ChatBoxDOM.typingMessage);
            chatBoxTextMsg.addEventListener("keydown", ChatBoxDOM.typingMessage);
        }
        if(sendIcon){
            sendIcon.addEventListener("click", MsgBody.sendMsg);
        }        
    }

    static typingMessage(event){
        let textBox=event.target;
        let textBoxplaceholder=textBox.previousElementSibling;
    
        if(textBox.innerHTML){
            textBoxplaceholder.classList.add("hide");
        }else{
            textBoxplaceholder.classList.remove("hide");
        }

        // console.log(event.type);
        if(event.type=="keyup"){
            const msg=textBox.innerHTML;
            // console.log("up");
            const activeChatID=ChatFuncs.getActiveChat();
            ChatBoxDB.updateMsg(activeChatID, msg);
        }
    }

    static onclickCloseChatBoxButton(){
        const showChatBox=DOMGetter.getShowChatBox();
    
        if(showChatBox){ShowChatBoxDOM.delete();}
        ChatBoxDOM.delete();

        const activeChatID=ChatFuncs.getActiveChat();
        if(ChatBoxDB.chatHasChatBox(activeChatID)){
            ChatBoxDB.deleteChatBoxAttr(activeChatID);
        }

        ShowChatBoxDOM.append(ShowChatBoxDOM.create());
        // showChatBox.style.display="";
        // chatBox.style.display="";
    }
}

class ChatboxReplyDOM{
    static create(rMsgObj){
        /* expect from rMsgObj
            msgID,
            isSender,
            msg,
            senderName
        */

        if(!rMsgObj){
            const activeChatID=ChatFuncs.getActiveChat();
            rMsgObj=ChatBoxDB.getRMsgObj(activeChatID);
        }

        if(!rMsgObj){
            let errMsg="rMsgObj not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        let senderClass, hash, isSender, msg, sender;
        let span;
        hash="#"+MsgBody.makeMsgIDUsable(rMsgObj["msgID"]);
        isSender=rMsgObj["isSender"];
        if(isSender){
            //senderID is userID
            senderClass="you";
        }else{
            senderClass="notYou";
        }
        sender=rMsgObj["senderName"];
        msg=rMsgObj["msg"];
    
    
    
        let replyedMeg=document.createElement("div");
        replyedMeg.className="replyedMeg";
    
        let div=document.createElement("div");
        replyedMeg.appendChild(div);
    
        let close=document.createElement("span");
        close.className="material-icons flexCenter close";
        close.innerHTML="close"
        replyedMeg.appendChild(close);
    
        span=document.createElement("span");
        span.className=senderClass;
        replyedMeg.appendChild(span);
    
        let a=document.createElement("a");
        a.href=hash;
        span=document.createElement("span");
        span.className=senderClass;
        span.innerHTML=sender;
        a.appendChild(span);
        let text=document.createTextNode(msg);
        a.appendChild(text);
        replyedMeg.appendChild(a);
    
        let chatboxReplyElemArray={
            "close":close
        }
        OnloadActivations.chatboxReplyElem(chatboxReplyElemArray);
    
    
        return replyedMeg;
    }

    static append(chatboxReplyElem){
        let chatBox=DOMGetter.getChatBox();
        let textMegContain=chatBox.getElementsByClassName("textMegContain")[0];
        let textContain=textMegContain.getElementsByClassName("textContain")[0];
        let parent=textContain.parentNode;
    
        if(textContain){
            parent.insertBefore(chatboxReplyElem, textContain);
            textMegContain.classList.add("replying");
        }else{
            let errMsg="textContainElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        let chatBox=DOMGetter.getChatBox();
        let textMegContain=chatBox.getElementsByClassName("textMegContain")[0];
        let replyedMeg=textMegContain.getElementsByClassName("replyedMeg")[0];
    
        if(replyedMeg){
            let parent=replyedMeg.parentNode;
            parent.removeChild(replyedMeg);
    
            textMegContain.classList.remove("replying");
        }else{
            let errMsg="rMsgElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static close(){
        ChatboxReplyDOM.delete();

        const activeChatID=ChatFuncs.getActiveChat();
        ChatBoxDB.deleteRMsgObj(activeChatID);
    }
}


export{
    ChatBoxDOM, 
    ChatboxReplyDOM 
}