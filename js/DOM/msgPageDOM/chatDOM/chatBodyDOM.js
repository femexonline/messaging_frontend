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

import {
    ChatBody
} from "../../../msgPage/chat/chatBody.js";

import{
    ChatGroupActivations
} from "../../../msgPage/chat/chatGroupActivations.js";

import{
    ChatGroupDeactivations
} from "../../../msgPage/chat/chatGroupDeactivations.js";

import{
    ChatOptions
} from "../../../msgPage/chat/chatOptions.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../../../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import {
    ChatFuncs 
} from "../../../_tempDatabase/chatsFunc.js";





class ChatBodyDOM{
    static create(){
        let chatBody=document.createElement("div");
        chatBody.id="chatBody";
        chatBody.className="chatBody";
    
        return chatBody;
    }

    static append(chatBodyElem){
        const chat=DOMGetter.getChat();

        if(chat){
            chat.appendChild(chatBodyElem);
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
        const chatBody=DOMGetter.getChatBody();

        if(chatBody){
            let parent=chatBody.parentNode;
            parent.removeChild(chatBody);
        }else{
            let errMsg="chatBodyDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static clear(){
        const chatBody=DOMGetter.getChatBody();
        let allChatBodyContent=chatBody.children;
    
        if(allChatBodyContent){
            let length=allChatBodyContent.length;
        
            for(let x=0; x < length; x++){
                let parent=allChatBodyContent[0].parentNode;
                parent.removeChild(allChatBodyContent[0]);
            }
        }else{
            let errMsg="allChatBodyContent undefined";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class ChatContainDOM{
    static create(chatObj){
        /* parameters expectes
            chatObj: obj
        */
        
        /* chatObj parameters expectes
            chatID : int
            imgSrc : str
            name : str
            unreadMsgCount : int
            pined:bool
            lastMsgObj : object
        */
    
        /* lastMsgObj expectes
            lastMsg : var
            timeSentString : str
            read : str eg: read, sent, deliverd
            isSender : bool
        */
        let chatID=chatObj["chatID"];
        let imgSrc=chatObj["imgSrc"];
        let name=chatObj["name"];
        let unreadMsgCount=chatObj["unreadMsgCount"];
        let pined=chatObj["pined"];
        let lastMsgObj=chatObj["lastMsgObj"];
    
        let lastMsgTime=lastMsgObj["timeSentString"];
                
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        let chatContain=document.createElement("div");
        if(chatObj["isDeleting"]){
            chatContain.className="chatContainNotActive hover";
        }else{
            chatContain.className="chatContain hover";
        }
        chatContain.id=chatID;
        chatContain.dataset.id=chatID;
    
    
        let chatSelected=document.createElement("div");
        chatSelected.className="chatSelected";
        chatSelected.dataset.id=chatID;
        chatSelected.setAttribute("name", chatID);
        chatContain.appendChild(chatSelected);
    
    
        let chatPix=document.createElement("div");
        chatPix.className="chatPix";
        let img=document.createElement("img");
        img.src=imgSrc;
        img.alt="pix";
        chatPix.appendChild(img);
        // let chatSelect=document.createElement("span");
        // chatSelect.className="material-icons flexCenter chatSelect";
        // chatSelect.innerHTML="done";
        // chatSelect.style.display="block";
        // chatPix.appendChild(chatSelect);
        // let online=document.createElement("span");
        // online.className="flexCenter online";
        // online.style.display="block";
        // chatPix.appendChild(online);
        chatContain.appendChild(chatPix);
    
    
        let chatSubContain=document.createElement("div");
        chatSubContain.className="chatSubContain";
    
        let nameContain=document.createElement("div");
        nameContain.className="nameContain";
    
        let nameSubContain=document.createElement("div");
        nameSubContain.className="nameSubContain";
        nameSubContain.innerHTML=name;
        nameContain.appendChild(nameSubContain);
        let chatTimeContain=document.createElement("div");
        chatTimeContain.className="chatTimeContain";
        chatTimeContain.innerHTML=lastMsgTime;
        nameContain.appendChild(chatTimeContain);
    
        chatSubContain.appendChild(nameContain);
    
        let lMegContain=ChatContainDOM.createLMegContainElem(chatID, unreadMsgCount, pined, lastMsgObj);
        chatSubContain.appendChild(lMegContain);
        chatContain.appendChild(chatSubContain);
    
    
        ChatGroupActivations.allChatsFunctions(chatContain);
        ChatGroupActivations.allChatOntouchEvent(chatContain);
    
       return chatContain;
    }

    static append(chatContainElem){
        const chatBody=DOMGetter.getChatBody();

        if(chatBody){
            chatBody.appendChild(chatContainElem);
        }else{
            let errMsg="chatBodyDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID, passive=false){
        chatID=ChatBody.makeChatIDUsable(chatID);
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let parent=chatContain.parentNode;
            parent.removeChild(chatContain);
        }else{
            if(!passive){
                let errMsg="error with chatContain";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }
    }

    static createLMegContainElem(chatID, unreadMsgCount, pined, lastMsgObj){ 
        const chatOptionsSettings=Settings.ChatOptions;
        // console.log(chatOptionsSettings);
        /* lastMsgObj expectes
            lastMsg : var
            timeSentString : str
            read : str eg: read, sent, deliverd
            isSender : bool
        */
    
       chatID=ChatBody.makeChatIDUsable(chatID);
    
        let readClass="", readInner="";
        let read=lastMsgObj["read"];
        let msg=lastMsgObj["lastMsg"];
        let isSender=lastMsgObj["isSender"];
    
    
        if(read=="read"){
            readClass="read";
        }
        if(read=="sent"){
            readInner="done";
        }else{
            readInner="done_all";
        }
    
        let lMegContain=document.createElement("div");
        lMegContain.className="lMegContain";
    
    
        let lMegContain1=document.createElement("div");
        lMegContain1.className="lMegContain1";
    
        if(isSender){
            let lMegRead=LMegReadDOM.create(readClass, readInner);
            lMegContain1.appendChild(lMegRead);
        }
    
        let lMeg=document.createElement("div");
        lMeg.className="lMeg";
        lMeg.innerHTML=msg;
        lMegContain1.appendChild(lMeg);
    
        lMegContain.appendChild(lMegContain1);
    
    
        let lMegContain2=document.createElement("div");
        lMegContain2.className="lMegContain2";
        
        if(chatOptionsSettings.pinChat){
            if(pined){
                let chatPined=ChatPinedDOM.create();
                lMegContain2.appendChild(chatPined);
            }
        }
    
        if(unreadMsgCount){
            let chatCount=ChatCountDOM.create(unreadMsgCount);
            lMegContain2.appendChild(chatCount);
        }
    
        let chatExpandMore=document.createElement("div");
        chatExpandMore.className="material-icons flexCenter chatExpandMore";
        chatExpandMore.innerHTML="expand_more";
        chatExpandMore.dataset.id=chatID;
        chatExpandMore.setAttribute("name", chatID);
        lMegContain2.appendChild(chatExpandMore);
    
        lMegContain.appendChild(lMegContain2);
    
    
    
        
        return lMegContain;
    }

    static getAllChatContains(){
        const chatBody=DOMGetter.getChatBody();
        if(!chatBody){
            return [];
        }
        let allChatContains=chatBody.getElementsByClassName("chatContain");

        return allChatContains;
    }

    static getCountChatContains(){
        let allChatContains=ChatContainDOM.getAllChatContains();

        return allChatContains.length;
    }

    static makeSelectable(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
        let chatContain=document.getElementById(chatID);

        if(!chatContain){
            let errMsg="error with chatContain";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, false, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        chatContain.classList.remove("chatContainNotActive");
        chatContain.classList.add("chatContain");
    }

    static makeUnselectable(chatID){
        chatID=ChatBody.makeChatIDUsable(chatID);
        let chatContain=document.getElementById(chatID);

        if(!chatContain){
            let errMsg="error with chatContain";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        chatContain.classList.remove("chatContain");
        chatContain.classList.add("chatContainNotActive");
    }

    static isSelectable(chatContainElem){
        if(chatContainElem.classList.contains("chatContain")){
            return true;
        }else{
            return false;
        }
    }
}

class ChatPinedDOM{
    static create(){
        const chatOptionsSettings=Settings.ChatOptions;
        if(!chatOptionsSettings.pinChat){
            let errMsg="pin chat action is not allowed";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        
        const chatPinnedSAV='<svg viewBox="0 0 19 19" width="19" height="19"><path fill="currentColor" d="M9.5 18.419C4.574 18.419.581 14.426.581 9.5S4.574.581 9.5.581s8.919 3.993 8.919 8.919-3.993 8.919-8.919 8.919zm2.121-5.708l-.082-2.99 1.647-1.963a1.583 1.583 0 0 0-.188-2.232l-.32-.269a1.58 1.58 0 0 0-2.231.203L8.803 7.42l-2.964.439a.282.282 0 0 0-.14.496l5.458 4.58c.186.157.47.019.464-.224zM5.62 13.994a.504.504 0 0 0 .688-.038l2.204-2.307-1.085-.91-1.889 2.571a.504.504 0 0 0 .082.684z"></path></svg>';
    
        let chatPined=document.createElement("div");
        chatPined.className="material-icons flexCenter chatPined";
        chatPined.innerHTML=chatPinnedSAV;
    
        return chatPined;
    }

    static append(chatID, chatPinedElem){
        const chatOptionsSettings=Settings.ChatOptions;
        if(!chatOptionsSettings.pinChat){
            let errMsg="pin chat action is not allowed";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        chatID=ChatBody.makeChatIDUsable(chatID);
            
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let firstChild=lMegContain2.children[0];
            if(lMegContain2){
                lMegContain2.insertBefore(chatPinedElem, firstChild);
            }else{
                let errMsg="lMegContain2DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID){

        chatID=ChatBody.makeChatIDUsable(chatID);

        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatPined=lMegContain2.getElementsByClassName("chatPined")[0];
            if(lMegContain2 && chatPined){
                lMegContain2.removeChild(chatPined);
            }else{
                let errMsg="lMegContain2DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class ChatCountDOM{
    static create(unreadMsgCount=0){
        let chatCount=document.createElement("div");
        chatCount.className="flexCenter chatCount";
        chatCount.innerHTML=unreadMsgCount;
    
        return chatCount;
    }

    static append(chatID, chatCountElem){

        chatID=ChatBody.makeChatIDUsable(chatID);
            
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatExpandMore=lMegContain2.getElementsByClassName("chatExpandMore")[0];
            if(lMegContain2){
                lMegContain2.insertBefore(chatCountElem, chatExpandMore);
            }else{
                let errMsg="lMegContain2DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID){

        chatID=ChatBody.makeChatIDUsable(chatID);

        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatCount=lMegContain2.getElementsByClassName("chatCount")[0];
            if(lMegContain2 && chatCount){
                lMegContain2.removeChild(chatCount);
            }else{
                let errMsg="lMegContain2DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class LoadOlderChatsDOM{
    static create(){
        let getOlderChat=document.createElement("div");
        getOlderChat.id="getOlderChat";
        getOlderChat.innerHTML="Older Chats";

        getOlderChat.addEventListener("click", LoadOlderChatsDOM.onClick);

        return getOlderChat;
    }

    static append(getOlderChatElem){
        const chatBody=DOMGetter.getChatBody();

        if(chatBody){
            chatBody.appendChild(getOlderChatElem);
        }else{
            let errMsg="chatBodyDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(){
        const getOlderChat=DOMGetter.getGetOlderChat();
        if(getOlderChat){
            const parent=getOlderChat.parentElement;
            parent.removeChild(getOlderChat);
        }else{
            let errMsg="getOlderDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static async onClick(){
        // const getOlderChat=DOMGetter.getGetOlderChat();
        // // console.log(getOlderChat);
        // LoaderBackgroundDOM.append(getOlderChat, LoaderBackgroundDOM.create());
        // ContentLoaderDOM.append(getOlderChat, ContentLoaderDOM.create(true, "boxes"));

        await ChatFuncs.fetchOlderChats();

        LoadOlderChatsDOM.delete();

        ChatFuncs.pushInFetchedChat(true);
    }
}


class ChatSelectedIconDOM{
    static create(){
        let chatSelect=document.createElement("span");
        chatSelect.className="material-icons flexCenter chatSelect";
        chatSelect.innerHTML="done";
    
        chatSelect.style.display="block";  
    
    
    
        return chatSelect;
    }

    static append(chatID, chatSelectElem){

        chatID=ChatBody.makeChatIDUsable(chatID);
            
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let chatPix=chatContain.getElementsByClassName("chatPix")[0];
            if(chatPix){
                chatPix.appendChild(chatSelectElem);
            }else{
                let errMsg="chatPixDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID){

        chatID=ChatBody.makeChatIDUsable(chatID);

        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let chatPix=chatContain.getElementsByClassName("chatPix")[0];
            let chatSelect=chatPix.getElementsByClassName("chatSelect")[0];
            if(chatPix && chatSelect){
                let parent=chatSelect.parentElement;
                parent.removeChild(chatSelect);
            }else{
                let errMsg="chatPixDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class ChatOnlineIconDOM{
    static create(){
        let online=document.createElement("span");
        online.className="flexCenter online";
        online.style.display="block";
            
        return online;
    }

    static append(chatID, onlineIconElem){

        chatID=ChatBody.makeChatIDUsable(chatID);
            
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let chatPix=chatContain.getElementsByClassName("chatPix")[0];
            if(chatPix){
                chatPix.appendChild(onlineIconElem);
            }else{
                let errMsg="chatPixDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID){

        chatID=ChatBody.makeChatIDUsable(chatID);

        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let chatPix=chatContain.getElementsByClassName("chatPix")[0];
            if(!chatPix){
                console.log("fatal error 001");
                return;
            }
            let onlineIconElem=chatPix.getElementsByClassName("online")[0];
            if(onlineIconElem){
                let parent=onlineIconElem.parentElement;
                parent.removeChild(onlineIconElem);
            }else{
                let errMsg="onlineIconElem not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class LMegReadDOM{
    static create(readClass, readInner){
        let lMegRead=document.createElement("div");
        lMegRead.className="material-icons flexCenter lMegRead";
        if(readClass){
            lMegRead.className="material-icons flexCenter lMegRead"+" "+readClass;
        }
        lMegRead.innerHTML=readInner;
    
    
        return lMegRead;
    }

    static append(chatID, lMegReadElem){

        chatID=ChatBody.makeChatIDUsable(chatID);
            
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain1=chatContain.getElementsByClassName("lMegContain1")[0];
            if(lMegContain1){
                let firstChild=lMegContain1.firstChild;
                lMegContain1.insertBefore(lMegReadElem, firstChild);
            }else{
                let errMsg="lMegContain1 not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID){

        chatID=ChatBody.makeChatIDUsable(chatID);

        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain1=chatContain.getElementsByClassName("lMegContain1")[0];
            let lMegRead=lMegContain1.getElementsByClassName("lMegRead")[0];
            if(lMegContain1 && lMegRead){
                let parent=lMegRead.parentElement;
                parent.removeChild(lMegRead);
            }else{
                let errMsg="lMegContain1DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

class ChatMoreOptionsDOM{
    static create(chatID){
        const chatOptionsSettings=Settings.ChatOptions;

        let chatMoreOptions=document.createElement("div");
        chatMoreOptions.className="chatMoreOptions";
        chatMoreOptions.dataset.id=chatID;
        chatMoreOptions.setAttribute("name", chatID);
    
        let chatContain=document.getElementById(chatID);
        let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
        let chatPined=lMegContain2.getElementsByClassName("chatPined")[0];
        let pin="Pin";
        if(chatPined){
            pin="Unpin";
        }
    
    
        let divChilds=[];
        if(chatOptionsSettings.selectChat){
            divChilds.push(["selectThisChat", "Select"]);
        }
        if(chatOptionsSettings.deleteChat){
            divChilds.push(["deleteThisChat", "Delete"]);
        }
        if(chatOptionsSettings.pinChat){
            divChilds.push(["pinThisChat", pin]);
        }


        divChilds.forEach(divChild => {
            let p=document.createElement("p");
            p.className=divChild[0];
            p.innerHTML=divChild[1];
            chatMoreOptions.appendChild(p);
        });
    
        ChatMoreOptionsDOM.onload(chatMoreOptions, chatID);
    
        return chatMoreOptions;
    }

    static append(chatID, chatMoreOptionsElem){

        chatID=ChatBody.makeChatIDUsable(chatID);
            
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            if(lMegContain2){
                lMegContain2.appendChild(chatMoreOptionsElem);
            }else{
                let errMsg="lMegContain2DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID){

        chatID=ChatBody.makeChatIDUsable(chatID);

        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatMoreOptions=lMegContain2.getElementsByClassName("chatMoreOptions")[0];
            if(lMegContain2 && chatMoreOptions){
                let parent=chatMoreOptions.parentElement;
                parent.removeChild(chatMoreOptions);
            }else{
                let errMsg="lMegContain2DOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }else{
            let errMsg="chatContainDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static onload(chatMoreOptionsElem, chatID){
        let selectChatOption=chatMoreOptionsElem.getElementsByClassName("selectThisChat")[0];
        let deleteChatOption=chatMoreOptionsElem.getElementsByClassName("deleteThisChat")[0];
        let pinChatOption=chatMoreOptionsElem.getElementsByClassName("pinThisChat")[0];
    
        
        if(selectChatOption){
            selectChatOption.addEventListener("click", ChatOptions.selectThisChat);
        }
        if(deleteChatOption){
            if(!ChatFuncs.chatIsDeleting(chatID)){
                deleteChatOption.addEventListener("click", ChatOptions.deleteThisChat);
            }else{
                ChatMoreOptionsDOM.makeOptionUclickale(0,0,deleteChatOption)
            }
        }
        if(pinChatOption){
            if(!ChatFuncs.chatIsPinning(chatID)){
                pinChatOption.addEventListener("click", ChatOptions.pinThisChat);
            }else{
                ChatMoreOptionsDOM.makeOptionUclickale(0,0,pinChatOption)
            }
        }
    }

    static makeOptionUclickale(chatID, option, elem){
        if(!elem){
            const options={
                "sel":"selectThisChat",
                "del":"deleteThisChat",
                "pin":"pinThisChat",
            }
            chatID=ChatBody.makeChatIDUsable(chatID);
    
            let chatContain=document.getElementById(chatID);
            if(!chatContain){
                let errMsg="chatContainDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
    
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatMoreOptions=lMegContain2.getElementsByClassName("chatMoreOptions")[0];
            if(!chatMoreOptions){
                return;
            }
    
            elem=chatMoreOptions.getElementsByClassName(options[option])[0];
        }

        if(elem){
            elem.classList.add("processing");

            if(elem.classList.contains("selectThisChat")){
                elem.removeEventListener("click", ChatOptions.selectThisChat);
            }
            if(elem.classList.contains("deleteThisChat")){
                elem.removeEventListener("click", ChatOptions.deleteThisChat);
            }
            if(elem.classList.contains("pinThisChat")){
                elem.removeEventListener("click", ChatOptions.pinThisChat);
            }
        }
    }

    static makeOptionClickale(chatID, option, elem){
        if(!elem){
            const options={
                "sel":"selectThisChat",
                "del":"deleteThisChat",
                "pin":"pinThisChat",
            }
            chatID=ChatBody.makeChatIDUsable(chatID);
    
            let chatContain=document.getElementById(chatID);
            if(!chatContain){
                let errMsg="chatContainDOM not found";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode, false, true);
                if(errHandler){
                    console.log(errHandler);
                }
                return;
            }
    
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatMoreOptions=lMegContain2.getElementsByClassName("chatMoreOptions")[0];
            if(!chatMoreOptions){
                return;
            }
    
            elem=chatMoreOptions.getElementsByClassName(options[option])[0];
        }


        if(elem){
            elem.classList.remove("processing");
            
            if(elem.classList.contains("selectThisChat")){
                elem.addEventListener("click", ChatOptions.selectThisChat);
            }
            if(elem.classList.contains("deleteThisChat")){
                elem.addEventListener("click", ChatOptions.deleteThisChat);
            }
            if(elem.classList.contains("pinThisChat")){
                elem.addEventListener("click", ChatOptions.pinThisChat);
            }
        }
    }
}

class NoChatFoundDOM{
    static create(){
        let noChatFound=document.createElement("div");
        noChatFound.className="noChatFound";
        noChatFound.innerHTML="No chat found";

        return noChatFound;
    }

    static append(nochatFoundElem){
        const chatBody=DOMGetter.getChatBody();

        if(chatBody){
            chatBody.appendChild(nochatFoundElem);
        }else{
            let errMsg="chatBodyDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static delete(){
        ChatBodyDOM.clear();
    }
} 



export{
    ChatBodyDOM,
    ChatContainDOM,
    ChatPinedDOM,
    ChatCountDOM,
    LoadOlderChatsDOM,
    ChatSelectedIconDOM,
    ChatOnlineIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM,
    NoChatFoundDOM
}

