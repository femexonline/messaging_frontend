import{
    TimeFunctions
} from "../_timeFunc/timeFuncs.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
    MessagesDB
} from "../_tempDatabase/messages.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../_tempDatabase/messageFuncs.js";

import{
    MyProfile,
    ProfilesDB
} from "../_tempDatabase/profile.js";





class LastMsgInstance{
    /*
        chatsDB is an object of objects, with chat id as keys.
            lastMsgObj : object
            lastMsgObj contains:
                msgID
                lastMsg : var
                timeSent : int, time in miliseconds
                read : str eg: read, sent, deliverd
                isSender : bool
                timeSentString: chat time in string, ///generated on frontend
            ;
        ;

    */
    constructor(lastMsgObj){
        this._msgID=lastMsgObj["msgID"];
        this._lastMsg=lastMsgObj["lastMsg"];
        this._timeSent=lastMsgObj["timeSent"];
        this._read=lastMsgObj["read"];
        this._isSender=lastMsgObj["isSender"];
        this._timeSentString=TimeFunctions.generateTimeSentStringT1(lastMsgObj["timeSent"]);
        this._deletedText=lastMsgObj["deletedText"];
        if(!this._lastMsg){
            this._lastMsg=lastMsgObj["msg"];
        }
    }
    get msgID(){return this._msgID;}
    get lastMsg(){return this._lastMsg;}
    get timeSent(){return this._timeSent;}
    get read(){return this._read;}
    get isSender(){return this._isSender;}
    get timeSentString(){return this._timeSentString;}
    get deletedText(){return this._deletedText;}
    set msgID(value){}
    set lastMsg(value){this._lastMsg=value;}
    set timeSent(value){
        this._timeSent=value;
        this._timeSentString=TimeFunctions.generateTimeSentStringT1(value);
    }
    set read(value){this._read=value;}
    set isSender(value){this._isSender=value;}
    set timeSentString(value){}
    set deletedText(value){}

}

class ChatInstance{
    /*
        ChatInstance would contain:
            chatID : int
            profileID: int
            imgSrc : str
            name : str
            unreadMsgCount : int  // calculated on froontend
            pined:bool
            pinedTime:  int, time in miliseconds
            sortTime:int, time im miliseconds, or in PHP microseconds if pinned, ///generated on frontend
            lastSeen : int, time in miliseconds //updated when user click on chat
            lastSeenString: last seen time in string, ///generated on frontend
            recieverIsOnline:bool
            lastMsgObj : object
            lastMsgObj contains:
                msgID
                lastMsg : var
                timeSent : int, time in miliseconds
                read : str eg: read, sent, deliverd
                isSender : bool
                timeSentString: chat time in string, ///generated on frontend
            ;
            isPinning: bool //added to track api status
            isDeleting: bool //added to track api status
        ;
        *name, image and lastSeen are gotten from profile with profile id

    */
    
    /*
        chatObj object would contain:
            chatID : int
            profileID : int
            //imgSrc : str
            //name : str
            pined:bool
            pinedTime:  int, time in miliseconds
            //lastSeen : int, time in miliseconds
            lastMsgObj : object
            lastMsgObj contains:
                lastMsg : var
                timeSent : int, time in miliseconds
                read : str eg: read, sent, deliverd
                isSender : bool
            ;
        ;

    */
    
    constructor(chatObj){
        this._chatID=chatObj["chatID"];
        this._profileID=chatObj["profileID"];
        // this._imgSrc=chatObj["imgSrc"];
        // this._name=chatObj["name"];
        // this._unreadMsgCount=chatObj["unreadMsgCount"];
        this._pined=chatObj["pined"];
        this._pinedTime=chatObj["pinedTime"];        
        // this._lastSeen=null;
        if(chatObj["lastMsgObj"]){
            this._lastMsgObj=new LastMsgInstance(chatObj["lastMsgObj"]);
        }else{
            this._lastMsgObj=null;
        }
        this._isPinning=false;
        this._isDeleting=false;


        //save messages
        const messages=chatObj["messages"];
        const length=10;
        messages.forEach(msgObj => {
            // console.log(msgObj);
            MessagesDB.addMessage(chatObj["chatID"], msgObj, false);
            this._lastMsgObj=new LastMsgInstance(msgObj);
        });
        if(messages.length<length){
            MessagesDB.gotAllMsgsStatus[chatObj["chatID"]]=true;
        }
    }

    get chatID(){return this._chatID;}
    get profileID(){return this._profileID;}
    get imgSrc(){return ProfilesDB.getP_pix(this.profileID);}
    get name(){return ProfilesDB.getName(this.profileID);}
    get unreadMsgCount(){
        return UnseenMsgIDs.count(this.chatID);
    }
    get pined(){return this._pined;}
    get pinedTime(){return this._pinedTime;}
    get sortTime(){
        if(this.pinedTime){
            return this.pinedTime*1000;
        }else{
            if(this._lastMsgObj){
                return this._lastMsgObj.timeSent;
            }else{
                return 0;
            }
        }
    }
    get lastSeen(){return ProfilesDB.getLastSeen(this.profileID);}
    get recieverIsOnline(){return ProfilesDB.isOnline(this.profileID);}
    get lastSeenString(){
        if(this.lastSeen){
            if(this.lastSeen=="online"){
                return "online";
            }else{
                return TimeFunctions.generateTimeSentStringT1(this.lastSeen);
            }
        }else{
            return null;
        }
    }
    get lastMsgObj(){return this._lastMsgObj;}
    get isPinning(){
        if(this._isPinning){
            return true;
        }else{
            return false;
        }
    }
    get isDeleting(){
        if(this._isDeleting){
            return true;
        }else{
            return false;
        }
    }
    set chatID(value){}
    set profileID(value){}
    set imgSrc(value){
        // ProfilesDB.setP_pix(this.profileID, value);
    ;}
    set name(value){
        // ProfilesDB.setName(this.profileID, value);
    }
    set unreadMsgCount(value){}
    set pined(value){this._pined=value;}
    set pinedTime(value){
        this._pinedTime=value;
    }
    set sortTime(value){}
    set lastSeen(value){
        // ProfilesDB.setLastSeen(this.profileID, value);
    }
    set recieverIsOnline(value){}
    set lastSeenString(value){}
    set lastMsgObj(value){
        this._lastMsgObj=new LastMsgInstance(value);
    }
    set isPinning(value){
        if(value){
            this._isPinning=true;
        }else{
            this._isPinning=false;
        }
    }
    set isDeleting(value){
        if(value){
            this._isDeleting=true;
        }else{
            this._isDeleting=false;
        }
    }

    getChat(){
        return this;
    }
}


class ChatsDBInstance{
    constructor(){
        this._chats={
            //object containing ChatInstances, with chatIDs as keys
        };
        this._activeChat; //holds the active chat

        // this._chatsCount=0; //holds nummber of chats

        this._gotAllChats; //true if all chat is fetched

        this._searchingChats; //true if searching

        this._isSelectingChats; //true if selectig
    }

    get chats(){return this._chats;}
    get activeChat(){return this._activeChat;}
    get chatsCount(){
        let chats=this.getChatsAsArr();
        return chats.length;
    }
    get gotAllChats(){return this._gotAllChats;}
    get searchingChats(){return this._searchingChats;}
    get isSelectingChats(){return this._isSelectingChats;}
    set chats(value){}
    set activeChat(value){
        if(!value){
            this._activeChat=false;
        }
        this._activeChat=ChatBody.makeChatID_DB_Usable(value);
    }
    set chatsCount(value){}
    set gotAllChats(value){
        if(value===true || value==="true"){
            this._gotAllChats=true;
        }
    }

    set searchingChats(value){
        if(value===true || value==="true"){
            this._searchingChats=true;
        }else{
            this._searchingChats=false;
        }
    }

    set isSelectingChats(value){
        if(value===true || value==="true"){
            this._isSelectingChats=true;
        }else{
            this._isSelectingChats=false;
        }
    }

    addChat(chatObj){
        if(this.chats[chatObj.chatID]){
            return this.chats[chatObj.chatID];
        }
        this._chats[chatObj.chatID]=new ChatInstance(chatObj);
        // console.log(chatObj.chatID);
        return this.chats[chatObj.chatID];
    }
    
    deleteChat(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        delete(this.chats[chatID_DB]);

        if(!this.chats[chatID_DB]){
            MessagesDB.deleteChat(chatID_DB);
            return true;
        }else{
            return false;
        }
    }
    

    get sortedChats(){
        return Object.values(this.chats).sort((a,b)=>b.sortTime - a.sortTime);
    }
    set sortedChats(value){}

    getNextDBChatID(chatID, getNextAvailOnDOM=false){
        chatID=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID);
        let rearrangeChat=this.sortedChats;
        let index=0, foundPos=false, nextID=-1;
        while(index < rearrangeChat.length && !foundPos){
            if(rearrangeChat[index]["chatID"]==chatID){
                foundPos=true;
                nextID=-2;
                if(getNextAvailOnDOM){
                    let subIndex=index+1, subFOund=false;
                    while(subIndex < rearrangeChat.length && !subFOund){
                        let chaID=rearrangeChat[subIndex]["chatID"];
                        chaID=ChatBody.makeChatIDUsable(chaID);
                        let elem=document.getElementById(chaID);
                        if(elem){
                            subFOund=true; 
                            nextID=rearrangeChat[subIndex]["chatID"];
                        }
                        subIndex++;
                    }
                }else{
                    if(rearrangeChat[index+1]){
                        nextID=rearrangeChat[index+1]["chatID"];
                    }
                    // else{
                    //     nextID=-2;
                    // }
                }
            }
            index++;
        }
        return nextID;
    }

    // setChatImage(chatID, imgSrc){
    //     const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    //     this.chats[chatID_DB]["imgSrc"]=imgSrc;
    // }

    // setChatName(chatID, name){
    //     const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    //     this.chats[chatID_DB]["name"]=name;
    // }

    setChatPinedStatus(chatID, pined, pinedTime=Date.parse(new Date)){
        if(!pined){
            pinedTime=null;
        }
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        this.chats[chatID_DB]["pined"]=pined;
        this.chats[chatID_DB]["pinedTime"]=pinedTime;
    }

    setChatLastMsgObj(chatID, lastMsgObj){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        this.chats[chatID_DB]["lastMsgObj"]=lastMsgObj;
    }

    setChatIsPinning(chatID, isPinning){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        this.chats[chatID_DB]["isPinning"]=isPinning;
    }

    setChatIsDeleting(chatID, isDeleting){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        this.chats[chatID_DB]["isDeleting"]=isDeleting;
    }

    chatIsPinning(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        return this.chats[chatID_DB]["isPinning"];
    }

    chatIsDeleting(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        return this.chats[chatID_DB]["isDeleting"];
    }

    // setChatLastSeen(chatID, lastSeen){
    //     const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
    //     // console.log(chatID_DB);
    //     this.chats[chatID_DB]["lastSeen"]=lastSeen;
    // }

    getChatImage(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.chats[chatID_DB]["imgSrc"];
    }

    getChatName(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        console.log(this);
        // console.log(this);
        return this.chats[chatID_DB]["name"];
    }

    getChatUnreadMsgCount(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.chats[chatID_DB]["unreadMsgCount"];
    }

    getChatPinedStatus(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.chats[chatID_DB]["pined"];
    }

    getChatLastMsgObj(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        return this.chats[chatID_DB].lastMsgObj;
    }

    getChatLastSeen(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        return this.chats[chatID_DB]["lastSeen"];
    }

    getChatLastSeenString(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        return this.chats[chatID_DB]["lastSeenString"];
    }

    recieverIsOnline(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(chatID_DB);
        return this.chats[chatID_DB]["recieverIsOnline"];
    }

    chatObjIsAvailable(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        let chat=this.chats[chatID_DB];
        if(!chat){
            return false;
        }
        if(!chat.chatID){
            return false;
        }
        return true;
    }





    getChatObj(chatID){
        const chatID_DB=ChatBody.makeChatID_DB_Usable(chatID);
        // console.log(this.chats[chatID_DB]);
        // console.log(this.chats[chatID_DB].getChat());
        // return this.chats[chatID_DB];
        return this.chats[chatID_DB];
    }

    getChatsAsArr(){
        let chats=Object.values(this.chats);
        return chats;
    }

    getAllProfileIDs(){
        let chats=this.getChatsAsArr();
        let profileIDs=[];
        chats.forEach(chat=>{
            profileIDs.push(chat.profileID);
        });
        return profileIDs;
    }  
}


const ChatsDB=new ChatsDBInstance;


export{
    ChatsDB
}









