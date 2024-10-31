import{
    MyCodeErr
} from "../../_errorHandler/errorHandler.js";


import{
    DOMGetter,
    GlobalVars
} from "../../msgPage/others/globalVariables.js";



class PageClearDOM{
    static section(){
        const pageSection=DOMGetter.getPageSection();
        let allSectionContent=pageSection.children;
    
        if(allSectionContent){
            let length=allSectionContent.length;
        
            for(let x=0; x < length; x++){
                let parent=allSectionContent[0].parentNode;
                parent.removeChild(allSectionContent[0]);
            }
        }else{
            let errMsg="allSectionContent not found";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
        }
    }
}

export{
    PageClearDOM
}