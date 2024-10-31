import{
    MessagesDB
} from "../../../_tempDatabase/messages.js";

import {
    ChatBody
} from "../../../msgPage/chat/chatBody.js";

import{
    ChatsDB
} from "../../../_tempDatabase/chats.js";

import{
    MessageBodyDOM,
    MsgDateDOM,
    MsgWraperDOM,
    DeletedMsgDOM,
    StarDOM
} from "../../../DOM/msgPageDOM/msgDOM/msgBodyDOM.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import { 
    ChatFuncs 
} from "../../../_tempDatabase/chatsFunc.js";

import { 
    MsgBody 
} from "../../../msgPage/message/messageBody.js";




class UpdateMsgDOM{
    static starElem(chatID, msgID){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        if(!ChatFuncs.isActiveChat(chatID)){
            return;
        }
    
        const msgWrapper=document.getElementById(msgID);
        if(!msgWrapper){
            return;
        }
        const messageContainer=msgWrapper.getElementsByClassName("messageContainer")[0];
        const staredElem=messageContainer.getElementsByClassName("stared")[0];
        const staredStatus=MessagesDB.getStaredStatus(chatID, msgID);
        const starThisMessage=msgWrapper.getElementsByClassName("starThisMessage")[0];
        if(staredStatus){
            if(!staredElem){
                StarDOM.append(msgID, StarDOM.create());
                starThisMessage.innerHTML="Unstar";
            }
        }else{
            if(staredElem){
                StarDOM.delete(msgID);
                starThisMessage.innerHTML="Star";
            }
        }
    }
    
    static readElem(chatID, msgID){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        if(!ChatFuncs.isActiveChat(chatID_DB)){
            return;
        }
    
    
        if(!MessagesDB.userIsSender(chatID_DB, msgID)){
            return;
        }
    
        const msgWrapper=document.getElementById(msgID);
        if(!msgWrapper){
            return;
        }
    
        const readTextObj={
            "sent":"done",
            "delivered":"done_all",
            "read":"done_all"
        };
        const readClassObj={
            "sent":"",
            "delivered":"",
            "read":"read"
        };
        
        const messageContainer=msgWrapper.getElementsByClassName("messageContainer")[0];
        const seenElems=messageContainer.getElementsByClassName("seen");
        const readStatus=MessagesDB.getReadStatus(chatID_DB, msgID);
        
        for (let index = 0; index < seenElems.length; index++) {
            const seenElem = seenElem[index];
            seenElem.className.remove(readClassObj.read);
            seenElem.className.add(readClassObj[readStatus]);
            seenElem.innerHTML=readTextObj[readStatus];
        }
    
        let msgFullId={
            "chatID":chatID_DB,
            "msgID":msgID
        };
        if(msgFullId==MessagesDB.msgInfoInView){
            const msgInfoPopUp=getMsgInfoPopUp();
            if(msgInfoPopUp){
                const messageContainer=msgInfoPopUp.getElementsByClassName("messageContainer")[0];
                const seenElems=messageContainer.getElementsByClassName("seen");
                const readStatus=MessagesDB.getReadStatus(chatID_DB, msgID);
                
                for (let index = 0; index < seenElems.length; index++) {
                    const seenElem = seenElem[index];
                    seenElem.className.remove(readClassObj.read);
                    seenElem.className.add(readClassObj[readStatus]);
                    seenElem.innerHTML=readTextObj[readStatus];
                }
            }
        }
    
    }
    
    static deletedMsgElem(chatID, msgID){
        if(!ChatFuncs.isActiveChat(chatID)){
            return;
        }
    
        const msgWrapper=document.getElementById(msgID);
        if(!msgWrapper){
            return;
        }
    
        if(!MessagesDB.getMsgDelStatus(chatID, msgID)){
            return;
        }
    
        let msgInstance=MessagesDB.getMsgInstance(chatID, msgID);
        MsgWraperDOM.delete(msgInstance);
    }

    static messageHeadLastSeenElem(chatID){
        if(!ChatFuncs.isActiveChat(chatID)){
            return;
        }

        const lastSeenString=ChatFuncs.getChatLastSeenString(chatID);

        // we can add delition of online marker too
        let messageHeadNameTimeElem=document.getElementById("messageHeadNameTime");
        if(messageHeadNameTimeElem){
            MessageHeadNormalDOM.deleteLastSeen();
        }

        if(lastSeenString){
            MessageHeadNormalDOM.appendLastSeen(MessageHeadNormalDOM.createLastSeen(lastSeenString));
        }
    }
}

export{
    UpdateMsgDOM
}