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
    OtherFunctions
} from "../../../msgPage/others/otherFonctions.js";

import{
    ChatsDB
} from "../../../_tempDatabase/chats.js";

import{
    OnloadActivations
} from "../../../msgPage/others/onloadActivations.js";

import{
    ChatBoxDOM, 
    ChatboxReplyDOM 
} from "../../../DOM/msgPageDOM/msgDOM/chatBoxDOM.js";

import{
    MsgHeadSelecOpts
} from "../../../msgPage/message/messageHeadSelected.js";


const iconCreate=(iconID, iconText)=>{
    let icon=document.createElement("div");
    icon.id=iconID;
    icon.className="material-icons flexCenter";
    icon.innerHTML=iconText;

    return icon;
}


class ShowChatBoxDOM{
    static create(){
        // <div id="showChatBox" class="material-icons flexCenter">near_me</div>
        let showChatBox=document.createElement("div");
        showChatBox.id="showChatBox";
        showChatBox.className="material-icons flexCenter";
        showChatBox.innerHTML="near_me";
    
        showChatBox.addEventListener("click", ShowChatBoxDOM.onclick);
    
        return showChatBox;
    }

    static append(showChatBoxElem){
        const message=DOMGetter.getMessage();
    
        if(message){
            let child=message.childNodes[0];
            message.insertBefore(showChatBoxElem, child);
        }else{
            let errMsg="messageElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(passive=false){
        const showChatBox=DOMGetter.getShowChatBox();
    
        if(showChatBox){
            let parent=showChatBox.parentNode;
            parent.removeChild(showChatBox);
        }else{
            if(!passive){
                let errMsg="ShowChatBoxElem not found";
                let errCode="";
                let userErr=false;
                let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }
    }

    static onclick(){
        let chatBox=DOMGetter.getChatBox();
    
        if(chatBox){ChatBoxDOM.delete();}
        ShowChatBoxDOM.delete();
        ChatBoxDOM.append(ChatBoxDOM.create());
    
        chatBox=DOMGetter.getChatBox();
        chatBox.style.display="flex";
        // showChatBox.style.display="none";
        // chatBox.style.display="flex";
    }

    static tryHide(){
        const showChatBox=DOMGetter.getShowChatBox();
        
    
        if(showChatBox){
            ShowChatBoxDOM.delete();
        }
    }
    
    static tryUnhide(){
        const chatBox=DOMGetter.getChatBox();
        const showChatBox=DOMGetter.getShowChatBox();
        const messageHeadNormal=DOMGetter.getMessageHeadNormal();
    
        if(messageHeadNormal){
            if(!chatBox && !showChatBox){
                ShowChatBoxDOM.append(ShowChatBoxDOM.create());
            }
        }
    }    
}

class MessageHeadDOM{
    static create(){
        let messageHead=document.createElement("div");
        messageHead.id="messageHead";
    
        return messageHead;
    }

    static append(messageHeadElem){
        const message=DOMGetter.getMessage();
    
        if(message){
            message.appendChild(messageHeadElem);
        }else{
            let errMsg="messageElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class MessageHeadNormalDOM{
    static create(){
        let chatObj=ChatsDB.getChatObj(ChatsDB.activeChat);
        let imgSrc=chatObj["imgSrc"];
        let name=chatObj["name"];
        let lastSeen=chatObj["lastSeenString"];
        let img;
    
        let messageHeadNormal=document.createElement("div");
        messageHeadNormal.id="messageHeadNormal";
    
    
        let messageChatMaximize=document.createElement("div");
        messageChatMaximize.id="messageChatMaximize";
        messageChatMaximize.className="material-icons flexCenter";
        messageChatMaximize.innerHTML="menu";
        messageHeadNormal.appendChild(messageChatMaximize);
    
    
        let messageHeadPix=document.createElement("div");
        messageHeadPix.id="messageHeadPix";
        img=document.createElement("img");
        img.alt="pix";
        img.src=imgSrc;
        messageHeadPix.appendChild(img);
        messageHeadNormal.appendChild(messageHeadPix);
    
    
        let messageHeadNameContain=document.createElement("div");
        messageHeadNameContain.id="messageHeadNameContain";
        let messageHeadName=document.createElement("div");
        messageHeadName.id="messageHeadName";
        messageHeadName.innerHTML=name;
        messageHeadNameContain.appendChild(messageHeadName);
        if(lastSeen){
            let messageHeadNameTime=document.createElement("div");
            messageHeadNameTime.id="messageHeadNameTime";
            messageHeadNameTime.innerHTML=lastSeen;
            messageHeadNameContain.appendChild(messageHeadNameTime);
        }
        messageHeadNormal.appendChild(messageHeadNameContain);
        let messageHeadOthers=document.createElement("div");
        messageHeadOthers.id="messageHeadOthers";
        messageHeadOthers.className="material-icons flexCenter";
        messageHeadOthers.innerHTML="more_vert";
        messageHeadNormal.appendChild(messageHeadOthers);
    
    
        let messageHeadOthersOptions=document.createElement("div");
        messageHeadOthersOptions.id="messageHeadOthersOptions";
        messageHeadOthersOptions.className="hide";
        let messageHeadOptionSelect=document.createElement("p");
        messageHeadOptionSelect.className="messageHeadOptionSelect";
        messageHeadOptionSelect.innerHTML="Select";
        messageHeadOthersOptions.appendChild(messageHeadOptionSelect);
        messageHeadNormal.appendChild(messageHeadOthersOptions);
    
        let messageHeadNormalObject={
            "messageChatMaximize":messageChatMaximize,
            "messageHeadOthers":messageHeadOthers,
            "messageHeadPix":messageHeadPix
        }
    
        OnloadActivations.messageHeadNormalElem(messageHeadNormalObject); 
    
    
        return messageHeadNormal;
    }

    static append(messageHeadNormalElem){
        const messageHead=DOMGetter.getMessageHead();
    
        if(messageHead){
            messageHead.appendChild(messageHeadNormalElem);
        }else{
            let errMsg="messageHeadElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        const messageHeadNormal=DOMGetter.getMessageHeadNormal();
    
        if(messageHeadNormal){
            let parent=messageHeadNormal.parentNode;
            parent.removeChild(messageHeadNormal);
        }else{
            let errMsg="messageHeadNormalElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static onclickMessageChatMaximizeBotton(){
        const chat=DOMGetter.getChat();
        const message=DOMGetter.getMessage();
        const messageChatMaximize=DOMGetter.getMessageChatMaximize();
        const msgSelectAChat=DOMGetter.getMsgSelectAChat();
    
        let messageWidth="65%";
        let reponsiveWidth=500;
        if(window.innerWidth<=reponsiveWidth){messageWidth="100%";}
        message.style.width=messageWidth;
        chat.style.display="flex";
        if(messageChatMaximize){
            messageChatMaximize.style.display="none"
        }

        //add a kid of chatMaximize if msg not on display
        if(msgSelectAChat){
            let selectAChatBtn=msgSelectAChat.getElementsByClassName("selectAChatBtn")[0];
            selectAChatBtn.style.display="";
        }
    }

    static createLastSeen(lastSeen){
        let messageHeadNameTime=document.createElement("div");
        messageHeadNameTime.id="messageHeadNameTime";
        messageHeadNameTime.innerHTML=lastSeen;

        return messageHeadNameTime;
    }

    static appendLastSeen(messageHeadNameTimeElem){
        const messageHeadNormal=DOMGetter.getMessageHeadNormal();
        let messageHeadNameContain;
        if(messageHeadNormal){
            messageHeadNameContain=document.getElementById("messageHeadNameContain");
            if(!messageHeadNameContain){
                let errMsg="messageHeadNameContainElem not found";
                let errCode="";
                let userErr=false;
                let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
                if(errHandler){
                    console.log(errHandler);
                }
                    return;
            }
            messageHeadNameContain.appendChild(messageHeadNameTimeElem);
            
        }else{
            let errMsg="messageHeadNormalElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static deleteLastSeen(){
        const messageHeadNameTimeElem=document.getElementById("messageHeadNameTime");
    
        if(messageHeadNameTimeElem){
            let parent=messageHeadNameTimeElem.parentNode;
            parent.removeChild(messageHeadNameTimeElem);
        }else{
            let errMsg="messageHeadNameTimeElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class MessageHeadSelectedDOM{
    static create(){
        let messageHeadSelected=document.createElement("div");
        messageHeadSelected.id="messageHeadSelected";
    
        let messageHeadBack=document.createElement("div");
        messageHeadBack.id="messageHeadBack";
        messageHeadBack.className="material-icons flexCenter";
        messageHeadBack.innerHTML="arrow_back";
        messageHeadSelected.appendChild(messageHeadBack);
    
        let messageHeadCount=document.createElement("div");
        messageHeadCount.id="messageHeadCount";
        messageHeadCount.className="flexCenter";
        messageHeadCount.innerHTML="0";
        messageHeadSelected.appendChild(messageHeadCount);
    
        // icons need not to desplay inload
        // messageHeadSelected=MessageHeadSelectedDOM.loadIcons(messageHeadSelected);

    
        return messageHeadSelected;
    }
    
    static append(messageHeadSelectedElem){
        const messageHead=DOMGetter.getMessageHead();
    
        if(messageHead){
            messageHead.appendChild(messageHeadSelectedElem);
        }else{
            let errMsg="messageHeadElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        const messageHeadSelected=DOMGetter.getMessageHeadSelected();
    
        if(messageHeadSelected){
            let parent=messageHeadSelected.parentNode;
            parent.removeChild(messageHeadSelected);
        }else{
            let errMsg="msgHeadSelectedElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static loadIcons(messageHeadSelected=null){
        const msgOptionSettings=Settings.MessageOptions;

        if(!messageHeadSelected){
            messageHeadSelected=DOMGetter.getMessageHeadSelected();
        }
        if(msgOptionSettings.headReplyMessage){
            let messageHeadReply=MessageHeadSelectedDOM.createMsgHeadReplyIcon();
            messageHeadSelected.appendChild(messageHeadReply);
        }
        if(msgOptionSettings.groupDelMessage){
            let messageHeadDelete=MessageHeadSelectedDOM.createMsgHeadDelIcon();
            messageHeadSelected.appendChild(messageHeadDelete);
        }
        if(msgOptionSettings.groupFowardMessage){
            let messageHeadFoward=MessageHeadSelectedDOM.createMsgHeadFowardIcon();
            messageHeadSelected.appendChild(messageHeadFoward);
        }
        if(msgOptionSettings.groupCopyMessage){
            let messageHeadCopy=MessageHeadSelectedDOM.createMsgHeadCopyIcon();
            messageHeadSelected.appendChild(messageHeadCopy);
        }
        if(msgOptionSettings.groupStarMessage){
            let messageHeadStar=MessageHeadSelectedDOM.createMsgHeadStarIcon();
            messageHeadSelected.appendChild(messageHeadStar);
        }
        if(msgOptionSettings.headMsgInfo){
            let messageHeadInfo=MessageHeadSelectedDOM.createMsgHeadInfoIcon();
            messageHeadSelected.appendChild(messageHeadInfo);
        }

        let messageHeadOthersS=MessageHeadSelectedDOM.createMsgHeadOthersSIcon();
        messageHeadSelected.appendChild(messageHeadOthersS);

        return messageHeadSelected;
    }

    static clearIcons(){
        let messageHeadReply=DOMGetter.getMessageHeadReply();
        let messageHeadDelete=DOMGetter.getMessageHeadDelete();
        let messageHeadFoward=DOMGetter.getMessageHeadFoward();
        let messageHeadCopy=DOMGetter.getMessageHeadCopy();
        let messageHeadStar=DOMGetter.getMessageHeadStar();
        let messageHeadInfo=DOMGetter.getMessageHeadInfo();
        let messageHeadOthersS=DOMGetter.getMessageHeadOthersS();
    
    
        if(messageHeadReply){
            MessageHeadSelectedDOM.deleteIcon(messageHeadReply);
        }
        if(messageHeadDelete){
            MessageHeadSelectedDOM.deleteIcon(messageHeadDelete);
        }
        if(messageHeadFoward){
            MessageHeadSelectedDOM.deleteIcon(messageHeadFoward);
        }
        if(messageHeadCopy){
            MessageHeadSelectedDOM.deleteIcon(messageHeadCopy);
        }
        if(messageHeadStar){
            MessageHeadSelectedDOM.deleteIcon(messageHeadStar);
        }
        if(messageHeadInfo){
            MessageHeadSelectedDOM.deleteIcon(messageHeadInfo);
        }
        if(messageHeadOthersS){
            MessageHeadSelectedDOM.deleteIcon(messageHeadOthersS);
        }
    }



    static appendIcon(iconElem){
        const messageHeadSelected=DOMGetter.getMessageHeadSelected()

        if(!messageHeadSelected){
            let errMsg="messageHeadSelectedDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const messageHeadOthersS=DOMGetter.getMessageHeadOthersS();
        if(messageHeadOthersS){
            messageHeadSelected.insertBefore(iconElem, messageHeadOthersS);
        }else{
            messageHeadSelected.appendChild(iconElem);
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

        const messageHeadSelected=iconElem.parentElement;
        if(!messageHeadSelected){
            let errMsg="messageHeadSelectedDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        if(messageHeadSelected.id!="messageHeadSelected"){
            let errMsg="got the wrong element";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        messageHeadSelected.removeChild(iconElem);
    }



    static createMsgHeadReplyIcon(){
        let iconID="messageHeadReply", iconText="reply";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.replyMessages);

        return icon;
    }

    static createMsgHeadDelIcon(){
        let iconID="messageHeadDelete", iconText="delete";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.deleteMessages);

        return icon;
    }

    static createMsgHeadFowardIcon(){
        let iconID="messageHeadFoward", iconText="reply";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.fowardMessages);

        return icon;
    }

    static createMsgHeadCopyIcon(){
        let iconID="messageHeadCopy", iconText="content_copy";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.copyMessages);

        return icon;
    }

    static createMsgHeadStarIcon(){
        let iconID="messageHeadStar", iconText="grade";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.starMessages);

        return icon;
    }

    static createMsgHeadInfoIcon(){
        let iconID="messageHeadInfo", iconText="description";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.getMessagesInfo);

        return icon;
    }

    static createMsgHeadOthersSIcon(){
        let iconID="messageHeadOthersS", iconText="more_vert";

        let icon=iconCreate(iconID, iconText);
        icon.addEventListener("click", MsgHeadSelecOpts.activateMessageHeadOthersS);

        return icon;
    }

}



export{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
}

