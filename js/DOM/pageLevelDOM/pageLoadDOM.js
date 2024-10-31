import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";

import{
    MyProfile
} from "../../_tempDatabase/profile.js";

import{
    ChatSectionDOM
} from "../../DOM/msgPageDOM/chatDOM/chatSectionDOM.js";

import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MessageBodyDOM,
    MsgDateDOM,
    MsgWraperDOM,
    MsgSendingWraperDOM,
    DeletedMsgDOM,
    StarDOM,
    MsgMoreOptionsDOM,
    LoadOlderMsgsBtnDOM,
    SelectAChatDOM
} from "../../DOM/msgPageDOM/msgDOM/msgBodyDOM.js";




class PageLoadDOM{
    static async messagesPage(messagesPageContent){

        // /get profile
        await MyProfile.fetch();
        
        //api to start populate local database
        await ChatFuncs.fetchChats();
    
        //create and append sections
        const pageSection=DOMGetter.getPageSection();
        messagesPageContent.forEach(content => {
            pageSection.appendChild(content);
        });
    
        //load chat section
        ChatSectionDOM.load();
    
        //load chats
        ChatFuncs.pushInFetchedChat();

        SelectAChatDOM.append(SelectAChatDOM.create());
    }
}




export{
    PageLoadDOM
}