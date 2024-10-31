import{
    ChatApis
} from "../_apis/chatApis.js";

import{
    Settings
} from "../_settings/settings.js";

import{
    DOMGetter,
    GlobalVars
} from "../msgPage/others/globalVariables.js";

import{
    MyCodeErr
} from "../_errorHandler/errorHandler.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";


import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";

import{
    ChatsDB
} from "../_tempDatabase/chats.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
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
} from "../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    UpdateChatDOM
} from "../DOM/msgPageDOM/chatDOM/updateChatBody.js";

import{
    UpdateMsgDOM
} from "../DOM/msgPageDOM/msgDOM/updateMsgBody.js";

import{
    MyProfile,
    ProfilesDB
} from "../_tempDatabase/profile.js";

import{
    ChatDOMFunc
} from "../DOM/msgPageDOM/chatDOM/DOMfunc.js";

import{
    ChatGroupActivations
} from "../msgPage/chat/chatGroupActivations.js";




class ChatFuncs{    
    
    static async fetchChats(getAllChats=false){
        //api to start populate local database
        // console.log(Object.keys(ChatsDB.chats).length);
        if(!getAllChats){
            //dot fetch if chats are avail
            if(Object.keys(ChatsDB.chats).length){
                return;
            }
        }else{
            //dot fetch if gotAllChats
            if(ChatsDB.gotAllChats){
                return;
            }
        }

        const result=await ChatApis.fetchChats(getAllChats);
        

        if(!result["chats"]){
            alert("err");
            console.log("err");
            return;
        }

        const chatPerLoad=Settings.ApiSettings.chatsPerAPICall;

        const chats=result["chats"];
        const profiles=result["profiles"];

        if(getAllChats){
            ChatsDB.gotAllChats=true;
        }
        
        if(chats.length<chatPerLoad && !getAllChats){
            //chang got allChat to true
            ChatsDB.gotAllChats=true;
        }

        chats.forEach(chat => {
            ChatsDB.addChat(chat);
            // console.log(chat.chatID)
        });
        profiles.forEach(profile => {
            ProfilesDB.addProfile(profile);
        });
    }

    static async fetchChatByID(chatID){

        const result=await ChatApis.fetchChatByID(chatID);
        

        if(!result["chats"]){
            alert("err");
            console.log("err");
            return;
        }

        let chats=result["chats"];
        let profiles=result["profiles"];
    
        let chat=chats[0];
        let profile=profiles[0];

        ProfilesDB.addProfile(profile);

        let chatInstance=ChatsDB.addChat(chat);

        if(!ChatFuncs.isInSearchMode()){
            if(!ChatContainDOM.getAllChatContains()[0]){
                return;
            }
            ChatDOMFunc.putChatContainElemInPosition(ChatContainDOM.create(chatInstance))
        }
    }

    static async fetchOlderChats(){
        if(ChatFuncs.gotAllChatsFromDB()){
            LoadOlderChatsDOM.delete();
            ChatFuncs.pushInFetchedChat(true);
            return;
        }

        const getOlderChat=DOMGetter.getGetOlderChat();
        // console.log(getOlderChat);
        LoaderBackgroundDOM.append(getOlderChat, LoaderBackgroundDOM.create());
        ContentLoaderDOM.append(getOlderChat, ContentLoaderDOM.create(true, "boxes"));


        const chatPerLoad=Settings.ApiSettings.chatsPerAPICall;
    
        let chatsCount=ChatFuncs.getChatsCount();
        let chatContainerCount=ChatContainDOM.getCountChatContains();
        if(chatsCount>=chatContainerCount+chatPerLoad){
            LoadOlderChatsDOM.delete();

            ChatFuncs.pushInFetchedChat(true);
            return;
        }
    
        let numberOfChatToFetch=(chatPerLoad*2)+chatsCount;

        const result=await ChatApis.fetchOlderChats(numberOfChatToFetch);

        if(!result["chats"]){
            alert("err");
            console.log("err");
            return;
        }

        let chats=result["chats"];
        let profiles=result["profiles"];

        
        if(chats.length<numberOfChatToFetch){
            //chang got allChat to true
            ChatsDB.gotAllChats=true;
        }
        chats.forEach(chat => {
            if(!ChatFuncs.chatObjIsAvailable(chat.chatID)){
                ChatsDB.addChat(chat);
                // console.log(chat.chatID)
            }
        });
        profiles.forEach(profile => {
            if(!ProfilesDB.profileObjIsAvailable(profile.userID)){
                ProfilesDB.addProfile(profile);
            }
        });



        // LoadOlderChatsDOM.delete();

        // ChatFuncs.pushInFetchedChat(true);
    }
    
    
    static pushInFetchedChat(loadOlderChats=false){
        const chatPerLoad=Settings.ApiSettings.chatsPerAPICall;
        let rearrangeChat=ChatsDB.sortedChats;
        // console.log(rearrangeChat);
        // return;
        let index=0;
        let chatPerLoadIndex=0; // loadOlderChatsIndex or nornal index
        while(index<rearrangeChat.length && chatPerLoadIndex<chatPerLoad){
            let chatInstance=rearrangeChat[index];
            if(loadOlderChats){
                let chatID=chatInstance.chatID;
                chatID=ChatBody.makeChatIDUsable(chatID);
                let chatContainer=document.getElementById(chatID);
                if(!chatContainer){
                    // ChatContainDOM.append(ChatContainDOM.create(chatInstance));
                    // ChatDOMFunc.putChatContainElemInPosition(chatID, true);
                    ChatDOMFunc.putChatContainElemInPosition(chatInstance);
                    chatPerLoadIndex++;
                }

            }else{
                // console.log(
                //     chatInstance.name, 
                //     chatInstance.sortTime,
                //     chatInstance.lastMsgObj.timeSent,
                // )

                let containElem=ChatContainDOM.create(chatInstance);

                if(ChatFuncs.getIsSelectingChats()){
                    ChatGroupActivations.allChatSelected(containElem);
                }
                ChatContainDOM.append(containElem);
                chatPerLoadIndex++;
            }
            index++;
        }
        // rearrangeChat.forEach(chatInstance => {
        //     // console.log(chatInstance);
        //     ChatContainDOM.append(ChatContainDOM.create(chatInstance));
        // });



        let chatsCount=ChatFuncs.getChatsCount();
        let chatContainerCount=ChatContainDOM.getCountChatContains();
        // console.log(
        //     chatsCount,
        //     chatContainerCount
        // )
        if(chatsCount-chatContainerCount){
            LoadOlderChatsDOM.append(LoadOlderChatsDOM.create());
        }
        // LoadOlderChatsDOM.append(LoadOlderChatsDOM.create());
    }
    
    static deleteChat(chatID){
        // console.log(chatID);
        
        if(ChatsDB.deleteChat(chatID)){
            UpdateChatDOM.deleteChatElem(chatID);
        }
    }
    
    static updateChatImage(chatID){
        // ChatsDB.setChatImage(chatID, imgSrc);
    
        UpdateChatDOM.imageElem(chatID);
    }
    
    static updateChatName(chatID){
        // ChatsDB.setChatName(chatID, name);
    
        UpdateChatDOM.nameElem(chatID);
    }
    
    static updateChatUnreadMsgCount(chatID){    
        UpdateChatDOM.chatCountElem(chatID);
    }
    
    static updateChatPinedStatus(chatID, pined, pinedTime=Date.parse(new Date)){        
        ChatsDB.setChatPinedStatus(chatID, pined, pinedTime);
        
        UpdateChatDOM.pinedElem(chatID);
    }
        
    static updateChatLastMsgObj(chatID, lastMsgObj){
        ChatsDB.setChatLastMsgObj(chatID, lastMsgObj);
        
        UpdateChatDOM.lMegElem(chatID);
    }

    static updateChatLastSeen(chatID){   
        // ChatsDB.setChatLastSeen(chatID, lastSeen);
        
        UpdateMsgDOM.messageHeadLastSeenElem(chatID);

        //update chatContainer online notifier
        UpdateChatDOM.chatOnlineElem(chatID);
    }

    static getActiveChat(){
        return ChatsDB.activeChat;
    }

    static getChatObj(chatID){
        return ChatsDB.getChatObj(chatID);
    }

    static getChatLastMsgObj(chatID){
        return ChatsDB.getChatLastMsgObj(chatID);
    }

    static getChatLastSeen(chatID){
        // console.log(chatID_DB);
        return ChatsDB.getChatLastSeen(chatID);
    }

    static getChatLastSeenString(chatID){
        // console.log(chatID);
        return ChatsDB.getChatLastSeenString(chatID);
    }

    static setActiveChat(activeChat){
        ChatsDB.activeChat=activeChat;
    }

    static isActiveChat(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        // console.log(ChatsDB.activeChat);
        return chatID_DB==ChatsDB.activeChat;
    }

    static recieverIsOnline(chatID){
        return ChatsDB.recieverIsOnline(chatID);
    }

    static chatObjIsAvailable(chatID){
        return ChatsDB.chatObjIsAvailable(chatID);
    }

    static gotAllChatsFromDB(){
        return ChatsDB.gotAllChats;
    }

    static getChatsCount(){
        return ChatsDB.chatsCount;
    }

    static getIsSelectingChats(){
        return ChatsDB.isSelectingChats;
    }

    static setIsSelectingChats(value){
        ChatsDB.isSelectingChats=value;
    }

    static setSearchingMode(value){
        ChatsDB.searchingChats=value;
    }

    static setChatIsPinning(chatID, isPinning){
        // console.log(chatID_DB);
        ChatsDB.setChatIsPinning(chatID, isPinning);
    }

    static setChatIsDeleting(chatID, isDeleting){
        ChatsDB.setChatIsDeleting(chatID, isDeleting);
    }

    static chatIsPinning(chatID){
        // console.log(chatID);
        return ChatsDB.chatIsPinning(chatID);
    }

    static chatIsDeleting(chatID){
        // console.log(chatID);
        return ChatsDB.chatIsDeleting(chatID);
    }

    static isInSearchMode(){
        return ChatsDB.searchingChats;
    }

    static delChatSignal(){

    }
}




export{
    ChatFuncs
}