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

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";

import {
    ChatBody
} from "../../msgPage/chat/chatBody.js";

import{
    ChatGroupDeactivations
} from "../../msgPage/chat/chatGroupDeactivations.js";

import{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";




class ChatHeadSelecOpts{
    static pinChats(){
        const chatOptionsSettings=Settings.ChatOptions;
        if(!chatOptionsSettings.groupChatPin){
            let errMsg="action not allowed";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }


        if(!GlobalVars.selectedChatsID.length){
            let errMsg="no chat selected";
            alert(errMsg);
            console.log(errMsg);
            return;
        }

        let apiChatIDs=[...GlobalVars.selectedChatsID];

        ChatGroupDeactivations.allChatSelected();
        ChatBody.emptySelectedChatsID();

        ChatApis.pinChat(apiChatIDs);
    }
    
    static deleteChats(){
        const chatOptionsSettings=Settings.ChatOptions;
        if(!chatOptionsSettings.groupDelChat){
            let errMsg="action not allowed";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
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
    
        if(!GlobalVars.selectedChatsID.length){
            let errMsg="no chat selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let delMsg="Delete "+GlobalVars.selectedChatsID.length+" Chats?";
        DeleteChatOptionPopupDOM.append(DeleteChatOptionPopupDOM.create(delMsg));
    
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
    
    
    
        // console.log("deleteChats");
        // alert("function not available yet");
    }
    
    static activateChatHeadOthersS(){
        console.log("activateChatHeadOthersS");
        alert("function not available yet");
    }
}



export{
    ChatHeadSelecOpts
}