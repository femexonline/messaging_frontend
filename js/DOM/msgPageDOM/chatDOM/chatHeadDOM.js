import{
    Settings
} from "../../../_settings/settings.js";

import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";


import{
    DOMGetter,
    GlobalVars
} from "../../../msgPage/others/globalVariables.js";

import{
    OnloadActivations
} from "../../../msgPage/others/onloadActivations.js";

import{
    ChatHeadSelecOpts
} from "../../../msgPage/chat/chatHeadSelected.js";


class ChatHeadDOM{
    static create(){
        let chatHead=document.createElement("div");
        chatHead.id="chatHead";
        
        return chatHead;
    }

    static append(chatHeadElem){
        const chat=DOMGetter.getChat();
    
        if(chat){
            chat.appendChild(chatHeadElem);
        }else{
            let errMsg="chatDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        const chatHead=DOMGetter.getChatHead();
    
        if(chatHead){
            let parent=chatHead.parentNode;
            parent.removeChild(chatHead);
        }else{
            let errMsg="chatHeadDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class ChatHeadNormalDOM{
    static create(imgSrc){
        let chatHeadNormal=document.createElement("div");
        chatHeadNormal.id="chatHeadNormal";
    
        let chatChatMinimize=document.createElement("div");
        chatChatMinimize.id="chatChatMinimize";
        chatChatMinimize.className="material-icons flexCenter";
        chatChatMinimize.innerHTML="clear";
        chatHeadNormal.appendChild(chatChatMinimize);
    
    
        let chatHeadPix=document.createElement("div");
        chatHeadPix.id="chatHeadPix";
        let img=document.createElement("img");
        img.src=imgSrc;
        img.alt="pix";
        chatHeadPix.appendChild(img);
        chatHeadNormal.appendChild(chatHeadPix);
    
    
        let chatSubContain=document.createElement("div");
        chatSubContain.id="chatSubContain";
    
        let chatHeadChat=document.createElement("div");
        chatHeadChat.id="chatHeadChat";
        chatHeadChat.className="material-icons flexCenter";
        chatHeadChat.innerHTML="chat";
        chatSubContain.appendChild(chatHeadChat);
    
        let chatHeadSearchChat=document.createElement("div");
        chatHeadSearchChat.id="chatHeadSearchChat";
        chatHeadSearchChat.className="material-icons flexCenter";
        chatHeadSearchChat.innerHTML="search";
        chatSubContain.appendChild(chatHeadSearchChat);
    
        let chatHeadOthers=document.createElement("div");
        chatHeadOthers.id="chatHeadOthers";
        chatHeadOthers.className="material-icons flexCenter";
        chatHeadOthers.innerHTML="more_vert";
        chatSubContain.appendChild(chatHeadOthers);
    
        let chatHeadOthersOptions=document.createElement("div");
        chatHeadOthersOptions.id="chatHeadOthersOptions";
        chatHeadOthersOptions.className="hide";
        let chatHeadOptionSelect=document.createElement("p");
        chatHeadOptionSelect.className="chatHeadOptionSelect";
        chatHeadOptionSelect.innerHTML="Select";
        chatHeadOthersOptions.appendChild(chatHeadOptionSelect);
        chatSubContain.appendChild(chatHeadOthersOptions);
    
        let chatHeadNormalElemObject={
            "chatChatMinimize":chatChatMinimize,
            "chatHeadChat":chatHeadChat,
            "chatHeadSearchChat":chatHeadSearchChat,
            "chatHeadOthers":chatHeadOthers,
            "chatHeadPix":chatHeadPix
        }
        OnloadActivations.chatHeadNormalElem(chatHeadNormalElemObject);
    
        chatHeadNormal.appendChild(chatSubContain);
    
    
        return chatHeadNormal;
    }

    static append(chatHeadNormalElem){
        const chatHead=DOMGetter.getChatHead();
    
        if(chatHead){
            chatHead.appendChild(chatHeadNormalElem);
        }else{
            let errMsg="chatHeadDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        const chatHeadNormal=DOMGetter.getChatHeadNormal();
    
        if(chatHeadNormal){
            let parent=chatHeadNormal.parentNode;
            parent.removeChild(chatHeadNormal);
        }else{
            let errMsg="chatHeadNormaldDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static onclickChatMinimizeBotton(){
        const chat=DOMGetter.getChat();
        const message=DOMGetter.getMessage();
        const messageChatMaximize=DOMGetter.getMessageChatMaximize();
        const msgSelectAChat=DOMGetter.getMsgSelectAChat();
        
        message.style.width="100%";
        chat.style.display="none";
        if(messageChatMaximize){
            messageChatMaximize.style.display="flex";
        }

        //add a kid of chatMaximize if msg not on display
        if(msgSelectAChat){
            let selectAChatBtn=msgSelectAChat.getElementsByClassName("selectAChatBtn")[0];
            selectAChatBtn.style.display="flex";
        }
    }
}

class ChatHeadSelectedDOM{
    static create(){                
        let chatHeadSelected=document.createElement("div");
        chatHeadSelected.id="chatHeadSelected";
    
        let chatHeadBack=document.createElement("div");
        chatHeadBack.id="chatHeadBack";
        chatHeadBack.className="material-icons flexCenter";
        chatHeadBack.innerHTML="arrow_back";
        chatHeadSelected.appendChild(chatHeadBack);
    
        let chatHeadCount=document.createElement("div");
        chatHeadCount.id="chatHeadCount";
        chatHeadCount.className="flexCenter";
        chatHeadCount.innerHTML="0";
        chatHeadSelected.appendChild(chatHeadCount);
        
        return chatHeadSelected;
    }

    static append(chatHeadSelectedElem){
        const chatHead=DOMGetter.getChatHead();
    
        if(chatHead){
            chatHead.appendChild(chatHeadSelectedElem);
        }else{
            let errMsg="chatHeadDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        const chatHeadSelected=DOMGetter.getChatHeadSelected();
    
        if(chatHeadSelected){
            let parent=chatHeadSelected.parentNode;
            parent.removeChild(chatHeadSelected);
        }else{
            let errMsg="chatHeadSelectedDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }


    static loadIcons(chatHeadSelected=null){
        const chatOptionsSettings=Settings.ChatOptions;

        if(!chatHeadSelected){
            chatHeadSelected=DOMGetter.getChatHeadSelected();
        }
        
        if(chatOptionsSettings.pinChat){
            let chatHeadPin=ChatHeadSelectedDOM.createChatPinIcon();
            chatHeadSelected.appendChild(chatHeadPin);
        }
    
        if(chatOptionsSettings.deleteChat){
            let chatHeadDelete=ChatHeadSelectedDOM.createChatDelIcon();
            chatHeadSelected.appendChild(chatHeadDelete);
        }
    
        let chatHeadOthersS=document.createElement("div");
        chatHeadOthersS.id="chatHeadOthersS";
        chatHeadOthersS.className="material-icons flexCenter";
        chatHeadOthersS.innerHTML="more_vert";
        chatHeadOthersS.addEventListener("click", ChatHeadSelecOpts.activateChatHeadOthersS);
        chatHeadSelected.appendChild(chatHeadOthersS);


        return chatHeadSelected;
    }

    static clearIcons(){
        let chatHeadPin=DOMGetter.getChatHeadPin();
        let chatHeadDelete=DOMGetter.getChatHeadDelete();
        let chatHeadOthersS=DOMGetter.getChatHeadOthersS();
    
    
        if(chatHeadPin){
            ChatHeadSelectedDOM.deleteIcon(chatHeadPin);
        }
        if(chatHeadDelete){
            ChatHeadSelectedDOM.deleteIcon(chatHeadDelete);
        }
        if(chatHeadOthersS){
            ChatHeadSelectedDOM.deleteIcon(chatHeadOthersS);
        }
    }


    static createChatPinIcon(){
        const chatHeadPinSVG='<svg viewBox="0 0 19 19" width="19" height="19"><path fill="currentColor" d="M9.5 18.419C4.574 18.419.581 14.426.581 9.5S4.574.581 9.5.581s8.919 3.993 8.919 8.919-3.993 8.919-8.919 8.919zm2.121-5.708l-.082-2.99 1.647-1.963a1.583 1.583 0 0 0-.188-2.232l-.32-.269a1.58 1.58 0 0 0-2.231.203L8.803 7.42l-2.964.439a.282.282 0 0 0-.14.496l5.458 4.58c.186.157.47.019.464-.224zM5.62 13.994a.504.504 0 0 0 .688-.038l2.204-2.307-1.085-.91-1.889 2.571a.504.504 0 0 0 .082.684z"></path></svg>';
        
        let chatHeadPin=document.createElement("div");
        chatHeadPin.id="chatHeadPin";
        chatHeadPin.className="flexCenter";
        chatHeadPin.innerHTML=chatHeadPinSVG;
        chatHeadPin.addEventListener("click", ChatHeadSelecOpts.pinChats);

        return chatHeadPin;
    }


    static createChatDelIcon(){
        let chatHeadDelete=document.createElement("div");
        chatHeadDelete.id="chatHeadDelete";
        chatHeadDelete.className="material-icons flexCenter";
        chatHeadDelete.innerHTML="delete";
        chatHeadDelete.addEventListener("click", ChatHeadSelecOpts.deleteChats);

        return chatHeadDelete;
    }

    static appendIcon(iconElem){
        const chatHeadSelected=DOMGetter.getChatHeadSelected()

        if(!chatHeadSelected){
            let errMsg="chatHeadSelectedDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const chatHeadOthersS=DOMGetter.getChatHeadOthersS();
        if(chatHeadOthersS){
            chatHeadSelected.insertBefore(iconElem, chatHeadOthersS);
        }else{
            chatHeadSelected.appendChild(iconElem);
        }
    }

    static deleteIcon(iconElem){
        if(!iconElem){
            let errMsg="iconElem not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const chatHeadSelected=iconElem.parentElement;
        if(!chatHeadSelected){
            let errMsg="chatHeadSelectedDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        if(chatHeadSelected.id!="chatHeadSelected"){
            let errMsg="got the wrong element";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        chatHeadSelected.removeChild(iconElem);
    }
}


export{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
}

