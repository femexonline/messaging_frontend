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


class ChatSearchDOM{
    static create(){
        let chatSearch=document.createElement("div");
        chatSearch.id="chatSearch";
    
        let div=document.createElement("div");
    
        let chatSearchBack=document.createElement("span");
        chatSearchBack.id="chatSearchBack";
        chatSearchBack.className="material-icons flexCenter";
        chatSearchBack.innerHTML="search";
        div.appendChild(chatSearchBack);
    
    
        let subDiv=document.createElement("div");
        let chatSearchInputP=document.createElement("div");
        chatSearchInputP.className="chatSearchInput placeholder";
        chatSearchInputP.innerHTML="Serach for chats";
        subDiv.appendChild(chatSearchInputP);
        let chatSearchInput=document.createElement("div");
        chatSearchInput.className="chatSearchInput";
        chatSearchInput.setAttribute("contentEditable", "true");
        subDiv.appendChild(chatSearchInput);
    
        div.appendChild(subDiv);
    
    
        let chatSearchClear=document.createElement("span");
        chatSearchClear.id="chatSearchClear";
        chatSearchClear.className="material-icons flexCenter hide";
        chatSearchClear.innerHTML="close";
        div.appendChild(chatSearchClear);
    
        chatSearch.appendChild(div);
    
        let chatSearchClose=document.createElement("span");
        chatSearchClose.className="material-icons flexCenter chatSearchClose";
        chatSearchClose.innerHTML="close";
        chatSearch.appendChild(chatSearchClose);
    
        let chatSearchElemArray={
            "chatSearch":chatSearch,
            "chatSearchClose":chatSearchClose
        }
        OnloadActivations.chatSearchElem(chatSearchElemArray);
    
    
        return chatSearch;
    }
    
    static append(chatSearchElem){
        const chat=DOMGetter.getChat();
        const chatBody=DOMGetter.getChatBody();
    
        if(chat && chatBody){
            chat.insertBefore(chatSearchElem, chatBody);
        }else{
            let errMsg="counl not get required elements";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    static delete(){
        const chatSearch=DOMGetter.getChatSearch();
    
        if(chatSearch){
            let parent=chatSearch.parentNode;
            parent.removeChild(chatSearch);
        }else{
            let errMsg="counl not get chatSearchElem";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}


export{
    ChatSearchDOM
}