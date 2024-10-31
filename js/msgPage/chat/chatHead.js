import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";


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
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import{
    ChatGroupActivations
} from "../../msgPage/chat/chatGroupActivations.js";

import{
    ChatSearchDOM
} from "../../DOM/msgPageDOM/chatDOM/chatSearchDOM.js";




class ChatHead{
    static deactivateChatHeadOthersOption(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        ShowChatBoxDOM.tryUnhide();
        
        const chatHeadOthers=DOMGetter.getChatHeadOthers();
        const chatHeadOthersOptions=DOMGetter.getChatHeadOthersOptions();
    
        let selectChats=chatHeadOthersOptions.getElementsByClassName("chatHeadOptionSelect")[0];
        
        selectChats.removeEventListener("click", ChatGroupActivations.allChatSelected);
        selectChats.removeEventListener("click", ChatHead.deactivateChatHeadOthersOption);
        chatHeadOthersOptions.className="hide";
        chatHeadOthers.style.background="";
    }
    
    static activateChatHeadOthersOption(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        ShowChatBoxDOM.tryHide();
        
        const chatHeadOthers=DOMGetter.getChatHeadOthers();
        const chatHeadOthersOptions=DOMGetter.getChatHeadOthersOptions();
    
        let selectChats=chatHeadOthersOptions.getElementsByClassName("chatHeadOptionSelect")[0];
        
        selectChats.addEventListener("click", ChatGroupActivations.allChatSelected);
        selectChats.addEventListener("click", ChatHead.deactivateChatHeadOthersOption);
        chatHeadOthersOptions.className="chatHeadOthersOptions";
        chatHeadOthers.style.background="#D5D5D5";
    
        let MousePositionBodyElemRes={
            "functs":[
                ["click", ChatHead.deactivateChatHeadOthersOption]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
    }
    
    
    static chatHeadChatFunc(){
        console.log("chatHeadChatFunc");
        alert("function not available yet");
    }
    
    static chatHeadSearchChatFunc(event){
        // const chatHeadSearchChat=getChatHeadSearchChat();
        const chatHeadSearchChat=event.target;
        const chatSearch=DOMGetter.getChatSearch();
    
        if(!chatSearch){
            ChatSearchDOM.append(ChatSearchDOM.create());
            chatHeadSearchChat.classList.add("hide");
        }else{
            let errMsg="chatSearch not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}



export{
    ChatHead
}