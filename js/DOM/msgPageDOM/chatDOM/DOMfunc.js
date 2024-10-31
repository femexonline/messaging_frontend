import{
    Settings
} from "../../../_settings/settings.js";

import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";



import{
    ChatsDB
} from "../../../_tempDatabase/chats.js";

import {
    ChatBody
} from "../../../msgPage/chat/chatBody.js";

import{
    DOMGetter,
    GlobalVars
} from "../../../msgPage/others/globalVariables.js";

import{
    ChatBodyDOM,
    ChatContainDOM,
    ChatPinedDOM,
    ChatCountDOM,
    ChatSelectedIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM
} from "../../../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";

import{
    ChatFuncs
} from "../../../_tempDatabase/chatsFunc.js";

import{
    ChatGroupActivations
} from "../../../msgPage/chat/chatGroupActivations.js";




class ChatDOMFunc{
    static moveChatElement(elem, elemBefore, skipParentCheck=false){
        let elemParent=elem.parentElement;
        let elemBeforeParent=elemBefore.parentElement;

        if(!skipParentCheck && elemParent!=elemBeforeParent){
            // console.log("ffff")
            return;
        }
    
        // elemParent.removeChild(chatHeadNormal);
        elemBeforeParent.insertBefore(elem, elemBefore);
    }
    
    static putChatContainElemInPosition(containElem, isChatID=false){
        let chatID, isInstance=false, isNewChatDOM=false, skipParentCheck;
        if(isChatID){
            chatID=containElem;
            chatID=ChatBody.makeChatIDUsable(chatID);
            containElem=document.getElementById(chatID);
        }else{
            chatID=containElem.id;
            isNewChatDOM=!containElem.parentElement;
            //if it is instance
            if(!chatID){
                chatID=containElem.chatID;
                chatID=ChatBody.makeChatIDUsable(chatID);
                containElem=ChatContainDOM.create(containElem);
                isInstance=true;
            }
        }

        if(ChatFuncs.getIsSelectingChats()){
            ChatGroupActivations.allChatSelected(containElem);
        }

        skipParentCheck=isInstance||isNewChatDOM;

        chatID=ChatBody.makeChatIDUsable(chatID);
        let nextChatID=ChatsDB.getNextDBChatID(chatID);
        // console.log(
        //     chatID,
        //     nextChatID
        // )
        //chat not found
        if(nextChatID==-1){
            let errMsg="Chat not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        //is last chat, and would append if all chat are available
        if(nextChatID==-2){
            let chatsCount=ChatFuncs.getChatsCount();
            let chatContainerCount=ChatContainDOM.getCountChatContains();
            // console.log(
            //     chatsCount,
            //     chatContainerCount
            // )
            //is last chat, and would append if all chat are available
            //chat should probabliy be removed from DOM and DB in some unpin action cases
            if(ChatFuncs.gotAllChatsFromDB() && !chatsCount-chatContainerCount){
                ChatContainDOM.append(containElem)    
                return;
            }
        }
    
        // console.log(nextChatID);
        nextChatID=ChatBody.makeChatIDUsable(nextChatID);
        let elemBefore=document.getElementById(nextChatID);
        if(elemBefore){
            // console.log("dd");
            ChatDOMFunc.moveChatElement(containElem, elemBefore, skipParentCheck);
        }else{
            //we are probably not supposed to get here
            nextChatID=ChatsDB.getNextDBChatID(chatID, true);
            // console.log(
            //     chatID,
            //     nextChatID
            // )
            //chat not found
            if(nextChatID==-1){
                let errMsg="Chat not found";
                let errCode="";
                let userErr=false;
                let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
            //is last chat, and would append if all chat are available
            if(nextChatID==-2){
                let chatsCount=ChatFuncs.getChatsCount();
                let chatContainerCount=ChatContainDOM.getCountChatContains();
                // console.log(
                //     chatsCount,
                //     chatContainerCount
                // )
                //is last chat, and would append if all chat are available
                //chat should probabliy be removed from DOM and DB in some unpin action cases
                if(ChatFuncs.gotAllChatsFromDB() && !chatsCount-chatContainerCount){
                    ChatContainDOM.append(containElem)    
                    return;
                }

                ChatContainDOM.delete(chatID)    
                return;
            }


            nextChatID=ChatBody.makeChatIDUsable(nextChatID);
            let elemBefore=document.getElementById(nextChatID);
            if(!elemBefore){
                let errMsg="fatal error";
                let errCode="";
                let userErr=false;
                let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
                if(errHandler){
                    console.log(errHandler);
                    console.log(nextChatID);
                }
                return;
            }
            // console.log("ddbtm");
            ChatDOMFunc.moveChatElement(containElem, elemBefore, skipParentCheck);
        }
    }
}


export{
    ChatDOMFunc
}