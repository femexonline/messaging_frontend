import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";

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
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import {
    ChatBody
} from "../../msgPage/chat/chatBody.js";

import{
    ChatHeadSelecOpts
} from "../../msgPage/chat/chatHeadSelected.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";





class ChatGroupDeactivations{
    static chatExpandMoreOptions(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        let chatMoreOptions=document.getElementsByClassName("chatMoreOptions")[0];
        let chatExpandMore=chatMoreOptions.previousElementSibling;
        let dataId=chatExpandMore.dataset["id"];
    
        ChatMoreOptionsDOM.delete(dataId);
    
        chatExpandMore.style.display="";
    }
    
    static removeAllChatHoverEffect(){
        let AllChat=document.getElementsByClassName("chatContain");
        for (let index = 0; index < AllChat.length; index++) {
            AllChat[index].classList.remove("hover");
        }
    }
    
    static resetAllChatHoverEffect(){
        let AllChat=document.getElementsByClassName("chatContain");
        for (let index = 0; index < AllChat.length; index++) {
            AllChat[index].classList.add("hover");
        }
    }
    
    static allChatSelected(){
        GlobalVars.chatsAreSelected=false;
        const chatHeadBack=DOMGetter.getChatHeadBack();
        const chatHeadCount=DOMGetter.getChatHeadCount();
        const chatHeadNormal=DOMGetter.getChatHeadNormal();
        const chatHeadSelected=DOMGetter.getChatHeadSelected();
        // const chatHeadPin=DOMGetter.getChatHeadPin();
        // const chatHeadDelete=DOMGetter.getChatHeadDelete();
        // const chatHeadOthersS=DOMGetter.getChatHeadOthersS();
    
        ShowChatBoxDOM.tryUnhide();

        ChatFuncs.setIsSelectingChats(false);
        
        let allChatSelected=document.getElementsByClassName("chatSelected");
        let allChatContain=document.getElementsByClassName("chatContain");    
        let allChatExpandMore=document.getElementsByClassName("chatExpandMore");
        for (let index = 0; index < allChatExpandMore.length; index++) {
            allChatExpandMore[index].style.display="";
        }
        for (let index = 0; index < allChatContain.length; index++) {
            let chatSelect=allChatContain[index].getElementsByClassName("chatSelect")[0];
            allChatContain[index].style.background="";
            let chatID=allChatContain[index].id;
            if(chatSelect){ChatSelectedIconDOM.delete(chatID);}
        }
    
        for (let index = 0; index < allChatSelected.length; index++) {
            allChatSelected[index].removeEventListener("click", ChatBody.selectUnselectChat);
            allChatSelected[index].removeEventListener("touchstart", ChatBody.selectUnselectChat);
            allChatSelected[index].style.display="";
        }
    
        ChatHeadSelectedDOM.clearIcons();
        // if(chatHeadPin){
        //     chatHeadPin.removeEventListener("click", ChatHeadSelecOpts.pinChats);
        // }
        // if(chatHeadDelete){
        //     chatHeadDelete.removeEventListener("click", ChatHeadSelecOpts.deleteChats);
        // }
        // if(chatHeadOthersS){
        //     chatHeadOthersS.removeEventListener("click", ChatHeadSelecOpts.activateChatHeadOthersS);
        // }
        
        ChatBody.emptySelectedChatsID();
    
        chatHeadCount.innerHTML=GlobalVars.selectedChatsID.length;
        chatHeadNormal.style.display="";
        chatHeadSelected.style.display="";
        chatHeadBack.removeEventListener("click", ChatGroupDeactivations.allChatSelected);
    }
}



export{
    ChatGroupDeactivations
}