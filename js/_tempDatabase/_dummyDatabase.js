import{
    MessageFuncs,
    UnseenMsgIDs
} from "../_tempDatabase/messageFuncs.js";





class GenerateDummyDatabase{
    static chatName(){
        let na="abcdefghijklmnoopqrstuvwxyz";
        let me="abcdefghijklmnoopqrstuvwxyz";
        let nR=Math.round(Math.random()*23);
        let mR=Math.ceil(Math.random()*10)+1;
        na=na.substr(nR, mR);
    
        nR=Math.round(Math.random()*23);
        mR=Math.ceil(Math.random()*10)+1;
        me=me.substr(nR, mR);
    
        return na+" "+me;
    }
    
    static msgText(maxNumWord=10){
        // return "tt";
        let wordd="abcdefghijklmnoopqrstuvwxyz";
        let msg="";
    
        let words=Math.round(Math.random()*maxNumWord);
    
        for(let i=0; i<words; i++){
            let word=wordd;
            let start=Math.round(Math.random()*23);
            let length=Math.round(Math.random()*5) + 1;
            word=word.substr(start, length);
    
            if(i){
                msg+=" "+word;
            }else{
                msg+=word;
            }
        }
        return msg;
    }
    
    static lastMsgObj(){
        let lastMsgObj={};
    
        lastMsgObj["lastMsg"]=Math.round(Math.random()*10000)
        lastMsgObj["lastMsg"]=GenerateDummyDatabase.msgText();
        lastMsgObj["timeSent"]=Math.round(Math.random()*1589065200000)+500000000000;
        lastMsgObj["read"]="sent";
        lastMsgObj["isSender"]=Math.round(Math.random()*1);
    
    
        return lastMsgObj;
    }
    
    static replyedMegObj(chatID){
        let replyedMegObj=Math.round(Math.random()*1);
        if(!replyedMegObj){return null;}
        replyedMegObj={};
    
        replyedMegObj["chatID"]=chatID;
        replyedMegObj["msgID"]=1;
        replyedMegObj["isSender"]=Math.round(Math.random()*1);
        replyedMegObj["msg"]=GenerateDummyDatabase.msgText();
        replyedMegObj["senderName"]=GenerateDummyDatabase.chatName();
    
    
        return replyedMegObj;
    }
    
    static chatsAndProfiles(chatIdArray, fetchOldChat=false){
        let chats=[];
        let profiles=[];
        chatIdArray.forEach(chatID => {
            let chat={};
            chat["chatID"]=chatID;
            chat["profileID"]=chatID;
            // chat["imgSrc"]="default.jpg";
            // chat["name"]=GenerateDummyDatabase.chatName();
            // chat["unreadMsgCount"]=Math.floor(Math.random()*10);
            // chat["lastSeen"]=Math.round(Math.random()*1589065200000)+500000000000;
            // chat["pined"]=false;        
            chat["pined"]=Math.round(Math.random()*1);
            if(fetchOldChat){
                chat["pined"]=false;
            }
            chat["lastMsgObj"]=GenerateDummyDatabase.lastMsgObj();
            if(chat["pined"]){
                chat["pinedTime"]=Math.round(Math.random()*1589065200000)+500000000000;
                chat["sortTime"]=chat["pinedTime"];
            }else{
                chat["sortTime"]=chat["lastMsgObj"]["timeSent"];
            }
            let mdgIds=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
            let messages=GenerateDummyDatabase.messages(chatID, mdgIds);
            chat["messages"]=messages;
            chats.push(chat);
            let profile=GenerateDummyDatabase.profile([chat["chatID"], chat["profileID"]]);
            profiles.push(profile);
        });
    
        return {
            "chats":chats,
            "profiles":profiles
        }
    }
    
    static messages(chatID, mdgIds, single=false, old=false, sent=false){
        // sent expext dataObj
        if(single){
            let message={};
            message["msgID"]=mdgIds;
            message["chatID"]=chatID;
            if(sent){
                let id=MessageFuncs.getChatMsgsAsArr(chatID);
                id=id[id.length-1];
                id=id.msgID;
                id++;
                message["msgID"]=id;
            }
            if(sent){
                message["msg"]=sent.msg;
            }else{
                message["msg"]=GenerateDummyDatabase.msgText();
            }
            message["isSender"]=Math.round(Math.random()*1);
            if(sent){
                message["isSender"]=true;
            }
            message["senderID"]=message["isSender"];
            message["timeSent"]=Math.round(Math.random()*1589065200000)+500000000000;
            message["read"]=["sent", "delivered", "read"][Math.floor(Math.random()*3)];
            message["stared"]=Math.round(Math.random()*1);
            message["deliverTime"]=Math.round(Math.random()*1589065200000)+500000000000;
            message["readTime"]=Math.round(Math.random()*1589065200000)+500000000000;
            if(sent){
                if(sent.rMsgID){
                    message["replyedMegObj"]=MessageFuncs.getMessageObj(chatID, sent.rMsgID);
                }
            }else{
                message["replyedMegObj"]=GenerateDummyDatabase.replyedMegObj(chatID);
            }
            return message;
        }


        let messages=[];
        mdgIds.forEach(id => {
            let message={};
            message["chatID"]=chatID;
            message["msgID"]=id;
            message["msg"]=GenerateDummyDatabase.msgText();
            message["isSender"]=Math.round(Math.random()*1);
            message["senderID"]=message["isSender"];
            message["timeSent"]=Math.round(Math.random()*1589065200000)+500000000000;
            if(old){
                message["read"]="read";
            }else{
                message["read"]=["sent", "delivered", "read"][Math.floor(Math.random()*3)];
            }
            message["stared"]=Math.round(Math.random()*1);
            message["deliverTime"]=Math.round(Math.random()*1589065200000)+500000000000;
            message["readTime"]=Math.round(Math.random()*1589065200000)+500000000000;
            message["replyedMegObj"]=GenerateDummyDatabase.replyedMegObj(chatID);
            messages.push(message);
        });
    
        return messages;
    }
    
    static profile(idArr, isMyprofile=true){
        //idArr is a two dimentional array, each containing a pair is userID and profileID
        if(!idArr[0]){
            return;
        }
        let p={};
        p["userID"]=idArr[0];
        if(!isMyprofile){
            p["chatID"]=idArr[1];
        }
        p["name"]=GenerateDummyDatabase.chatName();
        p["p_pix"]="default.jpg";
        return p;    
    }
}


export{
    GenerateDummyDatabase
}