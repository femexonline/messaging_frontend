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
    MsgBody
} from "../../../msgPage/message/messageBody.js";

import{
    OnloadActivations
} from "../../../msgPage/others/onloadActivations.js";

import{
    MsgGroupActivations
} from "../../../msgPage/message/messageGroupActivations.js";

import{
    ChatFuncs
} from "../../../_tempDatabase/chatsFunc.js";

import{
    MessageFuncs
} from "../../../_tempDatabase/messageFuncs.js";

import{
    MsgOptions
} from "../../../msgPage/message/messageOptions.js";

import{
    MsgGroupDeactivations
} from "../../../msgPage/message/messageGroupDeactivations.js";

import{
    OtherFunctions
} from "../../../msgPage/others/otherFonctions.js";

import{
    MsgSectionDOM
} from "../../../DOM/msgPageDOM/msgDOM/messageSection.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";





class MessageBodyDOM{
    static create(){
        let messageBody=document.createElement("div");
        messageBody.id="messageBody";
    
        let elemObj={
            "messageBody":messageBody
        }
        OnloadActivations.messageBodyActivations(elemObj);
    
        return messageBody;
    }

    static append(messageBodyElem){
        const message=DOMGetter.getMessage();
        
        if(message){
            message.appendChild(messageBodyElem);
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

    static clear(){
        // let allMsgBody=document.getElementsByClassName("msgWrapper");
        let messageBody=DOMGetter.getMessageBody();
        let allMsgBody=messageBody.children;
        if(allMsgBody){
            let length=allMsgBody.length;
        
            for(let x=0; x < length; x++){
                let parent=allMsgBody[0].parentNode;
                parent.removeChild(allMsgBody[0]);
            }
        }else{
            let errMsg="msgBodyElems not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static appendElemBeforeElem(elem, beforElem){
        if(!elem){
            let errMsg="incomplete elements parameter";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        if(!beforElem){
            let errMsg="incomplete elements parameter";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const parentElem=beforElem.parentElement;
        if(parentElem){
            parentElem.insertBefore(elem, beforElem);
        }else{
            let errMsg="elems parents dont match";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static markAsSelected(elem, chatID){
        let selected=elem.getElementsByClassName("selected")[0];
        let megchecked=elem.getElementsByClassName("Megchecked")[0];
        let megcheckedInput=megchecked.getElementsByTagName("input")[0];
        if (selected) {
            let msgID= selected.dataset.id;
            if(!MessageFuncs.msgIsDeleting(chatID, msgID)){
                selected.classList.add("s");
            }
        }
        if (megchecked) {
            let msgID=megchecked.dataset.id;
            if(!MessageFuncs.msgIsDeleting(chatID, msgID)){
                megcheckedInput.setAttribute("checked", "true");    
            }
        }
    }
}

class MsgDateDOM{
    static create(date, asID=false){
        let msgDate=document.createElement("div");
        if(!asID){
            msgDate.className="msgDate";
            msgDate.innerHTML=date;
        }else{
            msgDate.id="msgDate";
        }
    
        return msgDate;
    }

    static append(msgDateElem, asID=false){
        let messageBody=DOMGetter.getMessageBody();
        if(asID){messageBody=DOMGetter.getMessage();}
        
        if(messageBody){
            messageBody.appendChild(msgDateElem);
        }else{
            let errMsg="msgBOdyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static deleteFirstOnPage(){
        const firstMsgDate=document.getElementsByClassName("msgDate")[0];
        if(!firstMsgDate){
            let errMsg="firstMsgDateElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        const parent=firstMsgDate.parentElement;
        parent.removeChild(firstMsgDate);
    }
}

class MsgWraperDOM{
    static create(msgDetailObj){
        /* parameters expect
            msgDetailObj : object
        */
        /* msgDetailObj parameters expect
            msgID : int
            msg : var
            isSender : bool
            first : bool
            timeSentString : var
            read : var
            stared : bool
            drtime : json array    //deliverd read time eg='["timd", "dhhl"]'
            replyedMegObj : object
    
        */
    
        const replyedMegObj=msgDetailObj["replyedMegObj"];
        const msgID=MsgBody.makeMsgIDUsable(msgDetailObj["msgID"]);
        const isSender=msgDetailObj["isSender"];
        let first=msgDetailObj["first"];
    
        let sent;
    
        if(isSender){
            sent="sent";
        }else{
            sent="recieved";
        }
        if(first){
            first=" first";
        }else{
            first="";
        }
        let msgWrapper=document.createElement("div");
        if(msgDetailObj["isDeleting"]){
            msgWrapper.className="msgWrapperNotActive "+sent+first;
        }else{
            msgWrapper.className="msgWrapper "+sent+first;
        }
        msgWrapper.id=msgID;
        msgWrapper.dataset["id"]=msgID;
    
        let selected=document.createElement("div");
        selected.className="selected hover";
        selected.dataset["id"]=msgID;
        selected.setAttribute("name", msgID);
        msgWrapper.appendChild(selected);
    
    
        let Megchecked=document.createElement("div");
        Megchecked.className="Megchecked";
        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        Megchecked.dataset["id"]=msgID;
        Megchecked.setAttribute("name", msgID);
        Megchecked.appendChild(checkbox);
        msgWrapper.appendChild(Megchecked);
    
    
        let msgContainerElem=MsgWraperDOM.createMsgContainerElem(msgDetailObj, first, sent, replyedMegObj);
        msgWrapper.appendChild(msgContainerElem);
    
    
        //from group activation onload
        MsgGroupActivations.allMessageOntouchEvent(msgWrapper);
        MsgGroupActivations.allMegSelectMoreOptions(msgWrapper);
        
        
        return msgWrapper;
    }

    static append(msgWraperElem){
        const messageBody=DOMGetter.getMessageBody();
        
        if(messageBody){
            messageBody.appendChild(msgWraperElem);
        }else{
            let errMsg="msgElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static replace(msgID, newMsgWraperElem){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        const oldMsgWraperElem=document.getElementById(msgID);
        if(!oldMsgWraperElem){
            let errMsg="msgElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const parent=oldMsgWraperElem.parentElement;
        if(!parent){
            let errMsg="parents elems do not match";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        parent.replaceChild(newMsgWraperElem, oldMsgWraperElem);
    }

    static delete(msgInstance, del=false){
        /* msgInstance contains
            msgID
            sent
            first
        */
    
        let msgID=msgInstance["msgID"];
        msgID=MsgBody.makeMsgIDUsable(msgID);
    
        if(!msgID){
            let errMsg="illegal first parameter";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let msgBody=document.getElementById(msgID);
        if(msgBody){
            let parent=msgBody.parentNode;
            if(del){
                parent.removeChild(msgBody);
            }else{
                let delMsg=DeletedMsgDOM.create(msgInstance);
                parent.replaceChild(delMsg, msgBody);
            }
        }else{
            let errMsg="msgBodyDOM not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }    

    static createMsgContainerElem(msgDetailObj, first, sent, replyedMegObj){
        /* parameters expect
            msgID : int
            msg : var
            isSender : bool
            sent : str
            first : bool
            time : var
            read : var
            stared : bool
            replyedMegObj : object
        */
    
       const msgID=MsgBody.makeMsgIDUsable(msgDetailObj["msgID"]);
       const msg=msgDetailObj["msg"];
       const isSender=msgDetailObj["isSender"];
       const timeSentString=msgDetailObj["timeSentString"];
       const read=msgDetailObj["read"];
       const stared=msgDetailObj["stared"];
    
        
        let messageContainer=document.createElement("div");
        messageContainer.className="messageContainer "+sent+first;
        messageContainer.dataset["id"]=msgID;
        messageContainer.setAttribute("name", msgID);
        
    
        let megMore=document.createElement("div");
        megMore.className="megMore";
        megMore.dataset["id"]=msgID;
        megMore.setAttribute("name", msgID);
        let subMsgMore=document.createElement("span");
        let text="expand_more";
        subMsgMore.className="material-icons subMsgMore";
        subMsgMore.dataset["id"]=msgID;
        subMsgMore.setAttribute("name", msgID);
        subMsgMore.innerHTML=text;
        megMore.appendChild(subMsgMore);
        messageContainer.appendChild(megMore);
    
        
    
        if(replyedMegObj){
            let replyedMesg=MsgWraperDOM.createReplyedMegElem(msgID, replyedMegObj);
            messageContainer.appendChild(replyedMesg);
        }
    
    
        let message=document.createElement("p");
        message.className="message";
        message.innerHTML=msg;
        messageContainer.appendChild(message);
    
        let timeContain=MsgWraperDOM.createTimeContainElem(timeSentString, read, stared, isSender);
        messageContainer.appendChild(timeContain[0]);
        messageContainer.appendChild(timeContain[1]);
    
        return messageContainer;
    }
    
    static createReplyedMegElem(msgID, rMsgObject){
        /* expect from rMsgObject
            msgID,: int
            isSender,: bool
            msg,: var
            senderName: var
        */
        let senderClass, isSender, msg;
        let sender;
        isSender=rMsgObject["isSender"];
        if(isSender){
            //senderID is userID
            sender="You";
            senderClass="you";
        }else{
            sender=rMsgObject["senderName"];
            senderClass="notYou";
        }
        msg=rMsgObject["msg"];
    
        msgID=MsgBody.makeMsgIDUsable(msgID);
    
        let replyedMegObj=document.createElement("div");
        replyedMegObj.className="replyedMeg";
        replyedMegObj.dataset["id"]=msgID;
        replyedMegObj.setAttribute("name", msgID);
    
        let div=document.createElement("div");
        replyedMegObj.appendChild(div);
    
        let span=document.createElement("span");
        span.className=senderClass;
        replyedMegObj.appendChild(span);
    
        let a=document.createElement("a");
        span=document.createElement("span");
        span.className=senderClass;
        span.innerHTML=sender;
        a.appendChild(span);
        let text=document.createTextNode(msg);
        a.appendChild(text);
        replyedMegObj.appendChild(a);

        a.addEventListener("click", OtherFunctions.onclickReplyedMegLink);
    
        return replyedMegObj;
    }
    
    static createTimeContainElem(timeSentString, read, stared, isSender){
        const msgOptionSettings=Settings.MessageOptions;

        let timeContain=[];
    
        const readTextObj={
            "sent":"done",
            "delivered":"done_all",
            "read":"done_all"
        };
        const readClassObj={
            "sent":"",
            "delivered":"",
            "read":"read"
        };
        
    
        let span=document.createElement("span");
        span.className="timeContainPlaceholder timeContain";
    
        let span2=document.createElement("span");
        span2.className="timeContain";
    
        let spanSub;
        if(msgOptionSettings.starMessage){
            if(stared){
                spanSub=StarDOM.create();
                span.appendChild(spanSub);
                spanSub=spanSub.cloneNode(true);
                span2.appendChild(spanSub);
            }
        }
    
        spanSub=document.createElement("span");
        spanSub.className="time";
        spanSub.innerHTML=timeSentString;
        span.appendChild(spanSub);
        spanSub=spanSub.cloneNode(true);
        span2.appendChild(spanSub);
    
        if(isSender){
            spanSub=document.createElement("span");
            spanSub.className="material-icons seen";
            if(read=="read"){
                spanSub.classList.add(readClassObj[read]);
            }
            spanSub.innerHTML=readTextObj[read];
            span.appendChild(spanSub);
            spanSub=spanSub.cloneNode(true);
            span2.appendChild(spanSub);
        }
    
    
        timeContain[0]=span;
        timeContain[1]=span2;
    
        return timeContain;
    }


    static makeSelectable(chatID, msgID){
        if(!ChatFuncs.isActiveChat(chatID)){
            let errMsg="chat no longer active";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, false, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        msgID=MsgBody.makeMsgIDUsable(msgID);

        let msgWrapper=document.getElementById(msgID);

        if(!msgWrapper){
            let errMsg="error with msgWrapper";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        msgWrapper.classList.remove("msgWrapperNotActive");
        msgWrapper.classList.add("msgWrapper");
    }

    static makeUnselectable(chatID, msgID){
        if(!ChatFuncs.isActiveChat(chatID)){
            let errMsg="chat no longer active";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        msgID=MsgBody.makeMsgIDUsable(msgID);
        
        let msgWrapper=document.getElementById(msgID);

        if(!msgWrapper){
            let errMsg="error with msgWrapper";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        msgWrapper.classList.remove("msgWrapper");
        msgWrapper.classList.add("msgWrapperNotActive");
    }

    static isSelectable(msgWrapperElem){
        if(msgWrapperElem.classList.contains("msgWrapper")){
            return true;
        }else{
            return false;
        }
    }
        
}

class MsgSendingWraperDOM{
    static create(msgDetailObj){
        /* parameters expect
            msgDetailObj : object
        */
        /* msgDetailObj parameters expect
            chatID
            msgSendingID: int  
            msg : var
            isSender : bool, true
            rMsg: object
            rMsg contains:
                msgID,: int
                isSender,: bool
                msg,: var
                senderName: var
            ;
    
        */
    
        const replyedMegObj=msgDetailObj["rMsg"];
        const msgSendingID=msgDetailObj["msgSendingID"];
    
        let sent="sent";
    
        let msgSendingWrapper=document.createElement("div");
        msgSendingWrapper.className="msgSendingWrapper "+sent;
        msgSendingWrapper.id=msgSendingID;
        msgSendingWrapper.dataset["id"]=msgSendingID;    
        
    
        let msgContainerElem=MsgSendingWraperDOM.createMsgContainerElem(msgDetailObj, sent, replyedMegObj);
        msgSendingWrapper.appendChild(msgContainerElem);
    
    
        // //from group activation onload
        // MsgGroupActivations.allMessageOntouchEvent(msgSendingWrapper);
        // MsgGroupActivations.allMegSelectMoreOptions(msgSendingWrapper);
        
        
        return msgSendingWrapper;
    }

    static append(msgWraperElem){
        const messageBody=DOMGetter.getMessageBody();
        
        if(messageBody){
            messageBody.appendChild(msgWraperElem);
        }else{
            let errMsg="msgBodyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(msgSendingID){
        if(!msgSendingID){
            let errMsg="incomplete parameter";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let msgBody=document.getElementById(msgSendingID);
        if(msgBody){
            let parent=msgBody.parentNode;
            parent.removeChild(msgBody);
        }else{
            let errMsg="msgBody not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }    

    static createMsgContainerElem(msgDetailObj, sent, replyedMegObj){
        /* parameters expect
            chatID
            msgSendingID: int  
            msg : var
            isSender : bool, true
            replyedMegObj: object
            replyedMegObj contains:
                msgID,: int
                isSender,: bool
                msg,: var
                senderName: var
            ;
        */
    
       const msgSendingID=msgDetailObj["msgSendingID"];
       const msg=msgDetailObj["msg"];
    
            
        let msgSendingContainer=document.createElement("div");
        msgSendingContainer.className="msgSendingContainer "+sent;
        msgSendingContainer.dataset["id"]=msgSendingID;
        msgSendingContainer.setAttribute("name", msgSendingID);
        
    
        
    
        if(replyedMegObj){
            let replyedMesg=MsgWraperDOM.createReplyedMegElem(msgSendingID, replyedMegObj);
            msgSendingContainer.appendChild(replyedMesg);
        }
    
    
        let message=document.createElement("p");
        message.className="message";
        message.innerHTML=msg;
        msgSendingContainer.appendChild(message);
    
        let timeContain=MsgSendingWraperDOM.createTimeContainElem();
        msgSendingContainer.appendChild(timeContain[0]);
        msgSendingContainer.appendChild(timeContain[1]);
    
        return msgSendingContainer;
    }
    
    
    static createTimeContainElem(){
        let timeContain=[];
        
        let span=document.createElement("span");
        span.className="timeContainPlaceholder timeContain";
    
        let span2=document.createElement("span");
        span2.className="timeContain";
    
        let spanSub=document.createElement("span");
        spanSub.className="material-icons msgSending";
        spanSub.innerHTML="query_builder";
        span.appendChild(spanSub);
        spanSub=spanSub.cloneNode(true);
        span2.appendChild(spanSub);    
    
        timeContain[0]=span;
        timeContain[1]=span2;
    
        return timeContain;
    }

    static convertToMsg(msgSendingID, newMsgElem){
        const msgSendingElem=document.getElementById(msgSendingID);
        if(!msgSendingElem){
            let errMsg="msgSending elem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        const parent=msgSendingElem.parentElement;
        if(!parent){
            let errMsg="parent elem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        
        parent.replaceChild(newMsgElem, msgSendingElem);
    }
        
}

class DeletedMsgDOM{
    static create(msgInstance){
        // <div class="msgWrapper recieved first">
        //     <div class="delMsgContainer recieved first">
        //         deleted
        //     </div>
        // </div>
        let sent=msgInstance["isSender"];
        let first=msgInstance["first"];
        let deletedText=msgInstance["deletedText"];

        if(sent==(null||undefined) || first==(null||undefined)){
            let errMsg="Incomplete parameter";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        if(sent){
            sent="sent";
        }else{
            sent="recieved";
        }
        if(first){
            first=" first";
        }else{
            first="";
        }
        
        let msgWrapper=document.createElement("div");
        msgWrapper.className="msgWrapper "+sent+first;
    
        let delMsgContainer=document.createElement("div");
        delMsgContainer.className="delMsgContainer "+sent+first;
        delMsgContainer.innerHTML=deletedText;
    
        msgWrapper.appendChild(delMsgContainer);
    
        return msgWrapper;
    }

    static append(deletedMsgElement){
        const messageBody=DOMGetter.getMessageBody();
        
        if(messageBody){
            messageBody.appendChild(deletedMsgElement);
        }else{
            let errMsg="msgBodyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class StarDOM{
    static create(){
        // <span class="material-icons stared">grade</span>
        let span=document.createElement("span");
        // let text=document.createTextNode("grade");
        let text="grade";
        span.className="material-icons stared";
        span.innerHTML=text;
        return span;
    }

    static append(msgID, starSpan){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        let msgBody=document.getElementById(msgID);
        if(msgBody){
            let timeContain=msgBody.getElementsByClassName("timeContain");
            for(let x=0; x < timeContain.length; x++){
                let where=timeContain[x].children[0];
                timeContain[x].insertBefore(starSpan, where);
                starSpan=starSpan.cloneNode(true);
            }
        }else{
            let errMsg="msgBodyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(msgID){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        let msgBody=document.getElementById(msgID);
        if(msgBody){
            let starSpan=msgBody.getElementsByClassName("stared");
            let length=starSpan.length;
        
            for(let x=0; x < length; x++){
                let parent=starSpan[0].parentNode;
                parent.removeChild(starSpan[0]);
            }
        }else{
            let errMsg="msgBodyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class MsgMoreOptionsDOM{
    static create(msgID, chatID=null){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        const msgOptionSettings=Settings.MessageOptions;

        if(!chatID){
            chatID=ChatFuncs.getActiveChat();
        }

        const msgDetailObj=MessageFuncs.getMessageObj(chatID, msgID);
        const stared=msgDetailObj["stared"];
        const isSender=msgDetailObj["isSender"];
        let star;
        if(stared){
            star="Unstar";
        }else{
            star="Star";
        }


        const msgMoreOptions=document.createElement("div");
        // msgMoreOptions.className="hide";
        msgMoreOptions.className="megMoreOptions";
        msgMoreOptions.dataset["id"]=msgID;
        msgMoreOptions.setAttribute("name", msgID);
    
        let Ps=[];
        if(msgOptionSettings.replyMessage){
            Ps.push(["replyThisMessage", "Reply"]);
        }
        if(msgOptionSettings.messageInfo){
            Ps.push(["thisMessageInfo", "Info"]);
        }
        if(msgOptionSettings.fowardMessage){
            Ps.push(["fowardThisMessage", "Foward"]);
        }
        if(msgOptionSettings.starMessage){
            Ps.push(["starThisMessage", star]);
        }
        if(msgOptionSettings.deleteMessage){
            Ps.push(["deleteThisMessage", "Delete"]);
        }
        if(msgOptionSettings.selectMessage){
            Ps.push(["selectThisMessage", "Select"]);
        }
        
        
        Ps.forEach(P => {
            let proceed=true;
            if(P[0]=="thisMessageInfo" && !isSender){
                proceed=false;
            }
    
            if(proceed){
                let p=document.createElement("p");
                p.className=P[0];
                p.innerHTML=P[1];
                msgMoreOptions.appendChild(p);
            }
        });

        MsgMoreOptionsDOM.onload(msgMoreOptions, chatID, msgID);

        const megMoreOptionsBackground=document.createElement("div");
        // megMoreOptionsBackground.className="hide";
        megMoreOptionsBackground.className="megMoreOptionsBackground";
        megMoreOptionsBackground.dataset["id"]=msgID;
        megMoreOptionsBackground.setAttribute("name", msgID);

        megMoreOptionsBackground.appendChild(msgMoreOptions);

        return megMoreOptionsBackground;
    }

    static append(msgID, msgMoreOptionsElem){
        msgID=MsgBody.makeMsgIDUsable(msgID);
        const msgWrapper=document.getElementById(msgID);
        if(msgWrapper){
            const megMore=msgWrapper.getElementsByClassName("megMore")[0];
            const parent=megMore.parentElement;
            const beforeMsgMoreOptionsElem=megMore.nextElementSibling;

            if(beforeMsgMoreOptionsElem){
                parent.insertBefore(msgMoreOptionsElem, beforeMsgMoreOptionsElem);
            }else{
                parent.appendChild(msgMoreOptionsElem);
            }
        }
    }

    static delete(msgID, isElem=false){
        let mesMoreOptions;
        if(!isElem){
            msgID=MsgBody.makeMsgIDUsable(msgID);
            const msgWrapper=document.getElementById(msgID);
            if(msgWrapper){
                mesMoreOptions=msgWrapper.getElementsByClassName("megMoreOptionsBackground")[0];
                
                if(!mesMoreOptions){
                    let errMsg="msgMoreOptionElem not found";
                    let errCode="";
                    let userErr=false;
                    let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
                    if(errHandler){
                        console.log(errHandler);
                    }
                    return;
                }
            }else{
                let errMsg="msgWrapperElem not found";
                let errCode="";
                let userErr=false;
                let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            mesMoreOptions=msgID;
        }

        const parent=mesMoreOptions.parentElement;
        parent.removeChild(mesMoreOptions);
    }

    static onload(msgMoreOptionsElem, chatID, msgID){
        const selectMessageOption=msgMoreOptionsElem.getElementsByClassName("selectThisMessage")[0];
        const replyMessageOption=msgMoreOptionsElem.getElementsByClassName("replyThisMessage")[0];
        const messageInfoOption=msgMoreOptionsElem.getElementsByClassName("thisMessageInfo")[0];
        const fowardMessageOption=msgMoreOptionsElem.getElementsByClassName("fowardThisMessage")[0];
        const starMessageOption=msgMoreOptionsElem.getElementsByClassName("starThisMessage")[0];
        const deleteMessageOption=msgMoreOptionsElem.getElementsByClassName("deleteThisMessage")[0];
        
            
        if(selectMessageOption){
            selectMessageOption.addEventListener("click", MsgOptions.selectThisMessage);
        }
        if(replyMessageOption){
            replyMessageOption.addEventListener("click", MsgOptions.replyThisMessage);
        }
        if(messageInfoOption){
            messageInfoOption.addEventListener("click", MsgOptions.getThisMessageInfo);
        }
        if(fowardMessageOption){
            fowardMessageOption.addEventListener("click", MsgOptions.fowardThisMessage);
        }
        if(starMessageOption){
            if(!MessageFuncs.msgIsDeleting(chatID, msgID)){
                starMessageOption.addEventListener("click", MsgOptions.starThisMessage);
            }else{
                MsgMoreOptionsDOM.makeOptionUclickale(0,0,0,starMessageOption)
            }
        }
        if(deleteMessageOption){
            if(!MessageFuncs.msgIsDeleting(chatID, msgID)){
                deleteMessageOption.addEventListener("click", MsgOptions.deleteThisMessage);
            }else{
                MsgMoreOptionsDOM.makeOptionUclickale(0,0,0,deleteMessageOption)
            }
        }
    }

    static makeOptionUclickale(chatID, msgID, option, elem){
        if(!elem){
            msgID=MsgBody.makeMsgIDUsable(msgID);
            if(!ChatFuncs.isActiveChat(chatID)){
                let errMsg="chat no longer active";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }


            const options={
                "reply":"replyThisMessage",
                "info":"thisMessageInfo",
                "fow":"fowardThisMessage",
                "star":"starThisMessage",
                "del":"deleteThisMessage",
                "sel":"selectThisMessage",
            }
    
            let msgContain=document.getElementById(msgID);
            if(!msgContain){
                let errMsg="msgContainDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
    
            let msgMoreOptions=msgContain.getElementsByClassName("megMoreOptions")[0];
            if(!msgMoreOptions){
                return;
            }
    
            elem=megMoreOptions.getElementsByClassName(options[option])[0];
        }

        if(elem){
            elem.classList.add("processing");

            if(elem.classList.contains("replyThisMessage")){
                elem.removeEventListener("click", MsgOptions.replyThisMessage);
            }
            if(elem.classList.contains("thisMessageInfo")){
                elem.removeEventListener("click", MsgOptions.getThisMessageInfo);
            }
            if(elem.classList.contains("fowardThisMessage")){
                elem.removeEventListener("click", MsgOptions.fowardThisMessage);
            }
            if(elem.classList.contains("starThisMessage")){
                elem.removeEventListener("click", MsgOptions.starThisMessage);
            }
            if(elem.classList.contains("deleteThisMessage")){
                elem.removeEventListener("click", MsgOptions.deleteThisMessage);
            }
            if(elem.classList.contains("selectThisMessage")){
                elem.removeEventListener("click", MsgOptions.selectThisMessage);
            }
        }
    }

    static makeOptionClickale(chatID, msgID, option, elem){
        if(!ChatFuncs.isActiveChat(chatID)){
            let errMsg="chat no longer active";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, false, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        
        if(!elem){
            const options={
                "reply":"replyThisMessage",
                "info":"thisMessageInfo",
                "fow":"fowardThisMessage",
                "star":"starThisMessage",
                "del":"deleteThisMessage",
                "sel":"selectThisMessage",
            }

            msgID=MsgBody.makeMsgIDUsable(msgID);
            let msgContain=document.getElementById(msgID);
            if(!msgContain){
                let errMsg="msgContainDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode, false, true);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
    
            let msgMoreOptions=msgContain.getElementsByClassName("megMoreOptions")[0];
            if(!msgMoreOptions){
                return;
            }
    
            elem=megMoreOptions.getElementsByClassName(options[option])[0];
        }


        if(elem){
            elem.classList.remove("processing");
            
            if(elem.classList.contains("replyThisMessage")){
                elem.addEventListener("click", MsgOptions.replyThisMessage);
            }
            if(elem.classList.contains("thisMessageInfo")){
                elem.addEventListener("click", MsgOptions.getThisMessageInfo);
            }
            if(elem.classList.contains("fowardThisMessage")){
                elem.addEventListener("click", MsgOptions.fowardThisMessage);
            }
            if(elem.classList.contains("starThisMessage")){
                elem.addEventListener("click", MsgOptions.starThisMessage);
            }
            if(elem.classList.contains("deleteThisMessage")){
                elem.addEventListener("click", MsgOptions.deleteThisMessage);
            }
            if(elem.classList.contains("selectThisMessage")){
                elem.addEventListener("click", MsgOptions.selectThisMessage);
            }
        }
    }
}

class LoadOlderMsgsBtnDOM{
    static create(){
        let loadOlderMsgsBtn=document.createElement("div");
        loadOlderMsgsBtn.id="loadOlderMsgsBtn";
        loadOlderMsgsBtn.innerHTML="Older Messages";

        LoadOlderMsgsBtnDOM.onload(loadOlderMsgsBtn);

        return loadOlderMsgsBtn;
    }

    static append(loadOlderMsgsBtnElem){
        const messageBody=DOMGetter.getMessageBody();
        const loadOlderMsgsBtn=DOMGetter.getLoadOlderMsgsBtn();

        if(loadOlderMsgsBtn){
            let errMsg="loadOlderMsgsBtnElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        if(!messageBody){
            let errMsg="msgBodyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const elemBefore=messageBody.firstChild;
        if(elemBefore){
            messageBody.insertBefore(loadOlderMsgsBtnElem, elemBefore);
        }else{
            let errMsg="error getting positioning";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        // console.log("ddd")
        const messageBody=DOMGetter.getMessageBody();
        const loadOlderMsgsBtn=DOMGetter.getLoadOlderMsgsBtn();

        if(!loadOlderMsgsBtn){
            let errMsg="loadOlderMsgsBtnElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        if(!messageBody){
            let errMsg="msgBodyElem not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        messageBody.removeChild(loadOlderMsgsBtn);
    }

    static onload(loadOlderMsgsBtn){
        loadOlderMsgsBtn.addEventListener("click", LoadOlderMsgsBtnDOM.onclick);
    }

    static onclick(){
        // MsgGroupDeactivations.allSelected_Megchecked();

        const chatID=ChatFuncs.getActiveChat();
        MessageFuncs.pushInPreviousMsgs(chatID);
    }
}

class SelectAChatDOM{
    static create(){
        let selectAChatW=document.createElement("div");
        selectAChatW.className="selectAChatW";
        selectAChatW.id="selectAChatW";

        let selectAChat=document.createElement("div");
        selectAChat.className="selectAChat";
        selectAChat.innerHTML="Slect a chat";
        selectAChatW.appendChild(selectAChat);

        let selectAChatBtn=document.createElement("div");
        selectAChatBtn.className="selectAChatBtn";
        selectAChatBtn.innerHTML="Chats";
        selectAChatW.appendChild(selectAChatBtn);


        selectAChatBtn.addEventListener("click", MessageHeadNormalDOM.onclickMessageChatMaximizeBotton);


        return selectAChatW;
    }

    static append(selectAChatElem){
        const message=DOMGetter.getMessage();
        
        if(message){
            message.appendChild(selectAChatElem);
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
    
    static delete(){
        MsgSectionDOM.clear();
    }
}



export{
    MessageBodyDOM,
    MsgDateDOM,
    MsgWraperDOM,
    MsgSendingWraperDOM,
    DeletedMsgDOM,
    StarDOM,
    MsgMoreOptionsDOM,
    LoadOlderMsgsBtnDOM,
    SelectAChatDOM
}

