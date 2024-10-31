import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";



import{
    DOMGetter,
    GlobalVars
} from "../../../msgPage/others/globalVariables.js";

import{
    ProfileFunc
} from "../../../msgPage/profile/profileFunction.js";

import{
    MsgOptions
} from "../../../msgPage/message/messageOptions.js";

import{
    ChatOptions
} from "../../../msgPage/chat/chatOptions.js";




class MousePositionBodyPopupDOM{
    static create(resourse=null){
        /* resourse(object) expecs 
            styles: array of arrays, ["style", "value"]
            functs: array of arrays, ["event", "functin"]
        */
        let styles, functs;
        if(resourse){
            styles=resourse["styles"];
            functs=resourse["functs"];
        }
    
        let mousePositionBody=document.createElement("div");
        mousePositionBody.id="mousePositionBody";
    
        if(styles){
            styles.forEach(styl => {
                mousePositionBody.style[styl[0]]=styl[1];
            });
        }
        if(functs){
            functs.forEach(funct => {
                mousePositionBody.addEventListener(funct[0], funct[1]);
            });
        }
    
        return mousePositionBody;
    }

    static append(mousePositionBodyElem){
        const pageSection=DOMGetter.getPageSection();
    
        if(pageSection){
            // pageSection.appendChild(mousePositionBodyElem);
            let child=pageSection.children[0];
            pageSection.insertBefore(mousePositionBodyElem, child);
        }else{
            let errMsg="pageSection not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static delete(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
    
        if(mousePositionBody){
            let parent=mousePositionBody.parentNode;
            parent.removeChild(mousePositionBody);
        }else{
            let errMsg="mousePositionBody not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class ShowProfilePicturePopupDOM{
    static create(imgSrc){    
        let showProfilePicture=document.createElement("div");
        showProfilePicture.id="showProfilePicture";
    
        let close=document.createElement("div");
        close.className="material-icons flexCenter close";
        close.innerHTML="close";
        showProfilePicture.appendChild(close);
    
        let img=document.createElement("img");
        img.src=imgSrc;
        img.alt="pix";
        showProfilePicture.appendChild(img);
    
        showProfilePicture.style.display="flex";
    
        let showProfilePictureElemArr={
            "close":close
        }
        ShowProfilePicturePopupDOM.onload(showProfilePictureElemArr);
    
        return showProfilePicture;
    }

    static append(showProfilePictureElem){
        const pageSection=DOMGetter.getPageSection();
    
        if(pageSection){
            pageSection.appendChild(showProfilePictureElem);
        }else{
            let errMsg="pageSection not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static delete(){
        const showProfilePicture=DOMGetter.getShowProfilePicture();
    
        if(showProfilePicture){
            let parent=showProfilePicture.parentNode;
            parent.removeChild(showProfilePicture);
        }else{
            let errMsg="showProfilePicture not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static onload(showProfilePictureElemArr){
        const close=showProfilePictureElemArr["close"];
    
        if(close){
            close.addEventListener("click", ProfileFunc.closeProfilePictureView);
        }
    }
}

class DeleteMessageOptionPopupDOM{
    static create(delMsg, dfe=false){
        let deleteMessageOption=document.createElement("div");
        deleteMessageOption.id="deleteMessageOption";
    
        let div;
        let spanE=document.createElement("span");
    
        div=document.createElement("div");
        let span=document.createElement("span");
        span.className="D";
        span.innerHTML=delMsg;
        div.appendChild(span);
        spanE.appendChild(div);
    
        div=document.createElement("div");
        let DFM=document.createElement("span");
        DFM.className="action DFM";
        DFM.innerHTML="DELETE FOR ME";
        div.appendChild(DFM);
        spanE.appendChild(div);
    
        let DFE=null;
        if(dfe){
            div=document.createElement("div");
            DFE=document.createElement("span");
            DFE.className="action DFE";
            DFE.innerHTML="DELETE FOR EVERYONE";
            div.appendChild(DFE);
            spanE.appendChild(div);
        }
    
        div=document.createElement("div");
        let cancle=document.createElement("span");
        cancle.className="action C";
        cancle.innerHTML="CANCLE";
        div.appendChild(cancle);
        spanE.appendChild(div);
    
        deleteMessageOption.appendChild(spanE);
    
        let deleteMessageOptionElemArr={
            "DFM":DFM,
            "DFE":DFE,
            "cancle":cancle,
            "deleteMessageOption":deleteMessageOption
        }
        DeleteMessageOptionPopupDOM.onload(deleteMessageOptionElemArr);
    
    
        return deleteMessageOption;
    }

    static append(deleteMessageOptionElem){
        const pageSection=DOMGetter.getPageSection();
    
        if(pageSection){
            pageSection.appendChild(deleteMessageOptionElem);
        }else{
            let errMsg="pageSection not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static delete(){
        const deleteMessageOption=DOMGetter.getDeleteMessageOption();
    
        if(deleteMessageOption){
            let parent=deleteMessageOption.parentNode;
            parent.removeChild(deleteMessageOption);
        }else{
            let errMsg="deleteMessageOption not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static onload(deleteMessageOptionElemArr){
        const DFM=deleteMessageOptionElemArr["DFM"];
        const DFE=deleteMessageOptionElemArr["DFE"];
        const cancle=deleteMessageOptionElemArr["cancle"];
        const deleteMessageOption=deleteMessageOptionElemArr["deleteMessageOption"];
    
        if(DFM){
            DFM.addEventListener("click", MsgOptions.activateDeleteMessage);
        }
        if(DFE){
            DFE.addEventListener("click", MsgOptions.activateDeleteMessage);
        }
        if(cancle){
            cancle.addEventListener("click", MsgOptions.cancleDeleteMessage);
        }
        if(deleteMessageOption){
            deleteMessageOption.addEventListener("click", MsgOptions.cancleDeleteMessage);
        }
    
    }
        
}

class MsgInfoPopUpDOM{
    static create(msgWrapperElemClone, drtime){
        /*parameter expects
            msgWrapperElemClone: clone of message Element
            drtime: array //["deliverTime", "readTime"]
        */
    
       let deliverTime=drtime[0];
       let readTime=drtime[1];
       if(!readTime){readTime="-";}
       if(!deliverTime){deliverTime="-";}
    
        let msgInfoPopUp=document.createElement("div");
        msgInfoPopUp.id="msgInfoPopUp";
    
    
        let head=document.createElement("div");
        head.className="head";
        let back=document.createElement("span");
        back.className="material-icons flexCenter back";
        back.innerHTML="arrow_back";
        head.appendChild(back);
        let title=document.createElement("span");
        title.className="title";
        title.innerHTML="Message info";
        head.appendChild(title);
    
        msgInfoPopUp.appendChild(head);
    
    
        let body=document.createElement("div");
        body.className="body";
    
        let MIPMsg=document.createElement("div");
        MIPMsg.className="MIPMsg";
        MIPMsg.appendChild(msgWrapperElemClone);
        body.appendChild(MIPMsg);
    
    
        let span, time;
        let MIPSta=document.createElement("div");
        MIPSta.className="MIPSta";
    
        let MIPRead=document.createElement("div");
        MIPRead.className="MIPRead";
    
        title=document.createElement("div");
        title.className="title";
        span=document.createElement("span");
        span.className="material-icons flexCenter read";
        span.innerHTML="done_all";
        title.appendChild(span);
    
        span=document.createElement("span");
        span.innerHTML="Read";
        title.appendChild(span);
        MIPRead.appendChild(title);
    
        time=document.createElement("div");
        time.className="time";
        time.innerHTML=readTime;
        MIPRead.appendChild(time);
    
        MIPSta.appendChild(MIPRead);
    
        let hr=document.createElement("hr");
        MIPSta.appendChild(hr);
    
        let MIPDeliver=document.createElement("div");
        MIPDeliver.className="MIPDeliver";
    
        title=document.createElement("div");
        title.className="title";
        span=document.createElement("span");
        span.className="material-icons flexCenter read";
        span.innerHTML="done_all";
        title.appendChild(span);
    
        span=document.createElement("span");
        span.innerHTML="Read";
        title.appendChild(span);
        MIPDeliver.appendChild(title);
    
        time=document.createElement("div");
        time.className="time";
        time.innerHTML=deliverTime;
        MIPDeliver.appendChild(time);
    
        MIPSta.appendChild(MIPDeliver);
        body.appendChild(MIPSta);
    
        msgInfoPopUp.appendChild(body);
        
        let msgInfoPopUpElemArr={
            "body":body,
            "back":back
        }
        MsgInfoPopUpDOM.onload(msgInfoPopUpElemArr);
    
    
        return msgInfoPopUp;
    }
    
    static append(msgInfoPopUpElem){
        const pageSection=DOMGetter.getPageSection();
    
        if(pageSection){
            pageSection.appendChild(msgInfoPopUpElem);
        }else{
            let errMsg="pageSection not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
        
    static delete(){
        const msgInfoPopUp=DOMGetter.getMsgInfoPopUp();
    
        if(msgInfoPopUp){
            let parent=msgInfoPopUp.parentNode;
            parent.removeChild(msgInfoPopUp);
        }else{
            let errMsg="msgInfoPopUp not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
        
    static onload(msgInfoPopUpElemArr){
        const body=msgInfoPopUpElemArr["body"];
        const back=msgInfoPopUpElemArr["back"];
    
        if(body){
            body.addEventListener("scroll", MsgInfoPopUpDOM.scrlFunc);
        }
        if(back){
            back.addEventListener("click", MsgInfoPopUpDOM.delete);
        }
    }

    static scrlFunc(){
        let msgInfoPopUp=DOMGetter.getMsgInfoPopUp();
        let body=msgInfoPopUp.getElementsByClassName("body")[0];
        let head=msgInfoPopUp.getElementsByClassName("head")[0];
    
        //scroll to bottom if scroll is possible
        let scrlTop=body.scrollTop;
        if(scrlTop){
            head.classList.add("bodyScrl");
        }else{
            head.classList.remove("bodyScrl");
        }
    }
}

class ChatMousePosBodyPopupDOM{
    static create(resourse=null){
        /* resourse(object) expecs 
            styles: array of arrays, ["style", "value"]
            functs: array of arrays, ["event", "functin"]
        */
       let styles, functs;
        if(resourse){
            styles=resourse["styles"];
            functs=resourse["functs"];
        }
        
        let chatMousePosBody=document.createElement("div");
        chatMousePosBody.id="chatMousePosBody";
    
        if(styles){
            styles.forEach(styl => {
                chatMousePosBody.style[styl[0]]=styl[1];
            });
        }
        if(functs){
            functs.forEach(funct => {
                chatMousePosBody.addEventListener(funct[0], funct[1]);
            });
        }
    
    
        return chatMousePosBody;
    }

    static append(chatMousePosBody){
        const chat=DOMGetter.getChat();
    
        if(chat){
            // chat.appendChild(chatMousePosBody);
            let child=chat.children[0];
            chat.insertBefore(chatMousePosBody, child);
        }else{
            let errMsg="chatDom not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static delete(){
        const chatMousePosBody=DOMGetter.getChatMousePosBody();
    
        if(chatMousePosBody){
            let parent=chatMousePosBody.parentNode;
            parent.removeChild(chatMousePosBody);
        }else{
            let errMsg="chatMousePosBody not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class DeleteChatOptionPopupDOM{
    static create(delMsg){
        let deleteChatOption=document.createElement("div");
        deleteChatOption.id="deleteChatOption";
    
        let div;
        let spanE=document.createElement("span");
    
        div=document.createElement("div");
        let span=document.createElement("span");
        span.className="D";
        span.innerHTML=delMsg;
        div.appendChild(span);
        spanE.appendChild(div);
    
        div=document.createElement("div");
        let Del=document.createElement("span");
        Del.className="action Del";
        Del.innerHTML="DELETE";
        div.appendChild(Del);
        spanE.appendChild(div);
    
    
        div=document.createElement("div");
        let cancle=document.createElement("span");
        cancle.className="action C";
        cancle.innerHTML="CANCLE";
        div.appendChild(cancle);
        spanE.appendChild(div);
    
        deleteChatOption.appendChild(spanE);
    
        let deleteChatOptionElemArr={
            "Del":Del,
            "cancle":cancle,
            "deleteChatOption":deleteChatOption
        }
        DeleteChatOptionPopupDOM.onload(deleteChatOptionElemArr);
    
    
        return deleteChatOption;
    }

    static append(deleteChatOptionElem){
        const pageSection=DOMGetter.getPageSection();
    
        if(pageSection){
            pageSection.appendChild(deleteChatOptionElem);
        }else{
            let errMsg="pageSection not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    }
    
    static delete(){
        const deleteChatOption=DOMGetter.getDeleteChatOption();
    
        if(deleteChatOption){
            let parent=deleteChatOption.parentNode;
            parent.removeChild(deleteChatOption);
        }else{
            let errMsg="deleteChatOption not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    }

    static onload(deleteChatOptionElemArr){
        const Del=deleteChatOptionElemArr["Del"];
        const cancle=deleteChatOptionElemArr["cancle"];
        const deleteChatOption=deleteChatOptionElemArr["deleteChatOption"];
    
        if(Del){
            Del.addEventListener("click", ChatOptions.onclickDeleteChat);
        }
        if(cancle){
            cancle.addEventListener("click", ChatOptions.cancleChatDelete);
        }
        if(deleteChatOption){
            deleteChatOption.addEventListener("click", ChatOptions.cancleChatDelete);
        }
    }
}


export{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
}

