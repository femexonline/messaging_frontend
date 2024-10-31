import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

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
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";

import{
    ChatOptions
} from "../../msgPage/chat/chatOptions.js";

import {
    ChatBody
} from "../../msgPage/chat/chatBody.js";

import{
    ProfileFunc
} from "../../msgPage/profile/profileFunction.js";

import{
    MsgGroupDeactivations
} from "../../msgPage/message/messageGroupDeactivations.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import{
    ChatHeadSelecOpts
} from "../../msgPage/chat/chatHeadSelected.js";

import{
    ChatGroupDeactivations
} from "../../msgPage/chat/chatGroupDeactivations.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";
import { ChatFuncs } from "../../_tempDatabase/chatsFunc.js";







class ChatGroupActivations{
    static chatExpandMoreOptions(event){// onstart
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        const chatBody=DOMGetter.getChatBody();
    
        //get elementes
        let chatExpandMore=event.target;
        let dataId=chatExpandMore.dataset["id"];
        let chatContain=document.getElementById(dataId);
        ChatMoreOptionsDOM.append(dataId, ChatMoreOptionsDOM.create(dataId));
        let chatMoreOptions=chatExpandMore.nextElementSibling;
    
        //make more option visible
        chatMoreOptions.className="chatMoreOptions";
        chatExpandMore.style.display="flex";
        if(chatMoreOptions.style.top){chatMoreOptions.style.top="0";}
    
        //get position of various element
        let chatBodyPos=chatBody.getBoundingClientRect();
        let chatContainPos=chatContain.getBoundingClientRect();
        let chatMoreOptionsPos=chatMoreOptions.getBoundingClientRect();
        let chatExpandMorePos=chatExpandMore.getBoundingClientRect();
    
        //to add top position
        let megMoreOptionNewTopPos=chatExpandMorePos["bottom"]-chatContainPos["top"]+"px";
        chatMoreOptions.style.top=megMoreOptionNewTopPos;
        
        chatMoreOptionsPos=chatMoreOptions.getBoundingClientRect();
        //check if no space under
        let chatBodyPosBottom=chatBodyPos["bottom"];
        if(chatBodyPosBottom<chatMoreOptionsPos["bottom"]){
            let thereIsSpaceUp=null;
    
            //check if space on top
            let spaceUp=chatExpandMorePos["top"]-chatBodyPos["top"]
            if(spaceUp>=chatMoreOptionsPos["height"]){
                thereIsSpaceUp=true;
                
                let megMoreOptionNewTopPos=(chatMoreOptionsPos["height"]-(chatContainPos["bottom"]-chatExpandMorePos["top"]))+"px";
                // let megMoreOptionNewTopPos=((chatExpandMorePos["top"]-chatContainPos["top"])+chatMoreOptionsPos["height"])+"px";
                megMoreOptionNewTopPos="-"+megMoreOptionNewTopPos;
                chatMoreOptions.style.top=megMoreOptionNewTopPos;
            }
            if(!thereIsSpaceUp){
                let scrollDistance=chatMoreOptionsPos["bottom"]-chatBodyPosBottom+5;
                chatBody.scrollTo(chatBody.scrollLeft, chatBody.scrollTop+scrollDistance);
            }
        }
    
    
        let MousePositionBodyElemRes={
            "functs":[
                ["click", ChatGroupDeactivations.chatExpandMoreOptions]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
    }
    
    static allChatOntouchEvent(chatContain=null){
        if(chatContain){
            chatContain.addEventListener("touchstart", ChatBody.touchedThisChat);
        }else{
            let AllChats=document.getElementsByClassName("chatContain");
            for (let index = 0; index < AllChats.length; index++) {
                AllChats[index].addEventListener("touchstart", ChatBody.touchedThisChat);
            }
        }
    }
    
    static allChatsFunctions(chatContain=null){
        if(chatContain){
            let chatExpandMore=chatContain.getElementsByClassName("chatExpandMore")[0];
            let img=chatContain.getElementsByTagName("img")[0];
    
            chatContain.addEventListener("click", ChatBody.loadChatMessages);
            chatExpandMore.addEventListener("click", ChatGroupActivations.chatExpandMoreOptions);
            img.addEventListener("click", ProfileFunc.viewChatProfilePicture);
            img.addEventListener("touchstart", ProfileFunc.viewChatProfilePicture);
        }else{
            let allChats=document.getElementsByClassName("chatContain");
            for (let index = 0; index < allChats.length; index++) {
                allChats[index].addEventListener("click", ChatBody.loadChatMessages);
                let chatExpandMore=allChats[index].getElementsByClassName("chatExpandMore")[0];
                let img=allChats[index].getElementsByTagName("img")[0];
                
                if(chatExpandMore){
                    chatExpandMore.addEventListener("click", ChatGroupActivations.chatExpandMoreOptions);
                }
                if(img){
                    img.addEventListener("click", ProfileFunc.viewChatProfilePicture);
                    img.addEventListener("touchstart", ProfileFunc.viewChatProfilePicture);
                }
            }
        }
    }
    
    static allChatSelected(chatContain=null){
        if(chatContain && chatContain.id){
            let chatSelected=chatContain.getElementsByClassName("chatSelected")[0];
            let chatExpandMore=chatContain.getElementsByClassName("chatExpandMore")[0];
            if (chatExpandMore){
                chatExpandMore.style.display="none";
            }
            if (chatSelected) {
                chatSelected.style.display="block";
                chatSelected.addEventListener("click", ChatBody.selectUnselectChat);
                chatSelected.addEventListener("touchstart", ChatBody.selectUnselectChat);
            }
        }else{
            GlobalVars.chatsAreSelected=true;
            const chatHeadBack=DOMGetter.getChatHeadBack();
            const chatHeadNormal=DOMGetter.getChatHeadNormal();
            const chatHeadSelected=DOMGetter.getChatHeadSelected();
            // const chatHeadPin=DOMGetter.getChatHeadPin();
            // const chatHeadDelete=DOMGetter.getChatHeadDelete();
            // const chatHeadOthersS=DOMGetter.getChatHeadOthersS();
        
            const messageHeadNormal=DOMGetter.getMessageHeadNormal();
        
            if(messageHeadNormal){
                MsgGroupDeactivations.allSelected_Megchecked();
            }
            ChatBody.emptySelectedChatsID();
            
            ChatFuncs.setIsSelectingChats(true);
    
            setTimeout(() => {
                ShowChatBoxDOM.tryHide();
            }, 50);
        
            let allChatSelected=document.getElementsByClassName("chatSelected");
            let allChatExpandMore=document.getElementsByClassName("chatExpandMore");
            for (let index = 0; index < allChatExpandMore.length; index++) {
                allChatExpandMore[index].style.display="none";
            }
            for (let index = 0; index < allChatSelected.length; index++) {
                allChatSelected[index].style.display="block";
                allChatSelected[index].addEventListener("click", ChatBody.selectUnselectChat);
                allChatSelected[index].addEventListener("touchstart", ChatBody.selectUnselectChat);
            }
        
            ChatHeadSelectedDOM.loadIcons();
            // if(chatHeadPin){
            //     chatHeadPin.addEventListener("click", ChatHeadSelecOpts.pinChats);
            // }
            // if(chatHeadDelete){
            //     chatHeadDelete.addEventListener("click", ChatHeadSelecOpts.deleteChats);
            // }
            // if(chatHeadOthersS){
            //     chatHeadOthersS.addEventListener("click", ChatHeadSelecOpts.activateChatHeadOthersS);
            // }
        
            chatHeadNormal.style.display="none";
            chatHeadSelected.style.display="flex";
            chatHeadBack.addEventListener("click", ChatGroupDeactivations.allChatSelected);
        }
    }
}


export{
    ChatGroupActivations
}