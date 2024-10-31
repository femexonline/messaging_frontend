import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";

import{
    MousePositionBodyPopupDOM,
    ShowProfilePicturePopupDOM,
    DeleteMessageOptionPopupDOM,
    MsgInfoPopUpDOM,
    ChatMousePosBodyPopupDOM,
    DeleteChatOptionPopupDOM
} from "../../DOM/pageLevelDOM/popupDOM/popupDOM.js";




class ProfileFunc{
    static viewMyProfilePicture(){
        const chatHeadPix=DOMGetter.getChatHeadPix();
    
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let showProfilePicture=DOMGetter.getShowProfilePicture();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(showProfilePicture){ShowProfilePicturePopupDOM.delete();}
    
        let imgSrc=chatHeadPix.getElementsByTagName("img")[0].src;
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ShowProfilePicturePopupDOM.append(ShowProfilePicturePopupDOM.create(imgSrc));
    }
    
    static viewCurrentChatProfilePicture(){
        const messageHeadPix=DOMGetter.getMessageHeadPix();
        
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let showProfilePicture=DOMGetter.getShowProfilePicture();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(showProfilePicture){ShowProfilePicturePopupDOM.delete();}
    
        let imgSrc=messageHeadPix.getElementsByTagName("img")[0].src;
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ShowProfilePicturePopupDOM.append(ShowProfilePicturePopupDOM.create(imgSrc));
    }
    
    static viewChatProfilePicture(event){
        let mousePositionBody=DOMGetter.getMousePositionBody();
        let showProfilePicture=DOMGetter.getShowProfilePicture();
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(showProfilePicture){ShowProfilePicturePopupDOM.delete();}
    
        let imgSrc=event.target.src;
    
        let MousePositionBodyElemRes={
            "styles":[
                ["background", "black"],
                ["opacity", "0.5"]
            ]
        }
        MousePositionBodyPopupDOM.append(MousePositionBodyPopupDOM.create(MousePositionBodyElemRes));
        ShowProfilePicturePopupDOM.append(ShowProfilePicturePopupDOM.create(imgSrc));
    }
    
    static closeProfilePictureView(){
        const mousePositionBody=DOMGetter.getMousePositionBody();
        const showProfilePicture=DOMGetter.getShowProfilePicture();
        
        if(mousePositionBody){MousePositionBodyPopupDOM.delete();}
        if(showProfilePicture){ShowProfilePicturePopupDOM.delete();}
    }
}


export{
    ProfileFunc
}