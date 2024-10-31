import{
    Settings
} from "../../../_settings/settings.js";

import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";



import{
    DOMGetter,
    GlobalVars
} from "../../../msgPage/others/globalVariables.js";

import{
    ShowChatBoxDOM,
    MessageHeadDOM,
    MessageHeadNormalDOM,
    MessageHeadSelectedDOM
} from "../../../DOM/msgPageDOM/msgDOM/msgHeadDOM.js";

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
} from "../../../DOM/msgPageDOM/msgDOM/msgBodyDOM.js";

import{
    ChatFuncs
} from "../../../_tempDatabase/chatsFunc.js";



class MsgSectionDOM{
    static clear(addSelectAChatDOM=false){
        const messageSection=DOMGetter.getMessage();
        let allMessageSectionContent=messageSection.children;

        if(allMessageSectionContent){
            let length=allMessageSectionContent.length;
        
            for(let x=0; x < length; x++){
                let parent=allMessageSectionContent[0].parentNode;
                parent.removeChild(allMessageSectionContent[0]);
            }

            ChatFuncs.setActiveChat(null);
        }else{
            let errMsg="msgSectionContent not found";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }

        if(addSelectAChatDOM){
            SelectAChatDOM.append(SelectAChatDOM.create());
        }
    }
    
    
    static load(){
        MessageHeadDOM.append(MessageHeadDOM.create());
        MessageHeadNormalDOM.append(MessageHeadNormalDOM.create());
        MessageHeadSelectedDOM.append(MessageHeadSelectedDOM.create());
    
        MsgDateDOM.append(MsgDateDOM.create(null, true), true);
        ShowChatBoxDOM.append(ShowChatBoxDOM.create());
        MessageBodyDOM.append(MessageBodyDOM.create());
    }
}


export{
    MsgSectionDOM
}