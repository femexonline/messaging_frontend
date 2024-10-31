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
    MsgGroupActivations
} from "../../msgPage/message/messageGroupActivations.js";

import{
    MsgGroupDeactivations
} from "../../msgPage/message/messageGroupDeactivations.js";




class MsgHead{
    static activateMessageHeadOthersOption(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        ShowChatBoxDOM.tryHide();
        
        let messageHeadOthers=DOMGetter.getMessageHeadOthers();
    
        let messageHeadOthersOptions=document.getElementById("messageHeadOthersOptions");
        let selectMessages=messageHeadOthersOptions.getElementsByClassName("messageHeadOptionSelect")[0];
        
        selectMessages.addEventListener("click", MsgGroupActivations.allSelected_Megchecked);
        selectMessages.addEventListener("click", MsgHead.deactivateMessageHeadOthersOption);
        messageHeadOthersOptions.className="messageHeadOthersOptions";
        messageHeadOthers.style.background="#D5D5D5";
    
    
        let MousePositionBodyElemRes={
            "functs":[
                ["click", MsgHead.deactivateMessageHeadOthersOption]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
    }
    
    static deactivateMessageHeadOthersOption(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        ShowChatBoxDOM.tryUnhide();
        
        let messageHeadOthers=DOMGetter.getMessageHeadOthers();
        
        let messageHeadOthersOptions=document.getElementById("messageHeadOthersOptions");
        let selectMessages=messageHeadOthersOptions.getElementsByClassName("messageHeadOptionSelect")[0];
        
        selectMessages.removeEventListener("click", MsgGroupActivations.allSelected_Megchecked);
        selectMessages.removeEventListener("click", MsgHead.deactivateMessageHeadOthersOption);
        messageHeadOthersOptions.className="hide";
        messageHeadOthers.style.background="";
    }
}



export{
    MsgHead
}