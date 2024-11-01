import{
    Settings
} from "../../_settings/settings.js";

import{
    ChatsDB
} from "../../_tempDatabase/chats.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../../_tempDatabase/messageFuncs.js";

import{
    MsgSectionDOM
} from "../../DOM/msgPageDOM/msgDOM/messageSection.js";

import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import{
    ChatBodyDOM,
    ChatContainDOM,
    ChatPinedDOM,
    ChatCountDOM,
    ChatSelectedIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM
} from "../../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    ChatGroupActivations
} from "../../msgPage/chat/chatGroupActivations.js";

import{
    ChatGroupDeactivations
} from "../../msgPage/chat/chatGroupDeactivations.js";

import{
    OtherFunctions
} from "../../msgPage/others/otherFonctions.js";

import{
    MsgBody
} from "../../msgPage/message/messageBody.js";

import {
    ChatFuncs 
} from "../../_tempDatabase/chatsFunc.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";



class ChatBody{
    static loadChatMessages(event){
        if(GlobalVars.chatsAreSelected){
            return;
        }
    
        let target=event.target;
        let clsList=target.classList;
    
        let chatElement=target;
        if(!chatElement.dataset["id"]){
            while(!chatElement.dataset["id"]){
                chatElement=chatElement.parentElement;
            }
        }
        let chatID=chatElement.dataset["id"];
        let chatContain=document.getElementById(chatID);

        if(!chatContain){
            return;
        }
        //prevent unnessarry selection
        if(!ChatContainDOM.isSelectable(chatContain)){
            return;
        }
        
        chatContain.removeEventListener("touchend", ChatBody.loadChatMessages);
        chatContain.removeEventListener("touchcancel", ChatBody.loadChatMessages);
    
        
        const acetedClasses=[
            "nameSubContain",
            "chatSubContain",
            "lMeg"
        ];
        let continu=false;
        let index=0;
        while(index<acetedClasses.length && !continu){
            if(clsList.contains(acetedClasses[index])){
                continu=true;
            }
            index++;
        }
        if(!continu){
            return;
        }
    
        let activeChat=ChatsDB.activeChat;
        if(ChatBody.makeChatID_DB_Usable(activeChat)==ChatBody.makeChatID_DB_Usable(chatID)){
            return;
        }

        MsgSectionDOM.clear();

        ChatsDB.activeChat=chatID;

        const messageSection=DOMGetter.getMessage();
        let loaderBackgroundElem=DOMGetter.getLoaderBackgroundElem(messageSection);
        let contentLoaderElem=DOMGetter.getContentLoaderElem(messageSection);
        if(!loaderBackgroundElem){LoaderBackgroundDOM.append(messageSection, LoaderBackgroundDOM.create());;}
        if(!contentLoaderElem){ContentLoaderDOM.append(messageSection, ContentLoaderDOM.create(true, "boxes"));}
    
        MsgSectionDOM.load();
        MessageFuncs.pushMessagesIn(chatID);
        MessageFuncs.pushMsgSendingIn(chatID);
    
        let firstUnreadMsgID=UnseenMsgIDs.get(chatID, true);
        // console.log(firstUnreadMsgID);
        if(firstUnreadMsgID){
            MsgBody.jumpToMsgByID(firstUnreadMsgID);
        }else{
            MsgBody.jumpToBottom();
        }

        //work on seen msgs
        MsgBody.checkIfUnseenMsgsAreSeenOnload(chatID);

        const messageBody=DOMGetter.getMessageBody();
        messageBody.addEventListener("scroll", MsgBody.scrlMsgBodyToSeeMsg);

        loaderBackgroundElem=DOMGetter.getLoaderBackgroundElem(messageSection);
        contentLoaderElem=DOMGetter.getContentLoaderElem(messageSection);
        if(loaderBackgroundElem){LoaderBackgroundDOM.delete(messageSection);}
        if(contentLoaderElem){ContentLoaderDOM.delete(messageSection);}    
    }
        
    
    static selectUnselectChat(event){
        const chatHeadCount=DOMGetter.getChatHeadCount();
    
        let chatSelected=event.target;
        let chatID=chatSelected.dataset["id"];
        let chatContain=document.getElementById(chatID);
        let chatSelect=chatContain.getElementsByClassName("chatSelect")[0];

        //prevent unnessarry selection
        if(!ChatContainDOM.isSelectable(chatContain)){
            return;
        }

        if(ChatBody.updateSelectedChatsID(chatID)){
            if(chatSelect){ChatSelectedIconDOM.delete(chatID);}
            chatContain.style.background="#F5F5F5";
            ChatSelectedIconDOM.append(chatID, ChatSelectedIconDOM.create()); 
        }else{
            chatContain.style.background="";
            ChatSelectedIconDOM.delete(chatID)    
        }
        chatHeadCount.innerHTML=GlobalVars.selectedChatsID.length;

        //add or remove head icons
        const chatOptionsSettings=Settings.ChatOptions;
        const chatHeadPinIcon=DOMGetter.getChatHeadPin();
        const chatHeadDelIcon=DOMGetter.getChatHeadDelete();
        if(GlobalVars.selectedChatsID.length>1){
            if(chatOptionsSettings.groupChatPin){
                if(!chatHeadPinIcon){
                    ChatHeadSelectedDOM.appendIcon(ChatHeadSelectedDOM.createChatPinIcon());
                }
            }else{
                if(chatHeadPinIcon){
                    ChatHeadSelectedDOM.deleteIcon(chatHeadPinIcon);
                }
            }
            if(chatOptionsSettings.groupDelChat){
                if(!chatHeadDelIcon){
                    ChatHeadSelectedDOM.appendIcon(ChatHeadSelectedDOM.createChatDelIcon());
                }
            }else{
                if(chatHeadDelIcon){
                    ChatHeadSelectedDOM.deleteIcon(chatHeadDelIcon);
                }
            }
        }else{
            if(chatOptionsSettings.pinChat){
                if(!chatHeadPinIcon){
                    ChatHeadSelectedDOM.appendIcon(ChatHeadSelectedDOM.createChatPinIcon());
                }
            }
            if(chatOptionsSettings.deleteChat){
                if(!chatHeadDelIcon){
                    ChatHeadSelectedDOM.appendIcon(ChatHeadSelectedDOM.createChatDelIcon());
                }
            }
        }
    }
    
    static touchedThisChatThenDrag(event){
        const chatBody=DOMGetter.getChatBody();
    
        clearTimeout(GlobalVars.megChatTouchedTimeOut);
    
        let chatBodyPos=chatBody.getBoundingClientRect();
    
        let currentTouchYPos=event.touches[0].clientY;
        let changeYPos=GlobalVars.touchYPos-currentTouchYPos;
        if(chatBodyPos.top<=currentTouchYPos && chatBodyPos.bottom>=currentTouchYPos){
            chatBody.scrollTo(chatBody.scrollLeft, chatBody.scrollTop+changeYPos);
        }
        GlobalVars.touchYPos=currentTouchYPos;
    }
    
    static touchedThisChat(event){
        event.preventDefault();
        const chatHeadCount=DOMGetter.getChatHeadCount();
    
        GlobalVars.touchYPos=event.touches[0].clientY;
        let chatElement=event.target;
        if(!chatElement.dataset["id"]){
            while(!chatElement.dataset["id"]){
                chatElement=chatElement.parentElement;
            }
        }
        let chatID=chatElement.dataset["id"];
        let chatContain=document.getElementById(chatID);
    
        // console.log(GlobalVars.chatsAreSelected);
        if(!GlobalVars.chatsAreSelected){
            chatContain.addEventListener("touchend", ChatBody.loadChatMessages);
            chatContain.addEventListener("touchcancel", ChatBody.loadChatMessages);
        }
    
        if(!GlobalVars.chatsAreSelected){
            GlobalVars.megChatTouchedTimeOut=setTimeout(
                ()=>{
                    let chatContain=document.getElementById(chatID);
                    //prevent unnessarry selection
                    if(!ChatContainDOM.isSelectable(chatContain)){
                        return;
                    }
            
                    let chatSelect=chatContain.getElementsByClassName("chatSelect")[0];
                    if(chatSelect){ChatSelectedIconDOM.delete(chatID);}
    
                    chatContain.removeEventListener("touchend", ChatBody.loadChatMessages);
                    chatContain.removeEventListener("touchcancel", ChatBody.loadChatMessages);
    
                    ChatGroupActivations.allChatSelected();
                    ChatGroupDeactivations.removeAllChatHoverEffect();
                
                    chatContain.style.background="#F5F5F5";
                    ChatSelectedIconDOM.append(chatID, ChatSelectedIconDOM.create());  
                
                    ChatBody.updateSelectedChatsID(chatID);
                    chatHeadCount.innerHTML=GlobalVars.selectedChatsID.length;
    
                    event.target.removeEventListener("touchend", OtherFunctions.clearMegChatTouchedTimeOut);
                    event.target.removeEventListener("touchcancel", OtherFunctions.clearMegChatTouchedTimeOut);
                    event.target.removeEventListener("touchmove", ChatBody.touchedThisChatThenDrag);        
                }, 1000
            );
        }
        event.target.addEventListener("touchend", OtherFunctions.clearMegChatTouchedTimeOut);
        event.target.addEventListener("touchcancel", OtherFunctions.clearMegChatTouchedTimeOut);
        event.target.addEventListener("touchmove", ChatBody.touchedThisChatThenDrag);        
    }
    
    static updateSelectedChatsID(id){
        id=ChatBody.makeChatIDUsable(id);
        let selectedIDIndex=GlobalVars.selectedChatsID.indexOf(id);
        let added=false;
        if(selectedIDIndex<0){
            GlobalVars.selectedChatsID.push(id);
            added=true;
        }else{
            GlobalVars.selectedChatsID.splice(selectedIDIndex, 1);
        }
        return(added);
    }
    
    static emptySelectedChatsID(){
        //empty the selection array
        if(GlobalVars.selectedChatsID){
            GlobalVars.selectedChatsID.splice(0, GlobalVars.selectedChatsID.length); 
        }
    }
    
    static makeChatIDUsable(chatID){
        if(!/chat/.test(chatID)){
            chatID="chat-"+chatID;
        }
        return chatID;
    }
    
    static makeChatID_DB_Usable(chatID){
        if(/chat/.test(chatID)){
            chatID=chatID.split("chat-").splice(-1)[0];
        }
        return chatID;
    }
}


export{
    ChatBody
}


