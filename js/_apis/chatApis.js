import{
    Settings
} from "../_settings/settings.js";

import{
    MyCodeErr
} from "../_errorHandler/errorHandler.js";


import{
    DOMGetter,
    GlobalVars
} from "../msgPage/others/globalVariables.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";

import{
    GenerateAPIRes
} from "../_tempDatabase/_dummyAPIResponse.js";

import{
    ChatsDB
} from "../_tempDatabase/chats.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
    ChatFuncs
} from "../_tempDatabase/chatsFunc.js";

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
    ChatGroupDeactivations
} from "../msgPage/chat/chatGroupDeactivations.js";

import{
    MsgSectionDOM
} from "../DOM/msgPageDOM/msgDOM/messageSection.js";







class ChatApis{
    static async fetchChats(getAllChats){
        //loader here
        //if getAllChat, loader should cover oly chatody


        //api to start populate local database
        // console.log(Object.keys(ChatsDB.chats).length);


        /*sends out
            -chatPerLoad
        */
    
        /*get
            -chatPerLoad chats and profiles
            chats are sorted on the backend according to lastMsg time
        */
       const chatPerLoad=Settings.ApiSettings.chatsPerAPICall;
       let chatids; //not important in live environ
        if(!getAllChats){
            //fetch chats normal
            chatids=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
        }else{
            //get all chat
            chatids=[
                1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,91,
                98,73,45,46,4626,23,26,267,121,65,684,48,84,374,845,894,487,90,37
            ];
        }
        
        let chatsAndProfiles=await GenerateDummyDatabase.chatsAndProfiles(chatids);  //should await
        
        return chatsAndProfiles;        
    }
    
    static async fetchChatByID(chatID){

        /*get
            -chatPerLoad chats and profiles
            chats are sorted on the backend according to lastMsg time
        */
       const ChatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
       let chatids=[ChatID_DB];
        
        const chatsAndProfiles=await GenerateDummyDatabase.chatsAndProfiles(chatids);

        return chatsAndProfiles;
    }
    
    static async fetchOlderChats(numberOfChatToFetch){    
        /*sends out
            -numberOfChatToFetch
        */
    
        /*get
            -numberOfChatToFetch chats and profiles
        */
    
        let chatids=[
            1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
            111,112,113,114,115,116,117,118,119,1110,1111,1112,1113,
            1114,1115,1116,1117,1118,1119,1120,
        ];
        let chatsAndProfiles=await GenerateDummyDatabase.chatsAndProfiles(chatids, true);
        
        return chatsAndProfiles;
    }

    static deleteChat(apiChatIDs){      
        let chatIDsToSend=[];

        apiChatIDs.forEach(chatID=>{
            if(ChatFuncs.chatIsDeleting(chatID)){
                return;
            }
            ChatFuncs.setChatIsDeleting(chatID, true);
            ChatContainDOM.makeUnselectable(chatID);
            ChatMoreOptionsDOM.makeOptionUclickale(chatID, "del");

            let apiObj={
                "chatID":ChatBody.makeChatID_DB_Usable(chatID),
                "lastMsgID":ChatFuncs.getChatLastMsgObj(chatID).msgID
            }
            chatIDsToSend.push(apiObj);
        })

        if(!chatIDsToSend.length){
            console.log("err");
            return;
        }

        //api call
        /*should contain array of object of chatID and lastMsgID
            [
                {chatID, lastMsgID}
            ]
        */
        /*result should contain array of object of chatID and del status
            [
                {chatID, isDeleted}
            ]
        */

        let apiResult=GenerateAPIRes.deleteChatRes(chatIDsToSend);

        if(apiResult){
            ApiSuccess.deleteChat(apiResult);
        }else{
            ApiFail.deleteChat(chatIDsToSend);
        }
    }

    static pinChat(apiChatIDs){
        /*apiResult should contain array of object of chatID, pinStatus and pinedTime
            [
                {chatID, pinStatus, pinedTime}
            ]
        */
        /*apiResult should send array of chatID
            [chatID]
        */
       
       let chatIDsToSend=[];
        
        apiChatIDs.forEach(chatID => {
            if(ChatFuncs.chatIsPinning(chatID)){
                return;
            }
            ChatFuncs.setChatIsPinning(chatID, true);
            ChatMoreOptionsDOM.makeOptionUclickale(chatID, "pin");
            chatIDsToSend.push(ChatBody.makeChatID_DB_Usable(chatID));
        });

        if(!chatIDsToSend.length){
            console.log("err");
            return;
        }

         
        //api call
        //recieve an array containing all chatID and pinne
        let apiResult=GenerateAPIRes.pinChatRes(chatIDsToSend);

        if(apiResult){
            ApiSuccess.pinChat(apiResult);
        }else{
            ApiFail.pinChat(chatIDsToSend);
        }
    }
}




class ApiSuccess{
    static deleteChat(apiResult){  
        /*apiResult should contain array of object of chatID and del status
            [
                {chatID, isDeleted}
            ]
        */
        apiResult.forEach(result=>{
            if(result["isDeleted"]){
                let chatID=result["chatID"];
                ChatFuncs.deleteChat(chatID);

                if(ChatFuncs.isActiveChat(chatID)){
                    MsgSectionDOM.clear(true);
                }
            }else{
                let chatID=result["chatID"];
                ChatFuncs.setChatIsDeleting(chatID, false);
                ChatContainDOM.makeSelectable(chatID);
                ChatMoreOptionsDOM.makeOptionClickale(chatID, "del");
                alert("chat not deleted");
                console.log("chat not deleted");
            }
        })
    }

    static pinChat(apiResult){
        /*apiResult should contain array of object of chatID, pinStatus and pinedTime
            [
                {chatID, pinStatus, pinedTime}
            ]
        */
        
        //api call
        //recieve an array containing all chatID and pinne
        apiResult.forEach(result => {
            let chatID=result["chatID"];
            let pinedTime=result["pinedTime"];
            let pinne=result["pinStatus"];

            ChatFuncs.setChatIsPinning(chatID, false);
            ChatMoreOptionsDOM.makeOptionClickale(chatID, "pin");

            //action after reciving resukt
            ChatFuncs.updateChatPinedStatus(chatID, pinne, pinedTime);
        });        
    }
}


class ApiFail{
    static deleteChat(chatIDsToSend){  
        chatIDsToSend.forEach(chatID=>{
            chatID=chatID["chatID"];

            ChatFuncs.setChatIsDeleting(chatID, false);
            ChatContainDOM.makeSelectable(chatID);
            ChatMoreOptionsDOM.makeOptionClickale(chatID, "del");
        })

        let errMsg="Poor internet connection";
        let errCode="";
        let errHandler=MyCodeErr.announce(errMsg, errCode);
        if(errHandler){
            console.log(errHandler);
        }
    }

    static pinChat(chatIDsToSend){
        chatIDsToSend.forEach(chatID => {
            ChatFuncs.setChatIsPinning(chatID, false);
            ChatMoreOptionsDOM.makeOptionClickale(chatID, "pin");
        });  

        let errMsg="Poor internet connection";
        let errCode="";
        let errHandler=MyCodeErr.announce(errMsg, errCode);
        if(errHandler){
            console.log(errHandler);
        }
    }
}




export{
    ChatApis
}




