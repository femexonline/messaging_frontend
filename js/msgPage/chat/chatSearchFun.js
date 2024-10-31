import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    ChatSearchDOM
} from "../../DOM/msgPageDOM/chatDOM/chatSearchDOM.js";

import{
    ChatsDB
} from "../../_tempDatabase/chats.js";

import{
    ChatFuncs
} from "../../_tempDatabase/chatsFunc.js";

import{
    ChatBodyDOM,
    ChatContainDOM,
    ChatPinedDOM,
    ChatCountDOM,
    ChatSelectedIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM,
    NoChatFoundDOM
} from "../../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    MsgSectionDOM
} from "../../DOM/msgPageDOM/msgDOM/messageSection.js";

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

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";




class Private{
    static chatSearchBackFunc(){
        const chatSearch=DOMGetter.getChatSearch();
        const chatSearchBack=DOMGetter.getChatSearchBack();
        const chatSearchClear=DOMGetter.getChatSearchClear()
        const chatSearchClose=chatSearch.getElementsByClassName("chatSearchClose")[0];
        const chatSearchInput=chatSearch.getElementsByClassName("chatSearchInput")[1];
    
        chatSearch.classList.remove("typingFocus");
        chatSearchBack.classList.remove("arrow_back");
        chatSearchClose.classList.remove("hide");
    
        setTimeout(() => {
            chatSearchBack.innerHTML="search";
        }, 50);
    
        chatSearchBack.removeEventListener("click", Private.chatSearchBackFunc);
        chatSearchClear.removeEventListener("click", Private.chatSearchClearFunc);
        chatSearchInput.removeEventListener("keyup", Private.chatSearchInputTyping);
        chatSearch.addEventListener("click", ChatSearchFunc.clickChatSearchFunc);
    
        Private.chatSearchClearFunc();
    }

    static pushInMatchedChat(chats, rejex){
        //sort by name alphabetically
        chats=Object.values(chats).sort((a,b)=>a.name - b.name);
        // console.log(chats);

        //try color the matched expression

        chats.forEach(chatInstance => {
            // console.log(chatInstance);
            ChatContainDOM.append(ChatContainDOM.create(chatInstance));
        });
    }
    
    static chatSearchInputTyping(event){
        const chatSearchClear=DOMGetter.getChatSearchClear()
        const chatBodyElem=DOMGetter.getChatBody()
        let input=event.target;
        let placeH=input.previousElementSibling;

        //bug fix:when the search  box is clear, <br> enters
        if(input.innerHTML=="<br>"){
            input.innerHTML="";
        }
    
        if(input.innerHTML){
            ChatFuncs.setSearchingMode(true);
            //clear mag section if available
            if(DOMGetter.getMessageHead()){
                MsgSectionDOM.clear(true);
            }

            placeH.classList.add("hide");
            chatSearchClear.classList.remove("hide");

            if(!ChatsDB.gotAllChats){
                //show chats loadig
                LoaderBackgroundDOM.append(chatBodyElem, LoaderBackgroundDOM.create(true));
                ContentLoaderDOM.append(chatBodyElem, ContentLoaderDOM.create(true, "boxes", true))
                //search chats
                ChatFuncs.fetchChats(true);
            }

            ChatBodyDOM.clear();


            let rejex=new RegExp(`\^${input.innerHTML}`);
            let chats=ChatsDB.getChatsAsArr();
            // console.log(chats);
            // console.log(rejex);
            // console.log(input.innerHTML);
            chats=chats.filter((chat)=>{
                let contains;
                let name=chat.name;
                let names=name.split(" ");
                names.forEach(name => {
                    contains=contains||rejex.test(name);
                    // console.log(rejex.test(name));
                });
                // console.log(chat.name);
                // console.log(names);
                return contains;
            });
            // console.log(chats);
            if(chats[0]){
                //display matched chat
                Private.pushInMatchedChat(chats, rejex);
            }else{
                //display no chat msg
                NoChatFoundDOM.append(NoChatFoundDOM.create());
            }
        }else{
            placeH.classList.remove("hide");
            chatSearchClear.classList.add("hide");

            ChatBodyDOM.clear();
            ChatFuncs.pushInFetchedChat();
            ChatFuncs.setSearchingMode(false);
        }
    }
    
    static chatSearchClearFunc(){
        const chatSearch=DOMGetter.getChatSearch();
        const chatSearchClear=DOMGetter.getChatSearchClear()
        const chatSearchInputP=chatSearch.getElementsByClassName("chatSearchInput")[0];
        const chatSearchInput=chatSearch.getElementsByClassName("chatSearchInput")[1];
    
        const hasChatSearchInput=chatSearchInput.innerHTML;

        chatSearchInput.innerHTML="";
        chatSearchInputP.classList.remove("hide");
        chatSearchClear.classList.add("hide");



        if(hasChatSearchInput){
            // console.log("ffff")
            ChatBodyDOM.clear();
            ChatFuncs.pushInFetchedChat();
        }
        ChatFuncs.setSearchingMode(false);
    }
}


class ChatSearchFunc{
    static clickChatSearchFunc(event){
        let target=event.target;
        let id=target.id=="chatSearchBack";
        let c=target.innerHTML;
        if(c=="arrow_back"){id=false}
        let isClass=target.classList.contains("chatSearchInput");
    
        if(id || isClass){
            const chatSearch=DOMGetter.getChatSearch();
            const chatSearchBack=DOMGetter.getChatSearchBack();
            const chatSearchClear=DOMGetter.getChatSearchClear()
            const chatSearchClose=chatSearch.getElementsByClassName("chatSearchClose")[0];
            const chatSearchInput=chatSearch.getElementsByClassName("chatSearchInput")[1];
    
            chatSearch.classList.add("typingFocus");
            chatSearchBack.classList.add("arrow_back");
            chatSearchClose.classList.add("hide");
    
            chatSearchBack.innerHTML="arrow_back";
            chatSearchBack.addEventListener("click", Private.chatSearchBackFunc);
            chatSearchClear.addEventListener("click", Private.chatSearchClearFunc);
            chatSearchInput.addEventListener("keyup", Private.chatSearchInputTyping);
            chatSearch.removeEventListener("click", ChatSearchFunc.clickChatSearchFunc);
        }
    }
    
    
    static chatSearchCloseFunc(){
        const chatHeadSearchChat=DOMGetter.getChatHeadSearchChat();
    
        ChatSearchDOM.delete();
        chatHeadSearchChat.classList.remove("hide");
    }
}


export{
    ChatSearchFunc
}