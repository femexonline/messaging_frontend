class PageCreateDOM{
    static messagesPage(){
        const messagesPageContent=[];
    
        //create chat skeleton
        let chat=document.createElement("div");
        chat.id="chat";
        chat.className="chat";
        messagesPageContent.push(chat);
    
        let message=document.createElement("div");
        message.id="message";
        messagesPageContent.push(message);
    
    
        return messagesPageContent;
    }
}


export{
    PageCreateDOM
}