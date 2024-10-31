// import{
//     ChatsDB
// } from "./_tempDatabase/chats.js";

// import{
//     ChatFuncs
// } from "./_tempDatabase/chatsFunc.js";

import{
    PageClearDOM
} from "./DOM/pageLevelDOM/pageClearDOM.js";

import{
    PageCreateDOM
} from "./DOM/pageLevelDOM/pageCreateDOM.js";

import{
    PageLoadDOM
} from "./DOM/pageLevelDOM/pageLoadDOM.js";

// import{
//     MessageFuncs
// } from "./_tempDatabase/messageFuncs.js";

// import{
//     GenerateDummyDatabase
// } from "./_tempDatabase/_dummyDatabase.js";


PageClearDOM.section();
PageLoadDOM.messagesPage(PageCreateDOM.messagesPage());

// ChatFuncs.fetchChats();
// ChatFuncs.pushInFetchedChat();
// console.log(ChatsDB)


// setInterval(() => {
//     // console.log(22);
//     let id=Math.round(Math.random()*1589065200000)+500000000000;
//     let msgObj=GenerateDummyDatabase.messages(id, true);
//     MessageFuncs.addMessage(2, msgObj);
// }, 2000);



// let arr=[3,4,6,3,1,7,9,0,78,8,64,45,353,255,446,64,1,2,4,56,78];
// arr=arr.sort((a,b)=>{return b -a }).filter(num=>num<200);
// console.log(arr);