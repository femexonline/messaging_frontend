import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";



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
    MsgOptions
} from "../../msgPage/message/messageOptions.js";

import{
    MsgGroupActivations
} from "../../msgPage/message/messageGroupActivations.js";

import{
    MsgGroupDeactivations
} from "../../msgPage/message/messageGroupDeactivations.js";

import{
    MessageFuncs
} from "../../_tempDatabase/messageFuncs.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";


import{
    MsgApis
} from "../../_apis/msgApis.js";



class MsgHeadSelecOpts{
    static replyMessages(){
        if(GlobalVars.selectedMessagesID.length>1){
            let errMsg="please select only one message";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        if(!GlobalVars.selectedMessagesID.length){
            let errMsg="no message selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        
        let msgID=GlobalVars.selectedMessagesID[0];
        MsgOptions.replyThisMessage(msgID);
    
        MsgGroupDeactivations.allSelected_Megchecked();
    
    
        // console.log("replyMessages");
        // alert("function not available yet");
    }
    
    static deleteMessages(){
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let chatMousePosBody=DOMGetter.getChatMousePosBody();
        let deleteMessageOption=DOMGetter.getDeleteMessageOption();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(chatMousePosBody){ChatMousePosBodyPopupDOM.delete();}
        if(deleteMessageOption){DeleteMessageOptionPopupDOM.delete();}
    
        if(!GlobalVars.selectedMessagesID.length){
            let errMsg="no message selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
    
        let DFE=false, delMsg=null;
        let senderClass="notYou";
        senderClass=GlobalVars.msgSenderTracking.indexOf(senderClass);
        if(senderClass <= -1){
            DFE=true;
        }
    
        if(GlobalVars.selectedMessagesID.length>1){
            delMsg="Delete "+GlobalVars.selectedMessagesID.length+" Messages?";
        }else{
            delMsg="Delete Message?";
        }
        DeleteMessageOptionPopupDOM.append(DeleteMessageOptionPopupDOM.create(delMsg, DFE));
        // deactivateMegSelectMoreOptions();
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ChatMousePosBodyPopupDOM.append(ChatMousePosBodyPopupDOM.create(MousePositionBodyElemRes));
        
        // console.log("deleteMessage");
        // alert("function not available yet");
    }
    
    static fowardMessages(){
        if(!GlobalVars.selectedMessagesID.length){
            let errMsg="no message selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        console.log("fowardMessages");
        alert("function not available yet");
    }
    
    static copyMessages(){
        if(!GlobalVars.selectedMessagesID.length){
            let errMsg="no message selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        console.log("copyMessages");
        alert("function not available yet");
    }
    
    static starMessages(){
        const chatID=ChatFuncs.getActiveChat();
        
        if(!GlobalVars.selectedMessagesID.length){
            let errMsg="no message selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }

        const apiMsgIDs=[...GlobalVars.selectedMessagesID];

        MsgGroupDeactivations.allSelected_Megchecked();


        MsgApis.starMsg(chatID, apiMsgIDs);            
    
        // console.log("starMessages");
        // alert("function not available yet");
    }
    
    static getMessagesInfo(){
        if(!GlobalVars.selectedMessagesID.length){
            let errMsg="no message selected";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        if(GlobalVars.selectedMessagesID.length>1){
            let errMsg="please select only one message";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode, true);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let msgID=GlobalVars.selectedMessagesID[0];
        MsgOptions.getThisMessageInfo(msgID);
    
        MsgGroupDeactivations.allSelected_Megchecked();
    
        // console.log("getMessagesInfo");
        // alert("function not available yet");
    }
    
    static activateMessageHeadOthersS(){
        console.log("activateMessageHeadOthersS");
        alert("function not available yet");
    }
}



export{
    MsgHeadSelecOpts
}