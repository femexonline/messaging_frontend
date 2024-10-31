import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

import{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";

import{
    MsgOptions
} from "../../msgPage/message/messageOptions.js";

import{
    MsgBody
} from "../../msgPage/message/messageBody.js";


import{
    MsgHeadSelecOpts
} from "../../msgPage/message/messageHeadSelected.js";

import{
    MessageBodyDOM,
    MsgDateDOM,
    MsgWraperDOM,
    DeletedMsgDOM,
    StarDOM,
    MsgMoreOptionsDOM
} from "../../DOM/msgPageDOM/msgDOM/msgBodyDOM.js";

import{
    MsgGroupActivations
} from "../../msgPage/message/messageGroupActivations.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../../_tempDatabase/messageFuncs.js";



class MsgGroupDeactivations{
    static megSelectMoreOptions(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        ShowChatBoxDOM.tryUnhide();
    
        let megMoreOptions=document.getElementsByClassName("megMoreOptionsBackground")[0];
        let selMore=megMoreOptions.previousElementSibling;
        let subMsgMore=selMore.getElementsByClassName("subMsgMore")[0];
        subMsgMore.classList.remove("optionUp");

        MsgMoreOptionsDOM.delete(megMoreOptions, true);

        selMore.style.display="";
        selMore.addEventListener("click", MsgGroupActivations.megSelectMoreOptions);
    }
    
    static removeAllSelectedHoverEffect(){
        let AllSelected=document.getElementsByClassName("selected");
        for (let index = 0; index < AllSelected.length; index++) {
            AllSelected[index].classList.remove("hover");
        }
    }
    
    static resetAllSelectedHoverEffect(){
        let AllSelected=document.getElementsByClassName("selected");
        for (let index = 0; index < AllSelected.length; index++) {
            AllSelected[index].classList.add("hover");
        }
    }
    
    static allSelected_Megchecked(){
        let messageHeadNormal=DOMGetter.getMessageHeadNormal();
        let messageHeadSelected=DOMGetter.getMessageHeadSelected();
        let messageHeadBack=DOMGetter.getMessageHeadBack();
        let messageHeadCount=DOMGetter.getMessageHeadCount();
    
        ShowChatBoxDOM.tryUnhide();

        MessageFuncs.setIsSelectingMsgs(false);
    
        let allSelected=document.getElementsByClassName("selected");
        let allMegchecked=document.getElementsByClassName("Megchecked");
        for (let index = 0; index < allSelected.length; index++) {
            allSelected[index].removeEventListener("click", MsgBody.selectUnselectMessage);
            allSelected[index].removeEventListener("touchstart", MsgBody.selectUnselectMessage);
            allSelected[index].classList.remove("s");
            allSelected[index].style.display="";
        }
        for (let index = 0; index < allMegchecked.length; index++) {
            allMegchecked[index].getElementsByTagName("input")[0].removeAttribute("checked");
            allMegchecked[index].style.display="";
        }
        MsgBody.emptySelectedMessagesID();
    
        // MsgGroupDeactivations.messageHeadSelectedIcons();
        MessageHeadSelectedDOM.clearIcons();
    
        messageHeadCount.innerHTML=GlobalVars.selectedMessagesID.length;
        messageHeadNormal.style.display="";
        messageHeadSelected.style.display="";
        messageHeadBack.removeEventListener("click", MsgGroupDeactivations.allSelected_Megchecked);
        MsgGroupDeactivations.resetAllSelectedHoverEffect();
    }
    
    // static messageHeadSelectedIcons(){
    //     let messageHeadReply=DOMGetter.getMessageHeadReply();
    //     let messageHeadDelete=DOMGetter.getMessageHeadDelete();
    //     let messageHeadFoward=DOMGetter.getMessageHeadFoward();
    //     let messageHeadCopy=DOMGetter.getMessageHeadCopy();
    //     let messageHeadStar=DOMGetter.getMessageHeadStar();
    //     let messageHeadInfo=DOMGetter.getMessageHeadInfo();
    //     let messageHeadOthersS=DOMGetter.getMessageHeadOthersS();
        
    //     if(messageHeadReply){
    //         messageHeadReply.removeEventListener("click", MsgHeadSelecOpts.replyMessages);
    //     }
    //     if(messageHeadDelete){
    //         messageHeadDelete.removeEventListener("click", MsgHeadSelecOpts.deleteMessages);
    //     }
    //     if(messageHeadFoward){
    //         messageHeadFoward.removeEventListener("click", MsgHeadSelecOpts.fowardMessages);
    //     }
    //     if(messageHeadCopy){
    //         messageHeadCopy.removeEventListener("click", MsgHeadSelecOpts.copyMessages);
    //     }
    //     if(messageHeadStar){
    //         messageHeadStar.removeEventListener("click", MsgHeadSelecOpts.starMessages);
    //     }
    //     if(messageHeadInfo){
    //         messageHeadInfo.removeEventListener("click", MsgHeadSelecOpts.getMessagesInfo);
    //     }
    //     if(messageHeadOthersS){
    //         messageHeadOthersS.removeEventListener("click", MsgHeadSelecOpts.activateMessageHeadOthersS);
    //     }
    // }
}



export{
    MsgGroupDeactivations
}