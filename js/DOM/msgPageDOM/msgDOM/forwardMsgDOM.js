

class ForwardMsgDOM{
    static create(profileObj){
        /* parameters expectes
            profileObj: obj
        */
        
        /* profileObj parameters expectes
            chatID : int
            imgSrc : str
            name : str
            unreadMsgCount : int
            pined:bool
            lastMsgObj : object
        */
    
        /* lastMsgObj expectes
            lastMsg : var
            timeSentString : str
            read : str eg: read, sent, deliverd
            isSender : bool
        */
        let chatID=profileObj["chatID"];
        let imgSrc=profileObj["imgSrc"];
        let name=profileObj["name"];
        let unreadMsgCount=profileObj["unreadMsgCount"];
        let pined=profileObj["pined"];
        let lastMsgObj=profileObj["lastMsgObj"];
    
        let lastMsgTime=lastMsgObj["timeSentString"];
                
        chatID=ChatBody.makeChatIDUsable(chatID);
    
        let chatContain=document.createElement("div");
        if(profileObj["isDeleting"]){
            chatContain.className="chatContainNotActive hover";
        }else{
            chatContain.className="chatContain hover";
        }
        chatContain.id=chatID;
        chatContain.dataset.id=chatID;
    
    
        let chatSelected=document.createElement("div");
        chatSelected.className="chatSelected";
        chatSelected.dataset.id=chatID;
        chatSelected.setAttribute("name", chatID);
        chatContain.appendChild(chatSelected);
    
    
        let chatPix=document.createElement("div");
        chatPix.className="chatPix";
        let img=document.createElement("img");
        img.src=imgSrc;
        img.alt="pix";
        chatPix.appendChild(img);
        // let chatSelect=document.createElement("span");
        // chatSelect.className="material-icons flexCenter chatSelect";
        // chatSelect.innerHTML="done";
        // chatSelect.style.display="block";
        // chatPix.appendChild(chatSelect);
        // let online=document.createElement("span");
        // online.className="flexCenter online";
        // online.style.display="block";
        // chatPix.appendChild(online);
        chatContain.appendChild(chatPix);
    
    
        let chatSubContain=document.createElement("div");
        chatSubContain.className="chatSubContain";
    
        let nameContain=document.createElement("div");
        nameContain.className="nameContain";
    
        let nameSubContain=document.createElement("div");
        nameSubContain.className="nameSubContain";
        nameSubContain.innerHTML=name;
        nameContain.appendChild(nameSubContain);
        let chatTimeContain=document.createElement("div");
        chatTimeContain.className="chatTimeContain";
        chatTimeContain.innerHTML=lastMsgTime;
        nameContain.appendChild(chatTimeContain);
    
        chatSubContain.appendChild(nameContain);
    
        let lMegContain=ChatContainDOM.createLMegContainElem(chatID, unreadMsgCount, pined, lastMsgObj);
        chatSubContain.appendChild(lMegContain);
        chatContain.appendChild(chatSubContain);
    
    
        ChatGroupActivations.allChatsFunctions(chatContain);
        ChatGroupActivations.allChatOntouchEvent(chatContain);
    
       return chatContain;
    }

    static append(chatContainElem){
        const chatBody=DOMGetter.getChatBody();

        if(chatBody){
            chatBody.appendChild(chatContainElem);
        }else{
            let errMsg="chatBodyDOM not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }

    static delete(chatID, passive=false){
        chatID=ChatBody.makeChatIDUsable(chatID);
        let chatContain=document.getElementById(chatID);

        if(chatContain){
            let parent=chatContain.parentNode;
            parent.removeChild(chatContain);
        }else{
            if(!passive){
                let errMsg="error with chatContain";
                let errCode="";
                let errHandler=MyCodeErr.announce(errMsg, errCode);
                if(errHandler){
                    console.log(errHandler);
                }
            }
        }
    }

    static createLMegContainElem(chatID, unreadMsgCount, pined, lastMsgObj){ 
        const chatOptionsSettings=Settings.ChatOptions;
        // console.log(chatOptionsSettings);
        /* lastMsgObj expectes
            lastMsg : var
            timeSentString : str
            read : str eg: read, sent, deliverd
            isSender : bool
        */
    
       chatID=ChatBody.makeChatIDUsable(chatID);
    
        let readClass="", readInner="";
        let read=lastMsgObj["read"];
        let msg=lastMsgObj["lastMsg"];
        let isSender=lastMsgObj["isSender"];
    
    
        if(read=="read"){
            readClass="read";
        }
        if(read=="sent"){
            readInner="done";
        }else{
            readInner="done_all";
        }
    
        let lMegContain=document.createElement("div");
        lMegContain.className="lMegContain";
    
    
        let lMegContain1=document.createElement("div");
        lMegContain1.className="lMegContain1";
    
        if(isSender){
            let lMegRead=LMegReadDOM.create(readClass, readInner);
            lMegContain1.appendChild(lMegRead);
        }
    
        let lMeg=document.createElement("div");
        lMeg.className="lMeg";
        lMeg.innerHTML=msg;
        lMegContain1.appendChild(lMeg);
    
        lMegContain.appendChild(lMegContain1);
    
    
        let lMegContain2=document.createElement("div");
        lMegContain2.className="lMegContain2";
        
        if(chatOptionsSettings.pinChat){
            if(pined){
                let chatPined=ChatPinedDOM.create();
                lMegContain2.appendChild(chatPined);
            }
        }
    
        if(unreadMsgCount){
            let chatCount=ChatCountDOM.create(unreadMsgCount);
            lMegContain2.appendChild(chatCount);
        }
    
        let chatExpandMore=document.createElement("div");
        chatExpandMore.className="material-icons flexCenter chatExpandMore";
        chatExpandMore.innerHTML="expand_more";
        chatExpandMore.dataset.id=chatID;
        chatExpandMore.setAttribute("name", chatID);
        lMegContain2.appendChild(chatExpandMore);
    
        lMegContain.appendChild(lMegContain2);
    
    
    
        
        return lMegContain;
    }
}



