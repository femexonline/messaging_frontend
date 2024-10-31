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
    ChatBodyDOM,
    ChatContainDOM,
    ChatPinedDOM,
    ChatCountDOM,
    ChatSelectedIconDOM,
    LMegReadDOM,
    ChatMoreOptionsDOM
} from "../../../DOM/msgPageDOM/chatDOM/chatBodyDOM.js";

import{
    ChatHeadDOM,
    ChatHeadNormalDOM,
    ChatHeadSelectedDOM
} from "../../../DOM/msgPageDOM/chatDOM/chatHeadDOM.js";

import{
    MyProfile
} from "../../../_tempDatabase/profile.js";


//done
class ChatSectionDOM{
    static clear(){
        const chatSection=DOMGetter.getChat();
        let allChatSectionContent=chatSection.children;
    
        if(allChatSectionContent){
            let length=allChatSectionContent.length;
        
            for(let x=0; x < length; x++){
                let parent=allChatSectionContent[0].parentNode;
                parent.removeChild(allChatSectionContent[0]);
            }
        }else{
            let errMsg="counld not get allChatSectionContent";
            let errCode="";
            let userErr=false;
            let errHandler=MyCodeErr.announce(errMsg, errCode, userErr);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
    
    
    static load(){
        ChatHeadDOM.append(ChatHeadDOM.create());
        ChatHeadNormalDOM.append(ChatHeadNormalDOM.create(MyProfile.p_pix));
        ChatHeadSelectedDOM.append(ChatHeadSelectedDOM.create());
        ChatBodyDOM.append(ChatBodyDOM.create());
    }
}


export{
    ChatSectionDOM
}
