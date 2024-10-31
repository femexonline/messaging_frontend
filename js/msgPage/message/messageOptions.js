import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MsgGroupActivations
} from "../../msgPage/message/messageGroupActivations.js";

import{
    MsgGroupDeactivations
} from "../../msgPage/message/messageGroupDeactivations.js";

import{
    MsgBody
} from "../../msgPage/message/messageBody.js";

import{
    MessageFuncs
} from "../../_tempDatabase/messageFuncs.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";

import{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";

import{
    ChatBoxDOM, 
    ChatboxReplyDOM 
} from "../../DOM/msgPageDOM/msgDOM/chatBoxDOM.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import{
    ChatBoxDB
} from "../../_tempDatabase/messages.js";

import{
    GenerateAPIRes
} from "../../_tempDatabase/_dummyAPIResponse.js";

import{
    MsgApis
} from "../../_apis/msgApis.js";





class MsgOptions{
    static selectThisMessage(event){
        let messageHeadCount=DOMGetter.getMessageHeadCount();
    
        const chatID=ChatFuncs.getActiveChat();

        let messageID=event.path[1].dataset["id"];
        let currentSelectMessageOption=event.target;
        currentSelectMessageOption.removeEventListener("click", MsgOptions.selectThisMessage);
    
        MsgBody.emptySelectedMessagesID();
    
        MsgGroupActivations.allSelected_Megchecked();
        MsgGroupDeactivations.megSelectMoreOptions();
    
        let senderClass=MessageFuncs.getMsgSenderClass(chatID, messageID);
        
        let selected=document.getElementsByName(messageID)[0];
        let Megchecked=document.getElementsByName(messageID)[1].getElementsByTagName("input")[0];
        
        MsgBody.updateSelectedMessagesID(messageID, senderClass);
        
        messageHeadCount.innerHTML=GlobalVars.selectedMessagesID.length;
        selected.classList.add("s");
        Megchecked.setAttribute("checked", "true");
    }
    
    static getThisMessageInfo(event){
        /*
            parameter event can be event or msgID
        */
        
        let msgInfoPopUp=DOMGetter.getMsgInfoPopUp();
    
        let msgID=event.target, evet=true;
        if(msgID){
            msgID=event.target.parentElement.dataset.id;
        }else{
            msgID=event;
            evet=false;
        }
    
        if(evet){
            MsgGroupDeactivations.megSelectMoreOptions();
        }
    
        msgID=MsgBody.makeMsgIDUsable(msgID);

        let activeChat=ChatFuncs.getActiveChat();
        let msgObj=MessageFuncs.getMessageObj(activeChat, msgID);
        let msgWrapperClone=document.getElementById(msgID);
        msgWrapperClone=msgWrapperClone.cloneNode(true);
        // let drtime=msgWrapperClone.dataset.drtime;
        let drtime=msgObj.drtime;
    
        if(msgInfoPopUp){MsgInfoPopUpDOM.delete();}
        MsgInfoPopUpDOM.append(MsgInfoPopUpDOM.create(msgWrapperClone, drtime));
    
        MessageFuncs.setMsgInfoInView(activeChat, msgID);
    
        msgInfoPopUp=DOMGetter.getMsgInfoPopUp();
        let body=msgInfoPopUp.getElementsByClassName("body")[0];
        let head=msgInfoPopUp.getElementsByClassName("head")[0];
    
        //scroll to bottom if scroll is possible
        let bodyHeight=body.getBoundingClientRect().height;
        let scrlHeight=body.scrollHeight;
        if(scrlHeight>bodyHeight){
            let diff=scrlHeight-bodyHeight;
            body.scrollTop=body.scrollTop+diff;
            head.classList.add("bodyScrl");
        }
        // console.log(msgID);
        // console.log("getThisMessageInfo");
        // alert("function not available yet");
    }
    
    static replyThisMessage(event){
        /*
            parameter event can be event or msgID
        */
       const activeChat=ChatFuncs.getActiveChat();
       let chatBox=DOMGetter.getChatBox();
    
        let msgID=event.target, evet=true;
        if(msgID){
            msgID=event.target.parentElement.dataset.id;
        }else{
            msgID=event;
            evet=false;
        }
    
        const msgInstance=MessageFuncs.getMessageObj(activeChat, msgID);
        if(!msgInstance.chatID){
            msgInstance.chatID=activeChat;
        }
        ChatBoxDB.addRMsgObj(activeChat, msgInstance);
        const rMsgObj=ChatBoxDB.getRMsgObj(activeChat);    
    
        if(chatBox){
            let textMegContain=chatBox.getElementsByClassName("textMegContain")[0];
            let replyedMeg=textMegContain.getElementsByClassName("replyedMeg")[0];
            if(replyedMeg){ChatboxReplyDOM.delete();}
            ChatboxReplyDOM.append(ChatboxReplyDOM.create(rMsgObj));
        }else{
            ChatBoxDOM.append(ChatBoxDOM.create());
            chatBox=DOMGetter.getChatBox();
        }
    
        ShowChatBoxDOM.delete(true);
    
        if(evet){
            MsgGroupDeactivations.megSelectMoreOptions();
        }
    
        // console.log("replyThisMessage");
        // alert("function not available yet");
    }
    
    static fowardThisMessage(event){
        let msgID=event.target.parentElement.dataset.id;
        console.log(msgID);
        console.log("fowardThisMessage");
        alert("function not available yet");
    }
    
    static starThisMessage(event){
        const chatID=ChatFuncs.getActiveChat();
        let star=event.target;
        let msgID=star.parentElement.dataset.id;
        // console.log(msgID);
        const apiMsgIDs=[msgID];


        MsgGroupDeactivations.megSelectMoreOptions();

        MsgApis.starMsg(chatID, apiMsgIDs);
    
    
        // console.log("starThisMessage");
        // alert("function not available yet");
    }
    
    static deleteThisMessage(event){
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let chatMousePosBody=DOMGetter.getChatMousePosBody();
        let deleteMessageOption=DOMGetter.getDeleteMessageOption();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
        if(deleteMessageOption){DeleteMessageOptionPopupDOM.delete();}
        
        const chatID=ChatFuncs.getActiveChat();
    
        let msgID=event.target.parentElement.dataset.id;
        let senderClass=MessageFuncs.getMsgSenderClass(chatID, msgID);
    
        MsgBody.emptySelectedMessagesID();
        
        MsgBody.updateSelectedMessagesID(msgID, senderClass);
    
        let DFE=false;
        if(senderClass=="you"){
            DFE=true;
        }
        let delMsg="Delete Message?";
        DeleteMessageOptionPopupDOM.append(DeleteMessageOptionPopupDOM.create(delMsg, DFE));
    
        MsgGroupDeactivations.megSelectMoreOptions();
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
        // console.log(msgID);
        // console.log("deleteThisMessage");
        // alert("function not available yet");
    }
    
    static deleteMessage(delForEvery, group=false){ 
        const chatID=ChatFuncs.getActiveChat();
        let apiMsgIDs=[...GlobalVars.selectedMessagesID];


        if(group){
            MsgGroupDeactivations.allSelected_Megchecked();
        }
    
        MsgApis.deleteMsg(chatID, apiMsgIDs, delForEvery);
    }
    
    static activateDeleteMessage(event){
        let messageHeadSelected=DOMGetter.getMessageHeadSelected();
    
        let DFEClass=event.target.classList.contains("DFE");
        let delForEveryAllowed=false;
        let delForEvery;
        let delForEveryAllow=GlobalVars.msgSenderTracking.indexOf("notYou");
        if(delForEveryAllow<0){
            delForEveryAllowed=true;
        }
    
        delForEvery=delForEveryAllowed&&DFEClass;
    
        MsgOptions.cancleDeleteMessage();
        if(messageHeadSelected.style.display!="flex"){
            MsgOptions.deleteMessage(delForEvery);
        }else{
            MsgOptions.deleteMessage(delForEvery, true);
        }
    }
    
    static cancleDeleteMessage(event){
        let chatMousePosBody=DOMGetter.getChatMousePosBody();
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let deleteMessageOption=DOMGetter.getDeleteMessageOption();
    
        let continu=true;
        if(event){
            continu=false;
            let id=event.target.id;
            if(id){
                if(id=="deleteMessageOption"){
                    continu=true;
                }
            }
            let classNa=event.target.classList;
            if(classNa){
                if(classNa.contains("C")){
                    continu=true;
                }
            }
        }
        if(continu){
            if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
            if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
            if(deleteMessageOption){DeleteMessageOptionPopupDOM.delete();}
        }
    }
}




export{
    MsgOptions
}