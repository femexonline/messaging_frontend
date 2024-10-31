import {
    Defaults
} from "./defaults.js";

import {
    fullDateTextToDate
} from "./converters.js";

import {
    getDatePatternFull,
    getDatePattern,
    getSeparatorPattern,
    rearrangeSeparatorArr
} from "./patterns.js";




const formatDate=(arrangement=null, msDate=null, dateDetails=null)=>{
    /* parameter to expect
        arrangement: string, default="y-m-d h:s:i"
        msDate: string or int or float or date object, date in milisec or microsec
        dateDetails: object of object, or null
    */
    /* dateDetails parameter to expect
        isMiliseconds: bool, default=false or null
        isPHPMicroSeconds: bool, default=false or null
        beforeTH: string, default=""
        afterTH string, default=""
    */

    //set and declear variables
    if(!dateDetails){dateDetails={};}
    if(!arrangement){
        arrangement=Defaults["arrangement"];
        if(!arrangement){
            arrangement="y-m-d h:i:s--apM";
        }
    }
    //get msDate ready for use
    if(!msDate){
        msDate=new Date();
        dateDetails["isMiliseconds"]=false;
        dateDetails["isPHPMicroSeconds"]=false;
    }
    if(dateDetails["isPHPMicroSeconds"]){
        if(dateDetails["isPHPMicroSeconds"]===true){
            msDate=msDate*1000; //convert microsecons to miliseconds
            if(typeof (msDate)!="number"){
                let err="The date you choose is invalid";
                alert(err);
                console.log(err);
                return;
            }
            dateDetails["isMiliseconds"]=true;
        }
    }
    if(dateDetails["isMiliseconds"]){
        if(dateDetails["isMiliseconds"]===true){
            msDate=parseInt(msDate);//convert float to int
            if(typeof (msDate)!="number"){
                let err="The date you choose is invalid";
                alert(err);
                console.log(err);
                return;
            }
            msDate=new Date(msDate);
        }
    }
    if(typeof (msDate)!="object"){
        let err="The date you choose is invalid";
        alert(err);
        console.log(err);
        return;
    }
    if(!dateDetails["beforeTH"]){
        dateDetails["beforeTH"]=Defaults["beforeTH"];
        if(dateDetails["beforeTH"]===null){dateDetails["beforeTH"]="";}
    }
    if(!dateDetails["afterTH"]){
        dateDetails["afterTH"]=Defaults["afterTH"];
        if(dateDetails["afterTH"]===null){dateDetails["afterTH"]="";}
    }
    const is12hours=/apM|aPM/.test(arrangement);

    //check f parameters are valid


    //get date and time arrangemt
    //this would be used to check if seperator or date comes first
    const datePatternFull=getDatePatternFull();
    const dateFomatArr=arrangement.split(datePatternFull);
    dateFomatArr.map(
        (elem, index, arr)=>{
            if(elem==""){
                arr.splice(index, 1);
                arr=arr;
            }
        }
    );

    //get separator array
    const datePattern=getDatePattern();
    const separatorArr=arrangement.split(datePattern);
    separatorArr.map(
        (elem, index, arr)=>{
            if(elem==""){
                arr.splice(index, 1);
                arr=arr;
            }
        }
    );
    //get date array
    const separatorPattern=getSeparatorPattern(separatorArr);
    const dateArr=arrangement.split(separatorPattern);
    //convet dateArr elems from text to date
    dateArr.map(
        (elem, index, arr)=>{
            if(elem==""){
                arr.splice(index, 1);
                arr=arr;
            }
        }
    );

    //convet dateArr elems from text to date
    const convertedDateArr=dateArr.map(
        (elem)=>{
            return (fullDateTextToDate(elem, msDate, is12hours, dateDetails));
        }
    );

    //rearange separator array
    const arrangedSeparatorArr=rearrangeSeparatorArr(dateFomatArr, separatorArr);
    //remove double hyphn separator
    arrangedSeparatorArr.map(
        (elem, index, arr)=>{
            if(/--/.test(elem)){
                arr[index]=elem.replace(/--/, "");
            }
        }
    );

    let result="";
    //join the dates together
    if(datePattern.test(dateFomatArr[0])){
        let index=0;
        convertedDateArr.forEach(elem => {
            result+=elem;
            if(arrangedSeparatorArr[index]){
                result+=arrangedSeparatorArr[index];
            }
            index++;
        });
    }else{
        let index=0;
        arrangedSeparatorArr.forEach(elem => {
            result+=elem;
            if(convertedDateArr[index]){
                result+=convertedDateArr[index];
            }
            index++;
        });
    }
    // console.log("dateFomatArr", dateFomatArr);
    // console.log("separatorArr", separatorArr);
    // console.log("arrangedSeparatorArr", arrangedSeparatorArr);
    // console.log("dateArr", dateArr);
    // console.log("convertedDateArr", convertedDateArr);

    return result;
}
// let textDate="Today is mmmm d, yyyy on a DDDD";
// let dateeee=formatDate();
// console.log(dateeee);
// document.write(dateeee);



export{
    formatDate
}