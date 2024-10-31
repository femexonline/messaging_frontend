import{
    GenerateAPIRes
} from "../_tempDatabase/_dummyAPIResponse.js";


import{
    Settings
} from "../_settings/settings.js";

import{
    MyCodeErr
} from "../_errorHandler/errorHandler.js";

import{
    MessageFuncs,
    UnseenMsgIDs
} from "../_tempDatabase/messageFuncs.js";



import{
    MessagesDB,
    MsgOnSendingDB,
    ChatBoxDB
} from "../_tempDatabase/messages.js";

import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
    MessageBodyDOM,
    MsgDateDOM,
    MsgWraperDOM,
    MsgSendingWraperDOM,
    DeletedMsgDOM,
    StarDOM,
    MsgMoreOptionsDOM,
    LoadOlderMsgsBtnDOM
} from "../DOM/msgPageDOM/msgDOM/msgBodyDOM.js";

import{
    OtherFunctions
} from "../msgPage/others/otherFonctions.js";

import{
    UpdateMsgDOM
} from "../DOM/msgPageDOM/msgDOM/updateMsgBody.js";

import{
    ChatFuncs
} from "../_tempDatabase/chatsFunc.js";

import{
    MsgBody
} from "../msgPage/message/messageBody.js";

import{
    DOMGetter,
    GlobalVars
} from "../msgPage/others/globalVariables.js";

import{
    LoaderBackgroundDOM,
    ContentLoaderDOM
} from "../DOM/pageLevelDOM/loaderDOM/loaderDOM.js";

import{
    MyProfile
} from "../_tempDatabase/profile.js";





class MsgApis{
    static async fetchOldMsgs(chatID, fetchToID, firstMsgInDBID, length){

        let messages;

        if(fetchToID){
            let mdgIds=[0.1,0.2,0.3,0.4,0.5,
                0.6,0.7,0.8,0.9,0.10,0.11,0.12,0.13,
                0.14,0.15,0.16,0.17,0.18,0.19
            ];
            messages=await GenerateDummyDatabase.messages(chatID_DB, mdgIds, false, true);
    
            //this should happe o acked
            // if(messages.length<length){
            //     MessageFuncs.fetchOldMsgs(chatID_DB);
            // }

        }else{
            let mdgIds=[0.1,0.2,0.3,0.4,0.5,
                0.6,0.7,0.8,0.9,0.10,0.11,0.12,0.13,
                0.14,0.15,0.16,0.17,0.18,0.19
            ];
            messages=await GenerateDummyDatabase.messages(chatID, mdgIds, false, true);
            // console.log(messages);        
        }

        return messages;
    }

    static starMsg(chatID, apiMsgIDs){
        /*apiResult should contain object of object, chatID and result
            {
                chatID,
                result[
                    {msgID, starStatus}
                ]
            }
        */
        /*apiResult should send array of msgID
            [msgID], chatID
        */
        

        let msgIDsToSend=[];
        
        apiMsgIDs.forEach(msgID => {
            if(MessageFuncs.msgIsStaring(chatID, msgID)){
                return;
            }
            MessageFuncs.setMsgIsStaring(chatID, msgID, true);
            MsgMoreOptionsDOM.makeOptionUclickale(chatID, msgID, "star"); 
            msgIDsToSend.push(msgID);
        });

        if(!msgIDsToSend.length){
            console.log("err");
            return;
        }


        let apiResult=GenerateAPIRes.starMsgRes(chatID, msgIDsToSend);

        if(apiResult){
            ApiSuccess.starMsg(apiResult);
        }else{
            ApiFail.starMsg(chatID, msgIDsToSend);
        }
    }

    static deleteMsg(chatID, apiMsgIDs, delForEvery){
        /*
            api send to backend
            {
                chatID: int,
                selectedMessagesID: array of selected messages
            }
            api recieves from backend
            {
                chatID: int,
                delCodeNoArr: array of objectes, object containing msgID and del CodeNo
                  delCodeNoArr{
                      [
                          msgID:
                          delCodeNo:
                      ]
                  }  
    
            }
        */


        let msgIDsToSend=[];
        
        apiMsgIDs.forEach(msgID => {
            if(MessageFuncs.msgIsDeleting(chatID, msgID)){
                return;
            }
            MessageFuncs.setMsgIsDeleting(chatID, msgID, true);
            MsgMoreOptionsDOM.makeOptionUclickale(chatID, msgID, "del"); 
            MsgWraperDOM.makeUnselectable(chatID, msgID);

            msgIDsToSend.push(msgID);
        });

        if(!msgIDsToSend.length){
            console.log("err");
            return;
        }


        let apiResult=GenerateAPIRes.deleteMessageRes(chatID, msgIDsToSend, delForEvery);

        if(apiResult){
            ApiSuccess.deleteMsg(apiResult);
        }else{
            ApiFail.deleteMsg(chatID, msgIDsToSend);
        }
    }    
}




class ApiSuccess{
    static starMsg(apiResult){
        let chatID=apiResult["chatID"];
        let results=apiResult["result"];
        results.forEach(result => {
            let msgID=result["msgID"];
            let starStatus=result["starStatus"];
            // msgStarAction(array[0], array[1]);

            MessageFuncs.setMsgIsStaring(chatID, msgID, false);
            MsgMoreOptionsDOM.makeOptionClickale(chatID, "star");

            MessageFuncs.updateStaredStatus(chatID, msgID, starStatus);
        });
    }

    static deleteMsg(apiResult){
        let chatID=apiResult["chatID"];
        let results=apiResult["delCodeNoArr"];
        results.forEach(result => {
            let msgID=result["msgID"];
            let delCodeNo=result["delCodeNo"];

            if(delCodeNo){
                MessageFuncs.deleteMessage(chatID, msgID, delCodeNo);
            }else{
                MessageFuncs.setMsgIsDeleting(chatID, msgID, false);
                MsgMoreOptionsDOM.makeOptionClickale(chatID, msgID, "del");

                MsgWraperDOM.makeSelectable(chatID, msgID);

                alert("chat not deleted");
                console.log("chat not deleted");
            }
        });    
    }
}

class ApiFail{
    static starMsg(chatID, msgIDsToSend){
        msgIDsToSend.forEach(msgID => {
            MessageFuncs.setMsgIsStaring(chatID, msgID, false);
            MsgMoreOptionsDOM.makeOptionClickale(chatID, "star");
        });

        let errMsg="Poor internet connection";
        let errCode="";
        let errHandler=MyCodeErr.announce(errMsg, errCode);
        if(errHandler){
            console.log(errHandler);
        }
    }

    static deleteMsg(chatID, msgIDsToSend){
        msgIDsToSend.forEach(msgID => {
            MessageFuncs.setMsgIsDeleting(chatID, msgID, false);
            MsgMoreOptionsDOM.makeOptionClickale(chatID, msgID, "del");

            MsgWraperDOM.makeSelectable(chatID, msgID);
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
    MsgApis
}



