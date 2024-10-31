const chatsPerAPICall=[
    // contains only index [0], which holds the number chats to load at once
    // mor chats can be loaded if he has more unread chats
    //would be set according to height of chat container and chats container
];


const messagesPerAPICall=[
    // contains only index [0], which holds the number messages to load at once
    // mor messages can be loaded if he has more unread messages
    //would be set according to height of message container and messages container
];

class _ErrorReport{
    /*
        if status is set to 0, no err is reported
        if status is set to 1, alert user that there is an error
        if status is set to 2, console.log deveeloper error msg

    */
    static get status(){
        return 2;
    }
}

class _ApiSettings{
    static get chatsPerAPICall(){
        return 15;
    }
    static get messagesPerAPICall(){
        return 20;
    }
}

class _MessageOptions{
    static get replyMessage(){
        return 1;
    }
    static get messageInfo(){
        return 1;
    }
    static get fowardMessage(){
        return 1;
    }
    static get starMessage(){
        return 1;
    }
    static get deleteMessage(){
        return 1;
    }
    static get selectMessage(){
        return 1;
    }

    static get copyMessage(){
        return 1;
    }

    static get headReplyMessage(){
        return _MessageOptions.replyMessage & 1;
    }
    static get headMsgInfo(){
        return _MessageOptions.messageInfo & 1;
    }
    static get groupFowardMessage(){
        return _MessageOptions.fowardMessage & 1;
    }
    static get groupStarMessage(){
        return _MessageOptions.starMessage & 1;
    }
    static get groupDelMessage(){
        return _MessageOptions.deleteMessage & 1;
    }

    static get groupCopyMessage(){
        return _MessageOptions.copyMessage & 1;
    }
}

class _ChatOptions{
    static get selectChat(){
        return 1;
    }
    static get deleteChat(){
        return 1;
    }
    static get pinChat(){
        return 1;
    }
    static get groupChatPin(){
        return _ChatOptions.pin && 1;
    }
    static get groupDelChat(){
        return _ChatOptions.deleteChat && 1;
    }
}



class Settings{
    static get ErrorReport(){
        return _ErrorReport;
    }
    static get ApiSettings(){
        return _ApiSettings;
    }
    static get MessageOptions(){
        return _MessageOptions;
    }
    static get ChatOptions(){
        return _ChatOptions;
    }
}

export{
    Settings
}