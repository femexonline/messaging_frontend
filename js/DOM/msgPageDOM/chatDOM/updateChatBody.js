import{
    Settings
} from "../../../_settings/settings.js";

import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";



import{
    ChatsDB
} from "../../../_tempDatabase/chats.js";

import{
    ChatFuncs
} from "../../../_tempDatabase/chatsFunc.js";

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
    ChatOnlineIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM,
    NoChatFoundDOM
} from "../../../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";

import{
    ChatDOMFunc
} from "../../../DOM/msgPageDOM/chatDOM/DOMfunc.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";



class UpdateChatDOM{

    static deleteChatElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
        ChatContainDOM.delete(chatID);
    }

    static imageElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        const chatContain=document.getElementById(chatID);
        const chatPix=chatContain.getElementsByClassName("chatPix")[0];
        const image=chatPix.getElementsByTagName("img")[0];
        image.src=ChatsDB.getChatImage(chatID);
    }
    
    static nameElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        const chatContain=document.getElementById(chatID);
        const nameContain=chatContain.getElementsByClassName("nameContain")[0];
        const nameSubContain=nameContain.getElementsByClassName("nameSubContain")[0];
        nameSubContain.innerHTML=ChatsDB.getChatName(chatID);
    }
    
    static chatCountElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        const chatContain=document.getElementById(chatID);
        const lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
        const chatCount=lMegContain2.getElementsByClassName("chatCount")[0];
        const count=ChatsDB.getChatUnreadMsgCount(chatID);
        // console.log(count);
        if(chatCount){
            ChatCountDOM.delete(chatID);
        }

        if(count){
            ChatCountDOM.append(chatID, ChatCountDOM.create(count));
        }
    }
    
    static pinedElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        const chatContain=document.getElementById(chatID);
        const lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
        const chatPined=lMegContain2.getElementsByClassName("chatPined")[0];
        const pined=ChatsDB.getChatPinedStatus(chatID);
        if(pined){
            if(!chatPined){
                ChatPinedDOM.append(chatID, ChatPinedDOM.create())
            }
        }else{
            if(chatPined){
                ChatPinedDOM.delete(chatID);
            }
        }
        ChatDOMFunc.putChatContainElemInPosition(chatID, true);
    }
    
    static lMegElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        const lMsgObj=ChatsDB.getChatLastMsgObj(chatID);
    
        const chatContain=document.getElementById(chatID);
        const chatSubContain=chatContain.getElementsByClassName("chatSubContain")[0];
        const chatTimeContain=chatSubContain.getElementsByClassName("chatTimeContain")[0];
        const lMegRead=chatSubContain.getElementsByClassName("lMegRead")[0];
        const lMeg=chatSubContain.getElementsByClassName("lMeg")[0];
    
    
        UpdateChatDOM.lMegReadElem(chatID);
    
        chatTimeContain.innerHTML=lMsgObj["timeSentString"];
        if(lMsgObj["deletedText"]){
            lMeg.innerHTML=lMsgObj["deletedText"];
        }else{
            lMeg.innerHTML=lMsgObj["lastMsg"];
        }
    
        ChatDOMFunc.putChatContainElemInPosition(chatID, true);
    }
    
    static lMegReadElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        const lMsgObj=ChatsDB.getChatLastMsgObj(chatID);
    
        const chatContain=document.getElementById(chatID);
        const chatSubContain=chatContain.getElementsByClassName("chatSubContain")[0];
        const lMegRead=chatSubContain.getElementsByClassName("lMegRead")[0];
    
        if(lMegRead){
            LMegReadDOM.delete(chatID);
        }

        if(lMsgObj["deletedText"]){
            return;
        }
    
        //code to update msg readStatus
        if(lMsgObj["isSender"]){
            let readClass=false, readInner="";
            let read=lMsgObj["read"];
        
        
            if(read=="read"){
                readClass=true;
            }
            if(read=="sent"){
                readInner="done";
            }else{
                readInner="done_all";
            }
    
            if(lMegRead){
                lMegRead.innerHTML=readInner;
                if(readClass){
                    lMegRead.classList.add("read");
                }else{
                    lMegRead.classList.remove("read");
                }
            }else{
                LMegReadDOM.append(chatID, LMegReadDOM.create(readClass, readInner))
            }
        }
    }

    static chatOnlineElem(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
        let chatContain=document.getElementById(chatID);
        if(!chatContain){
            return;
        }
        let chatPix=chatContain.getElementsByClassName("chatPix")[0];
        if(!chatPix){
            let errMsg="chatPixElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        const onlineIconElem=chatPix.getElementsByClassName("online")[0];
    
        const isOnline=ChatFuncs.recieverIsOnline(chatID);

        if(isOnline){
            if(!onlineIconElem){
                ChatOnlineIconDOM.append(chatID, ChatOnlineIconDOM.create());
            }
        }else{
            if(onlineIconElem){
                ChatOnlineIconDOM.delete(chatID);
            }
        }
    }
}


export{
    UpdateChatDOM
}