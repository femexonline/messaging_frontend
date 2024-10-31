class DOMGetter{
    static getPageSection(){const pageSection=document.getElementById("pageSection"); return pageSection;};
    static getLoaderBackgroundElem(elem){const loaderBackgroundElem=elem.getElementsByClassName("loaderBackground")[0]; return loaderBackgroundElem;};
    static getContentLoaderElem(elem){const contentLoaderElem=elem.getElementsByClassName("contentLoader")[0]; return contentLoaderElem;};
    static getMousePositionBody(){const mousePositionBody=document.getElementById("mousePositionBody"); return mousePositionBody;};
    static getShowProfilePicture(){const showProfilePicture=document.getElementById("showProfilePicture"); return showProfilePicture;};
    static getDeleteMessageOption(){const deleteMessageOption=document.getElementById("deleteMessageOption"); return deleteMessageOption;};
    static getDeleteChatOption(){const deleteChatOption=document.getElementById("deleteChatOption"); return deleteChatOption;};
    static getMsgInfoPopUp(){const msgInfoPopUp=document.getElementById("msgInfoPopUp"); return msgInfoPopUp;};
    static getChat(){const chat=document.getElementById("chat"); return chat;};
    static getChatMousePosBody(){const chatMousePosBody=document.getElementById("chatMousePosBody"); return chatMousePosBody;};
    static getChatHead(){const chatHead=document.getElementById("chatHead"); return chatHead;};
    static getChatHeadNormal(){const chatHeadNormal=document.getElementById("chatHeadNormal"); return chatHeadNormal;};
    static getChatChatMinimize(){const chatChatMinimize=document.getElementById("chatChatMinimize"); return chatChatMinimize;};
    static getChatHeadPix(){const chatHeadPix=document.getElementById("chatHeadPix"); return chatHeadPix;};
    static getChatHeadChat(){const chatHeadChat=document.getElementById("chatHeadChat"); return chatHeadChat;};
    static getChatHeadSearchChat(){const chatHeadSearchChat=document.getElementById("chatHeadSearchChat"); return chatHeadSearchChat;};
    static getChatHeadOthers(){const chatHeadOthers=document.getElementById("chatHeadOthers"); return chatHeadOthers;};
    static getChatHeadOthersOptions(){const chatHeadOthersOptions=document.getElementById("chatHeadOthersOptions"); return chatHeadOthersOptions;};
    static getChatHeadSelected(){const chatHeadSelected=document.getElementById("chatHeadSelected"); return chatHeadSelected;};
    static getChatHeadBack(){const chatHeadBack=document.getElementById("chatHeadBack"); return chatHeadBack;};
    static getChatHeadCount(){const chatHeadCount=document.getElementById("chatHeadCount"); return chatHeadCount;};
    static getChatHeadPin(){const chatHeadPin=document.getElementById("chatHeadPin"); return chatHeadPin;};
    static getChatHeadDelete(){const chatHeadDelete=document.getElementById("chatHeadDelete"); return chatHeadDelete;};
    static getChatHeadOthersS(){const chatHeadOthersS=document.getElementById("chatHeadOthersS"); return chatHeadOthersS;};
    static getChatSearch(){const chatSearch=document.getElementById("chatSearch"); return chatSearch;};
    static getChatSearchBack(){const chatSearchBack=document.getElementById("chatSearchBack"); return chatSearchBack;};
    static getChatSearchClear(){const chatSearchClear=document.getElementById("chatSearchClear"); return chatSearchClear;};
    static getChatBody(){const chatBody=document.getElementById("chatBody"); return chatBody;};
    static getGetOlderChat(){const getOlderChat=document.getElementById("getOlderChat"); return getOlderChat;};
    static getMessage(){const message=document.getElementById("message"); return message;};
    static getShowChatBox(){const showChatBox=document.getElementById("showChatBox"); return showChatBox;};
    static getMessageHead(){const messageHead=document.getElementById("messageHead"); return messageHead;};
    static getMessageHeadNormal(){const messageHeadNormal=document.getElementById("messageHeadNormal"); return messageHeadNormal;};
    static getMessageChatMaximize(){const messageChatMaximize=document.getElementById("messageChatMaximize"); return messageChatMaximize;};
    static getMessageHeadPix(){const messageHeadPix=document.getElementById("messageHeadPix"); return messageHeadPix;};
    static getMessageHeadOthers(){const messageHeadOthers=document.getElementById("messageHeadOthers"); return messageHeadOthers;};
    static getMessageHeadOthersOptions(){const messageHeadOthersOptions=document.getElementById("messageHeadOthersOptions"); return messageHeadOthersOptions;};
    static getMessageHeadSelected(){const messageHeadSelected=document.getElementById("messageHeadSelected"); return messageHeadSelected;};
    static getMessageHeadBack(){const messageHeadBack=document.getElementById("messageHeadBack"); return messageHeadBack;};
    static getMessageHeadCount(){const messageHeadCount=document.getElementById("messageHeadCount"); return messageHeadCount;};
    static getMessageHeadReply(){const messageHeadReply=document.getElementById("messageHeadReply"); return messageHeadReply;};
    static getMessageHeadDelete(){const messageHeadDelete=document.getElementById("messageHeadDelete"); return messageHeadDelete;};
    static getMessageHeadFoward(){const messageHeadFoward=document.getElementById("messageHeadFoward"); return messageHeadFoward;};
    static getMessageHeadCopy(){const messageHeadCopy=document.getElementById("messageHeadCopy"); return messageHeadCopy;};
    static getMessageHeadStar(){const messageHeadStar=document.getElementById("messageHeadStar"); return messageHeadStar;};
    static getMessageHeadInfo(){const messageHeadInfo=document.getElementById("messageHeadInfo"); return messageHeadInfo;};
    static getMessageHeadOthersS(){const messageHeadOthersS=document.getElementById("messageHeadOthersS"); return messageHeadOthersS;};
    static getMessageBody(){const messageBody=document.getElementById("messageBody"); return messageBody;};
    static getMsgSelectAChat(){const msgSelectAChat=document.getElementById("selectAChatW"); return msgSelectAChat;};
    static getLoadOlderMsgsBtn(){const loadOlderMsgsBtn=document.getElementById("loadOlderMsgsBtn"); return loadOlderMsgsBtn;};
    static getChatBox(){const chatBox=document.getElementById("chatBox"); return chatBox;};
    static getMsgDate(){const msgDate=document.getElementById("msgDate"); return msgDate;};
    static getCloseChatBox(){const closeChatBox=document.getElementById("closeChatBox"); return closeChatBox;};
    static getChatBoxTextMsg(){const chatBoxTextMsg=document.getElementById("chatBoxTextMsg"); return chatBoxTextMsg;};
    static getMsgToSend(){const msgToSend=document.getElementById("msgToSend"); return msgToSend;};
    static getMsgToBeReplyedID(){const msgToBeReplyedID=document.getElementById("msgToBeReplyedID"); return msgToBeReplyedID;};    
}

class GlobalVarsInstance{
    constructor(){
        this.selectedChatsID=[];
        this.selectedMessagesID=[];
        this.msgSenderTracking=[];
        this.msgstaredTracking=[];
        this.chatsAreSelected=null;
        
        
        this.megChatTouchedTimeOut=null;
        this.touchYPos=null;
        
        
        this.megBdScrlTop=null;
        this.msgDateTimeOutFunction=null;
    }
}

const GlobalVars=new GlobalVarsInstance();


export{
    DOMGetter,
    GlobalVars
}