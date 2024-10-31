import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";

import {
    ChatBody
} from "../msgPage/chat/chatBody.js";

import{
    MessageFuncs
} from "../_tempDatabase/messageFuncs.js";



class GenerateAPIRes{
    static deleteMessageRes(chatID, selectedMessagesID, delForEvery){
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
                  delCodeNoArr[
                      {
                          msgID:
                          delCodeNo:
                      }
                    ]  
    
            }
        */
        const CodeNo=[1, 2, 3, 4, null];
        const delCodeNoArr=[];
        selectedMessagesID.forEach(msgID => {
            const obj={
                "msgID":msgID,
                "delCodeNo":CodeNo[Math.round(Math.random()*4)]
            };
            delCodeNoArr.push(obj);
        });
    
        const res={
            "chatID":chatID,
            "delCodeNoArr":delCodeNoArr
        }
        return res;
    }

    static deleteChatRes(reqParam){
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
        const CodeNo=[1, 2, 3, 4, null];
        const res=[];
        reqParam.forEach(param => {
            const arr={
                "chatID":param["chatID"],
                "isDeleted":CodeNo[Math.round(Math.random()*4)]
            };
            res.push(arr);
        });
    
        return res;
    }

    static pinChatRes(reqParam){
        /*apiResult should contain array of object of chatID, pinStatus and pinedTime
            [
                {chatID, pinStatus, pinedTime}
            ]
        */
        /*apiResult should send array of chatID
            [chatID]
        */
        const res=[];
        reqParam.forEach(chatID => {
            //similation//
            chatID=ChatBody.makeChatIDUsable(chatID);
            let chatContain=document.getElementById(chatID);
            let lMegContain2=chatContain.getElementsByClassName("lMegContain2")[0];
            let chatPined=lMegContain2.getElementsByClassName("chatPined")[0];
            
            let pinne=true;
            if(chatPined){
                pinne=false;
            }
            //similation//  


            const arr={
                "chatID":chatID,
                "pinStatus":pinne,
                "pinedTime":Date.parse(new Date)
            };
            res.push(arr);
        });
    
        return res;
    }

    static starMsgRes(chatID, reqParam){
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
        const res={
            "chatID":ChatBody.makeChatID_DB_Usable(chatID),
            "result":[]
        };

        reqParam.forEach(msgID => {
            //similation//
            let stared=MessageFuncs.getMessageObj(chatID, msgID).stared;
            
            let starStatus=true;
            if(stared){
                starStatus=false;
            }
            //similation//  


            const arr={
                "msgID":msgID,
                "starStatus":starStatus,
            };
            res["result"].push(arr);
        });
    
        return res;
    }

    static msgSentSignalRes(dataObj){
        /*
            dataObj expects
                userId
                chatID
                msgSendingID
                msg
                rMsgID

        */

        /*
            send
                chatID : int
                msgID : int
                msgSendingID: int //for messages that are beeing sent 
                msg : var
                isSender : bool
                senderID:int, sender ID 
                timeSent : int, time im miliseconds
                read : var
                stared : bool
                deliverTime:
                readTime:
                deleted: int or null, eg. 1,2,3,4 or null
                replyedMegObj: object
                replyedMegObj contains:
                    msgID,: int
                    isSender,: bool
                    msg,: var
                    senderName: var
                ;

        */

        let msgSentRes=GenerateDummyDatabase.messages(
           dataObj["chatID"],
           null,
           true,
           false,
           dataObj
        );
        msgSentRes["msgSendingID"]=dataObj.msgSendingID;

        return msgSentRes;
        
    }
}


export{
    GenerateAPIRes
}

