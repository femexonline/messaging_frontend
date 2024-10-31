import{
    MyCodeErr
} from "../../../_errorHandler/errorHandler.js";



//done
const LBClass="loaderBackground";
const CLClass="contentLoader";


class LoaderBackgroundDOM{
    static create(){
        let loaderBackground=document.createElement("div");
        loaderBackground.className="loaderBackground";
    
        return loaderBackground;
    }

    static append(elem, loaderBackgroundElem){
        elem.appendChild(loaderBackgroundElem);
    }

    static delete(elem){
        let loaderBackground=elem.getElementsByClassName(LBClass)[0];
    
        if(!loaderBackground){
            let errMsg="there is no background";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let parent=loaderBackground.parentNode==elem;
        if(!parent){
            let errMsg="elem not a parent";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        elem.removeChild(loaderBackground);
    }
}

class ContentLoaderDOM{
    static create(text=null, loader=null){
        if(!text && !loader){
            let errMsg="noting for loader to work width";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let loaderArray=[
            "spiner",
            "boxes"
        ];
        if(loaderArray.indexOf(loader)==-1){
            let errMsg="loader not recognised";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
    
        let contentLoader=document.createElement("div");
        contentLoader.className="contentLoader";
    
        let div=document.createElement("div");
        let span;
    
        if(text){
            if(text===true){
                text="Loading"; 
            }
            span=document.createElement("span");
            span.className="text";
            span.innerHTML=text;
            div.appendChild(span);
        }
    
        if(loader){
            if(loader=="spiner"){
                let spiner=LodersDOM.createSpinerLoader();
                div.appendChild(spiner);
            }
            if(loader=="boxes"){
                let boxes=LodersDOM.createBoxesLoader();
                div.appendChild(boxes);
            }
        }
    
        contentLoader.appendChild(div);    
    
        return contentLoader;
    }

    static append(elem, contentLoaderElem){
        elem.appendChild(contentLoaderElem);
    }

    static delete(elem){
        let contentLoader=elem.getElementsByClassName(CLClass)[0];
    
        if(!contentLoader){
            let errMsg="there is no background";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
    
        let parent=contentLoader.parentNode==elem;
        if(!parent){
            let errMsg="elem not a parent";
            let errCode="";
            let errHandler=MyCodeErr.announce(errMsg, errCode);
            if(errHandler){
                console.log(errHandler);
            }
            return;
        }
        elem.removeChild(contentLoader);
    }
}

class LodersDOM{
    static createSpinerLoader(){
        let spiner=document.createElement("span");
        spiner.className="spiner";
    
    
        return spiner;
    }
    
    static createBoxesLoader(){
        let boxes=document.createElement("span");
        boxes.className="boxes";
    
        let span;
        span=document.createElement("span");
        boxes.appendChild(span);
    
        span=document.createElement("span");
        boxes.appendChild(span);
    
        span=document.createElement("span");
        boxes.appendChild(span);
    
    
        return boxes;
    }
}



export{
    LoaderBackgroundDOM,
    ContentLoaderDOM
}