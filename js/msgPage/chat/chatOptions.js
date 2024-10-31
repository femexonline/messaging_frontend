import{
    Settings
} from "../../_settings/settings.js";

import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";


import{
    ChatApis
} from "../../_apis/chatApis.js";


import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import {
    ChatBody
} from "../../msgPage/chat/chatBody.js";

import{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";

import{
    ChatGroupActivations
} from "../../msgPage/chat/chatGroupActivations.js";

import{
    ChatGroupDeactivations
} from "../../msgPage/chat/chatGroupDeactivations.js";

import{
    ChatBodyDOM,
    ChatContainDOM,
    ChatPinedDOM,
    ChatCountDOM,
    ChatSelectedIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM
} from "../../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";






class ChatOptions{
    static selectThisChat(event){
        const chatHeadCount=DOMGetter.getChatHeadCount();
    
        let chatID=event.path[1].dataset["id"];
        let currentSelectChatOption=event.target;
        let chatContain=document.getElementById(chatID);
        let chatSelect=chatContain.getElementsByClassName("chatSelect")[0];
        let chatExpandMore=event.path[1].previousElementSibling;
    
        if(chatSelect){ChatSelectedIconDOM.delete(chatID);}
    
        currentSelectChatOption.removeEventListener("click", ChatOptions.selectThisChat);
    
        ChatGroupActivations.allChatSelected();
        ChatGroupDeactivations.chatExpandMoreOptions();
    
        chatContain.style.background="#F5F5F5";
        ChatSelectedIconDOM.append(chatID, ChatSelectedIconDOM.create());
        chatExpandMore.style.display="none";
    
        ChatBody.emptySelectedChatsID();
        if(!ChatBody.updateSelectedChatsID(chatID)){
            let errMsg="Fatal error";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        chatHeadCount.innerHTML=GlobalVars.selectedChatsID.length;
    }
    
    //this might neer be used
    static deleteThisChat(event){
        const chatOptionsSettings=Settings.ChatOptions;
        if(!chatOptionsSettings.deleteChat){
            let errMsg="action not allowed";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let chatMousePosBody=DOMGetter.getChatMousePosBody();
        let deleteChatOption=DOMGetter.getDeleteChatOption();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
        if(deleteChatOption){DeleteChatOptionPopupDOM.delete();}
    
        ChatGroupDeactivations.chatExpandMoreOptions();
        
        let chatID=event.path[1].dataset["id"];
    
        ChatBody.emptySelectedChatsID();
    
        ChatBody.updateSelectedChatsID(chatID);
    
        let delMsg="Delete this Chat?";
        DeleteChatOptionPopupDOM.append(DeleteChatOptionPopupDOM.create(delMsg));
    
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
    
        // console.log("deleteThisChat");
        // alert("function not available yet");
    }
    
    static pinThisChat(event){
        const chatOptionsSettings=Settings.ChatOptions;
        if(!chatOptionsSettings.pinChat){
            let errMsg="action not allowed";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        
        ChatGroupDeactivations.chatExpandMoreOptions();    

        let chatID=event.path[1].dataset["id"];
        let apiChatIDs=[chatID];
        
        ChatApis.pinChat(apiChatIDs);
    }
    
    
    
    
    
    static deleteChat(group=false){
        let apiChatIDs=[...GlobalVars.selectedChatsID];
    
        if(group){
            ChatGroupDeactivations.allChatSelected();
        }

        ChatApis.deleteChat(apiChatIDs);
    }
    
    static onclickDeleteChat(){
        let chatHeadSelected=DOMGetter.getChatHeadSelected();
    
        ChatOptions.cancleChatDelete();
        if(chatHeadSelected.style.display!="flex"){
            ChatOptions.deleteChat();
        }else{
            ChatOptions.deleteChat(true);
        }
    }
    
    static cancleChatDelete(event){
        let chatMousePosBody=DOMGetter.getChatMousePosBody();
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let deleteChatOption=DOMGetter.getDeleteChatOption();
    
        let continu=true;
        if(event){
            continu=false;
            let id=event.target.id;
            if(id){
                if(id=="deleteChatOption"){
                    continu=true;
                }
            }
            let classNa=event.target.classList;
            if(classNa){
                if(classNa.contains("C")){
                    continu=true;
                }
            }
        }
        if(continu){
            if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
            if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
            if(deleteChatOption){DeleteChatOptionPopupDOM.delete();}
        }
    }
}



export{
    ChatOptions
}