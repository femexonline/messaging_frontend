import{
    ChatGroupActivations
} from "../../msgPage/chat/chatGroupActivations.js";

import{
    ChatGroupDeactivations
} from "../../msgPage/chat/chatGroupDeactivations.js";

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
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";

import{
    ChatHead
} from "../../msgPage/chat/chatHead.js";

import{
    ProfileFunc
} from "../../msgPage/profile/profileFunction.js";

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
    MsgBody
} from "../../msgPage/message/messageBody.js";

import{
    MsgHead
} from "../../msgPage/message/messageHead.js";

import{
    ChatSearchFunc
} from "../../msgPage/chat/chatSearchFun.js";





class OnloadActivations{
    static groupActivations(){
        MsgGroupActivations.allMegSelectMoreOptions();
        ChatGroupActivations.allChatsFunctions();
        
        MsgGroupActivations.allMessageOntouchEvent();
        ChatGroupActivations.allChatOntouchEvent();
        
        OtherFunctions.activateMsgDateBeforeAfterfunc();
    }
    
    static chatHeadActivations(){
        const chatChatMinimize=DOMGetter.getChatChatMinimize();
        const chatHeadChat=DOMGetter.getChatHeadChat();
        const chatHeadSearchChat=DOMGetter.getChatHeadSearchChat();
        const chatHeadOthers=DOMGetter.getChatHeadOthers();
        const chatHeadPix=DOMGetter.getChatHeadPix();
    
        if(chatChatMinimize){
            chatChatMinimize.addEventListener("click", ChatHeadNormalDOM.onclickChatMinimizeBotton);
        }
        if(chatHeadChat){
            chatHeadChat.addEventListener("click", ChatHead.chatHeadChatFunc);
        }
        if(chatHeadSearchChat){
            chatHeadSearchChat.addEventListener("click", ChatHead.chatHeadSearchChatFunc);
        }
        if(chatHeadOthers){
            chatHeadOthers.addEventListener("click", ChatHead.activateChatHeadOthersOption);
        }
        if(chatHeadPix){
            chatHeadPix.addEventListener("click", ProfileFunc.viewMyProfilePicture);
        }
    }
    
    static messageBodyActivations(elemObj){
    
        let messageBody, showChatBox, closeChatBox, chatBoxTextMsg;
        
    
        if(!elemObj){
            messageBody=DOMGetter.getMessageBody();
            showChatBox=DOMGetter.getShowChatBox();
            closeChatBox=DOMGetter.getCloseChatBox();
            chatBoxTextMsg=DOMGetter.getChatBoxTextMsg();
        }else{
            messageBody=elemObj["messageBody"]
        }
        
    
        if(messageBody){
            messageBody.addEventListener("scroll", MsgBody.activateMessageBodyOnscrollfunc);
        }
        if(showChatBox){
            showChatBox.addEventListener("click", ShowChatBoxDOM.onclick);
        }
        if(closeChatBox){
            closeChatBox.addEventListener("click", ChatBoxDOM.onclickCloseChatBoxButton);
        }
        if(chatBoxTextMsg){
            chatBoxTextMsg.addEventListener("keyup", ChatBoxDOM.typingMessage);
        }
    }
    
    static messageHeadActivations(){
        const messageChatMaximize=DOMGetter.getMessageChatMaximize();
        const messageHeadOthers=DOMGetter.getMessageHeadOthers();
        const messageHeadPix=DOMGetter.getMessageHeadPix();
    
        if(messageChatMaximize){
            messageChatMaximize.addEventListener("click", MessageHeadNormalDOM.onclickMessageChatMaximizeBotton);
        }
        if(messageHeadOthers){
            messageHeadOthers.addEventListener("click", MsgHead.activateMessageHeadOthersOption);
        }
        if(messageHeadPix){
            messageHeadPix.addEventListener("click", ProfileFunc.viewCurrentChatProfilePicture);
        }        
    }
    
    static onloadPage(){
        const pageSection=DOMGetter.getPageSection();
        let body=document.getElementsByTagName("body")[0];
        let sectionHeight=pageSection.getBoundingClientRect().height;
        let scrlHeight=body.scrollHeight;
        let heig=body.getBoundingClientRect().height;
    
        if(scrlHeight>heig){
            let diff=scrlHeight-heig;
            pageSection.style.height=sectionHeight-diff;
        }
    }
    
    
        
    static messageHeadNormalElem(messageHeadNormalElemArray){
        const messageChatMaximize=messageHeadNormalElemArray["messageChatMaximize"];
        const messageHeadOthers=messageHeadNormalElemArray["messageHeadOthers"];
        const messageHeadPix=messageHeadNormalElemArray["messageHeadPix"];
    
        if(messageChatMaximize){
            messageChatMaximize.addEventListener("click", MessageHeadNormalDOM.onclickMessageChatMaximizeBotton);
        }
        if(messageHeadOthers){
            messageHeadOthers.addEventListener("click", MsgHead.activateMessageHeadOthersOption);
        }
        if(messageHeadPix){
            messageHeadPix.addEventListener("click", ProfileFunc.viewCurrentChatProfilePicture);
        }   
    }
    
    static chatHeadNormalElem(chatHeadNormalElemArray){
        const chatChatMinimize=chatHeadNormalElemArray["chatChatMinimize"];
        const chatHeadChat=chatHeadNormalElemArray["chatHeadChat"];
        const chatHeadSearchChat=chatHeadNormalElemArray["chatHeadSearchChat"];
        const chatHeadOthers=chatHeadNormalElemArray["chatHeadOthers"];
        const chatHeadPix=chatHeadNormalElemArray["chatHeadPix"];
    
        if(chatChatMinimize){
            chatChatMinimize.addEventListener("click", ChatHeadNormalDOM.onclickChatMinimizeBotton);
        }
        if(chatHeadChat){
            chatHeadChat.addEventListener("click", ChatHead.chatHeadChatFunc);
        }
        if(chatHeadSearchChat){
            chatHeadSearchChat.addEventListener("click",  ChatHead.chatHeadSearchChatFunc);
        }
        if(chatHeadOthers){
            chatHeadOthers.addEventListener("click",  ChatHead.activateChatHeadOthersOption);
        }
        if(chatHeadPix){
            chatHeadPix.addEventListener("click", ProfileFunc.viewMyProfilePicture);
        }
    }
    
    static chatSearchElem(chatSearchElemArray){
        const chatSearch=chatSearchElemArray["chatSearch"];
        const chatSearchClose=chatSearchElemArray["chatSearchClose"];
    
        if(chatSearch){
            chatSearch.addEventListener("click", ChatSearchFunc.clickChatSearchFunc);
        }
        if(chatSearchClose){
            chatSearchClose.addEventListener("click", ChatSearchFunc.chatSearchCloseFunc);
        }
    }
    
    static chatboxReplyElem(chatboxReplyElemArray){
        const close=chatboxReplyElemArray["close"];
    
        if(close){
            close.addEventListener("click", ChatboxReplyDOM.close);
        }
    }
}


export{
    OnloadActivations
}