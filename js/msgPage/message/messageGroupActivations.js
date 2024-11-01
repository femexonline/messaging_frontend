import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";

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
    ChatGroupDeactivations
} from "../../msgPage/chat/chatGroupDeactivations.js";

import{
    MsgGroupDeactivations
} from "../../msgPage/message/messageGroupDeactivations.js";

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
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";
import { MessageFuncs } from "../../_tempDatabase/messageFuncs.js";




class MsgGroupActivations{
    static megSelectMoreOptions(event){// onstart
        let messageBody=DOMGetter.getMessageBody();
        let chatBox=DOMGetter.getChatBox();
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
    
        ShowChatBoxDOM.tryHide();
    
    
        //get elementes
        // console.log(event)
        let subMsgMore;
        let selMore=event.target;
        while(!selMore.classList.contains("megMore")){
            selMore=selMore.parentElement;
        }
        subMsgMore=selMore.getElementsByClassName("subMsgMore")[0];

        selMore.removeEventListener("click", MsgGroupActivations.megSelectMoreOptions);
        subMsgMore.removeEventListener("click", MsgGroupActivations.megSelectMoreOptions);
        let dataId=selMore.dataset["id"];
        const megMoreOptions=MsgMoreOptionsDOM.create(dataId);
        MsgMoreOptionsDOM.append(dataId, megMoreOptions);


        // return;
        //make more option visible
        selMore.style.display="flex";
        if(megMoreOptions.style.top){
            megMoreOptions.style.top="0";
        }
    
        //get position of various element
        let messageBodyPos=messageBody.getBoundingClientRect();
        let megMoreOptionsPos=megMoreOptions.getBoundingClientRect();
        let selMorePos=selMore.getBoundingClientRect();
        let chatBoxPos;
    
        if(chatBox){
            chatBoxPos=chatBox.getBoundingClientRect();
        }
    
        //to add top position
        let megMoreOptionNewTopPos=selMorePos["height"]+"px";
        megMoreOptions.style.top=megMoreOptionNewTopPos;
    
        megMoreOptionsPos=megMoreOptions.getBoundingClientRect();
    
        //check if no space under
        let messageBodyPosBottom
        if(chatBox){
            messageBodyPosBottom=messageBodyPos["bottom"]-chatBoxPos["height"];
        }else{
            messageBodyPosBottom=messageBodyPos["bottom"];
        }
        if(messageBodyPosBottom<megMoreOptionsPos["bottom"]){
            let thereIsSpaceUp=null;
            subMsgMore.classList.add("optionUp");
    
            //check if space on top
            let spaceUp=selMorePos["top"]-messageBodyPos["top"]
            if(spaceUp>=megMoreOptionsPos["height"]){
                thereIsSpaceUp=true;
                
                let megMoreOptionNewTopPos;
                if(chatBox){
                    megMoreOptionNewTopPos=(megMoreOptionsPos["height"]-(chatBoxPos["height"]/2.5))+"px";
                }else{
                    megMoreOptionNewTopPos=(megMoreOptionsPos["height"]-(megMoreOptionsPos["height"]*.08))+"px";
                }
                megMoreOptionNewTopPos="-"+megMoreOptionNewTopPos;
                megMoreOptions.style.top=megMoreOptionNewTopPos;
            }
            if(!thereIsSpaceUp){
                let scrollDistance=megMoreOptionsPos["bottom"]-messageBodyPosBottom;
                messageBody.scrollTo(messageBody.scrollLeft, messageBody.scrollTop+scrollDistance);
            }
        }
                
    
        let MousePositionBodyElemRes={
            "functs":[
                ["click", MsgGroupDeactivations.megSelectMoreOptions]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
    }
    
    static allMessageOntouchEvent(element=null){
        if(element){
            element.addEventListener("touchstart", MsgBody.touchedThisMessage);
        }else{
            let AllMessages=document.getElementsByClassName("messageContainer");
            for (let index = 0; index < AllMessages.length; index++) {
                AllMessages[index].addEventListener("touchstart", MsgBody.touchedThisMessage);
            }
        }
    }
    
    static allMegSelectMoreOptions(element=null){
        if(element){
            let selectMoreOptions=element.getElementsByClassName("megMore")[0];
            selectMoreOptions.addEventListener("click", MsgGroupActivations.megSelectMoreOptions);
        }else{
            let AllMegSelectMoreOptions=document.getElementsByClassName("megMore");
            for (let index = 0; index < AllMegSelectMoreOptions.length; index++) {
                AllMegSelectMoreOptions[index].addEventListener("click", MsgGroupActivations.megSelectMoreOptions);
            }
        }
    }
    
    static allSelected_Megchecked(element=null){
        if(element && element.id){
            const chatID=ChatFuncs.getActiveChat();

            let selected=element.getElementsByClassName("selected")[0];
            let megchecked=element.getElementsByClassName("Megchecked")[0];
            if (selected) {
                let msgID= selected.dataset.id;
                if(!MessageFuncs.msgIsDeleting(chatID, msgID)){
                    selected.style.display="block";
                    selected.addEventListener("click", MsgBody.selectUnselectMessage);
                    selected.addEventListener("touchstart", MsgBody.selectUnselectMessage);
                }
            }
            if (megchecked) {
                let msgID= megchecked.dataset.id;
                if(!MessageFuncs.msgIsDeleting(chatID, msgID)){
                    megchecked.style.display="flex";
                }
            }
        }else{
            ChatGroupDeactivations.allChatSelected();
            MsgBody.emptySelectedMessagesID();
        
            const chatID=ChatFuncs.getActiveChat();
    
            setTimeout(() => {
                ShowChatBoxDOM.tryHide();
            }, 50);
            
            let messageHeadNormal=DOMGetter.getMessageHeadNormal();
            let messageHeadSelected=DOMGetter.getMessageHeadSelected();
            let messageHeadBack=DOMGetter.getMessageHeadBack();

            MessageFuncs.setIsSelectingMsgs(true);
        
            let allSelected=document.getElementsByClassName("selected");
            let allMegchecked=document.getElementsByClassName("Megchecked");
            for (let index = 0; index < allSelected.length; index++) {
                let contiue=true;
                let msgID= allSelected[index].dataset.id;
                if(MessageFuncs.msgIsDeleting(chatID, msgID)){
                    contiue=false;
                }
                if(contiue){
                    allSelected[index].style.display="block";
                    allSelected[index].addEventListener("click", MsgBody.selectUnselectMessage);
                    allSelected[index].addEventListener("touchstart", MsgBody.selectUnselectMessage);
                }
            }
            for (let index = 0; index < allMegchecked.length; index++) {
                let contiue=true;
                let msgID= allMegchecked[index].dataset.id;
                if(MessageFuncs.msgIsDeleting(chatID, msgID)){
                    contiue=false;
                }
                if(contiue){
                    allMegchecked[index].style.display="flex";
                }
            }
        
            // MsgGroupActivations.messageHeadSelectedIcons();
            MessageHeadSelectedDOM.loadIcons();
        
            messageHeadNormal.style.display="none";
            messageHeadSelected.style.display="flex";
            messageHeadBack.addEventListener("click", MsgGroupDeactivations.allSelected_Megchecked);
        }
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
    //         messageHeadReply.addEventListener("click", MsgHeadSelecOpts.replyMessages);
    //     }
    //     if(messageHeadDelete){
    //         messageHeadDelete.addEventListener("click", MsgHeadSelecOpts.deleteMessages);
    //     }
    //     if(messageHeadFoward){
    //         messageHeadFoward.addEventListener("click", MsgHeadSelecOpts.fowardMessages);
    //     }
    //     if(messageHeadCopy){
    //         messageHeadCopy.addEventListener("click", MsgHeadSelecOpts.copyMessages);
    //     }
    //     if(messageHeadStar){
    //         messageHeadStar.addEventListener("click", MsgHeadSelecOpts.starMessages);
    //     }
    //     if(messageHeadInfo){
    //         messageHeadInfo.addEventListener("click", MsgHeadSelecOpts.getMessagesInfo);
    //     }
    //     if(messageHeadOthersS){
    //         messageHeadOthersS.addEventListener("click", MsgHeadSelecOpts.activateMessageHeadOthersS);
    //     }
    // }
}




export{
    MsgGroupActivations
}