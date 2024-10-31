import{
    GenerateDummyDatabase
} from "../_tempDatabase/_dummyDatabase.js";

import{
    ChatFuncs
} from "../_tempDatabase/chatsFunc.js";

import{
    ProfileAPI
} from "../_apis/profileApis.js";


class ProfileInstance{
    /*
        profileObj object would contain:
            profileID: int //would be replaced with userID for myProfile
            chatID : int
            p_pix : str
            name : str
            lastSeen : int, time in miliseconds
        ;

    */
    
    constructor(profileObj){
        if(!profileObj){
            profileObj={};
        }

        this._userID=profileObj["userID"];
        this._chatID=profileObj["chatID"];
        this._name=profileObj["name"];
        this._p_pix=profileObj["p_pix"];
        this._lastSeen=null;
    }

    get userID(){return this._userID;}
    get chatID(){return this._chatID;}
    get name(){return this._name;}
    get p_pix(){return this._p_pix;}
    get lastSeen(){return this._lastSeen;}

    set userID(value){}
    set chatID(value){}
    set name(value){this._name=value;}
    set p_pix(value){this._p_pix=value;}
    set lastSeen(value){
        if(value){
            this._lastSeen=value;
        }else{
            this._lastSeen=null;
        }
    }
}


class MyProfileInstance extends ProfileInstance{
    constructor(){
        super();
    }

    async fetch(){
        let profile=await ProfileAPI.fetchMyProfile();
        this._userID=profile.userID;
        this.name=profile.name;
        this.p_pix=profile.p_pix;
    }
}

class ProfilesDBInstance{
    constructor(){
        this._profiles={
            //object containing ProfileInstance, with profileIDs as keys
        };
    }

    get profiles(){return this._profiles}
    set profiles(value){}



    addProfile(profileObj){
        this.profiles[profileObj['userID']]=new ProfileInstance(profileObj);
    }



    setP_pix(profileID, imgSrc){
        this.profiles[profileID]["p_pix"]=imgSrc;
    }

    setName(profileID, name){
        this.profiles[profileID]["name"]=name;
    }

    setLastSeen(profileID, lastSeen){
        this.profiles[profileID]["lastSeen"]=lastSeen;        
    }

    getP_pix(profileID){
        return this.profiles[profileID]["p_pix"];
    }

    getName(profileID){
        return this.profiles[profileID]["name"];
    }

    getLastSeen(profileID){
        return this.profiles[profileID]["lastSeen"];
    }

    isOnline(profileID){
        return this.profiles[profileID]["lastSeen"]=="online";
    }




    profileObjIsAvailable(profileID){
        let profile=this.profiles[profileID];
        if(!profile){
            return false;
        }
        if(!profile.userID){
            return false;
        }
        return true;
    }




    recieveLastSeenSignalTestForAllProfiles(){
        // activeChat=ChatsDB.activeChat;
        // //get chat last seen detail
        // //probably with a socket handler
        // setTimeout(() => {
        //     let lastSeen=Math.round(Math.random()*1589065200000)+500000000000;
        //     ChatFuncs.updateChatLastSeen(activeChat, lastSeen);
        // }, 2000);
    }



    recieveLastSeenSignal(profileID, signal){
        const chatID=this.profiles[profileID]["chatID"];
        this.setLastSeen(profileID, signal);
        ChatFuncs.updateChatLastSeen(chatID);
    }

    recieveNameChangeSignal(profileID, name){
        const chatID=this.profiles[profileID]["chatID"];
        this.setName(profileID, name);
        ChatFuncs.updateChatName(chatID);
    }

    recieveP_pixChangeSignal(profileID, imgSrc){
        const chatID=this.profiles[profileID]["chatID"];
        this.setP_pix(profileID, imgSrc);
        ChatFuncs.updateChatImage(chatID);
    }


}

const MyProfile=new MyProfileInstance();
const ProfilesDB=new ProfilesDBInstance();



export{
    MyProfile,
    ProfilesDB
}