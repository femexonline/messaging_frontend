import {
    Defaults
} from "./defaults.js";

const posibleDateFomatValues={
    "year":[
        "yyyy", //2090
        "yy", //90
        "y" //short form for yyyy or default
    ],
    "month":[
        "mmmm", //feburary
        "mmm", //feb
        "mm", //2
        "mmb", //02
        "m" //short form for mm or default
    ],
    "day":[
        "DDDD", //friday
        "DDD", //fri
        "D" //short form for DDDD or default
    ],
    "date":[
        "dtH", //2nd
        "dTH", //2ND
        "d", //2
        "db", //02
    ],
    "hour":[
        "h", //02
        "hb", //2
    ],
    "minute":[
        "i", //02
        "ib", //2
    ],
    "second":[
        "s", //02
        "sb", //2
    ],
    "midday":[
        "apM", //am
        "aPM", //AM
    ]
}

const yearTextToYear=(year, fomart)=>{
    /*parameters expects
        year: string or int //year as a four digit number (yyyy)
        fomart: string //sigle date fomat e.g "yyyy"
    */
    // "yyyy", //2090
    // "yy", //90
    // "y" //short form for yyyy or default

    if(fomart=="y"){
        fomart=Defaults["year"];
        if(posibleDateFomatValues["year"].indexOf(fomart) < 0){
            fomart="yyyy";
        }
        if(fomart=="y"){
            fomart="yyyy";
        }
    } //set default

    let setYear=false;
    if(fomart=="yyyy"){
        return year;
    }
    if(fomart=="yy"){
        year=String(year);
        return year.substr(-2);
    }

    return setYear;
}

const monthNamesArr=[
    ["January", "Jan"],
    ["February", "Feb"],
    ["March", "Mar"],
    ["April", "Apr"],
    ["May", "May"],
    ["June", "Jun"],
    ["July", "Jul"],
    ["August", "Aug"],
    ["September", "Sep"], //sept
    ["October", "Oct"],
    ["November", "Nov"],
    ["December", "Dec"],
]

const monthTextToMonth=(month, fomart)=>{
    /*parameters expects
        month: string or int //month as a number (0-11)
        fomart: string //sigle date fomat e.g "mmmm"
    */
    // "mmmm", //feburary
    // "mmm", //feb
    // "mm", //2
    // "mmb", //02
    // "m" //short form for mm or default

    if(fomart=="m"){
        fomart=Defaults["month"];
        if(posibleDateFomatValues["month"].indexOf(fomart) < 0){
            fomart="mmmmm";
        }
        if(fomart=="m"){
            fomart="mmmmm";
        }
    } //set default

    let setMonth=false;
    if(fomart=="mmmm"){
        return monthNamesArr[month][0];
    }
    if(fomart=="mmm"){
        return monthNamesArr[month][1];
    }
    if(fomart=="mm"){
        month++;
        return month;
    }
    if(fomart=="mmb"){
        month++;
        if(String(month).length > 1){
            return month;
        }
        return "0"+month;
    }
    

    return setMonth;
}

const dayNamesArr=[
    ["Sunday", "Sun"],
    ["Monday", "Mon"],
    ["Tuesday", "Tue"], //Tues
    ["Wednesday", "Wed"],
    ["Thursday", "Thu"], //Thur, Thurs
    ["Friday", "Fri"],
    ["Saturday", "Sat"]
]

const dayTextToDay=(day, fomart)=>{
    /*parameters expects
        day: string or int //the weekday of a date as a number (0-6)
        fomart: string //sigle date fomat e.g "DDDD"
    */
    // "DDDD", //friday
    // "DDD", //fri
    // "D" //short form for DDDD or default

    if(fomart=="D"){
        fomart=Defaults["day"];
        if(posibleDateFomatValues["day"].indexOf(fomart) < 0){
            fomart="DDDD";
        }
        if(fomart=="D"){
            fomart="DDDD";
        }
    } //set default

    let setDay=false;
    if(fomart=="DDDD"){
        return dayNamesArr[day][0];
    }
    if(fomart=="DDD"){
        return dayNamesArr[day][1];
    }
    

    return setDay;
}

const dateTextToDate=(date, fomart, dateDetails)=>{
    /*parameters expects
        date: string or int //the day of a date as a number (1-31)
        fomart: string //sigle date fomat e.g "d"
        dateDetails: object of object, or null
    */
    // "dtH", //2nd
    // "dTH", //2ND
    // "d", //2
    // "db", //02

    let setDate=false;
    if(fomart=="d"){
        return date;
    }
    if(fomart=="db"){
        if(String(date).length > 1){
            return date;
        }
        return "0"+date;
    }

    date=String(date);
    let th="th";
    let lastDigit=date.split("").splice(-1);
    if(lastDigit==1){th="st"}
    if(lastDigit==2){th="nd"}
    if(lastDigit==3){th="rd"}

    if(fomart=="dtH"){
        th=dateDetails["beforeTH"]+th+dateDetails["afterTH"];
        date+=th;
        return date;
    }
    if(fomart=="dTH"){
        th=th.toUpperCase();
        th=dateDetails["beforeTH"]+th+dateDetails["afterTH"];
        date+=th;
        return date;
    }
    

    return setDate;
}

const hourTextToHour=(hour, fomart, is12hours)=>{
    /*parameters expects
        hour: string or int //the hours of a date as a number (0-23)
        fomart: string //sigle hour fomat e.g "h"
    */
    // "h", //02
    // "hb", //2

    let setHour=false;
    if(is12hours){
        if(hour===0){
            hour=12
        }else{
            if(hour>12){
                hour=hour-12;
            }
        }
    }

    if(fomart=="h"){
        if(String(hour).length > 1){
            return hour;
        }
        return "0"+hour;
    }
    if(fomart=="hb"){
        return hour;
    }
    

    return setHour;
}

const minuteTextToMinute=(minute, fomart)=>{
    /*parameters expects
        minute: string or int //the minutes of a date as a number (0-59)
        fomart: string //sigle minute fomat e.g "i"
    */
    // "i", //02
    // "ib", //2

    let setMinute=false;
    if(fomart=="i"){
        if(String(minute).length > 1){
            return minute;
        }
        return "0"+minute;
    }
    if(fomart=="ib"){
        return minute;
    }
    

    return setMinute;
}

const secondTextToSecond=(second, fomart)=>{
    /*parameters expects
        second: string or int //the seconds of a date as a number (0-59)
        fomart: string //sigle second fomat e.g "s"
    */
    // "s", //02
    // "sb", //2

    let setSecond=false;
    if(fomart=="s"){
        if(String(second).length > 1){
            return second;
        }
        return "0"+second;
    }
    if(fomart=="sb"){
        return second;
    }
    

    return setSecond;
}

const middayTextToMidday=(hour, fomart)=>{
    /*parameters expects
        hour: string or int //the hours of a date as a number (0-23)
        fomart: string //sigle midday fomat e.g "s"
    */
    //  "apM", //am
    //  "aPM", //AM

    let setMidday=false;
    let midday="am";
    if(hour > 11){midday="pm";}

    if(fomart=="apM"){
        return midday;
    }
    if(fomart=="aPM"){
        midday=midday.toUpperCase();
        return midday;
    }
    

    return setMidday;
}

const fullDateTextToDate=(dateFomart, date, is12hours, dateDetails)=>{
    /*parameters expects
        dateFomart: string //sigle date fomat e.g "yyyy"
        date: int //jS date object
        is12hours: bool
        dateDetails: object of object, or null
    */
    let elem=false;
    const PDFV=posibleDateFomatValues;

    //check if it is year
    if(PDFV["year"].indexOf(dateFomart) > -1){
        let year=date.getFullYear();
        return yearTextToYear(year, dateFomart);
    }
    if(PDFV["month"].indexOf(dateFomart) > -1){
        let month=date.getMonth();
        return monthTextToMonth(month, dateFomart);
    }
    if(PDFV["day"].indexOf(dateFomart) > -1){
        let day=date.getDay();
        return dayTextToDay(day, dateFomart);
    }
    if(PDFV["date"].indexOf(dateFomart) > -1){
        let datee=date.getDate();
        return dateTextToDate(datee, dateFomart, dateDetails);
    }
    if(PDFV["hour"].indexOf(dateFomart) > -1){
        let hour=date.getHours();
        return hourTextToHour(hour, dateFomart, is12hours);
    }
    if(PDFV["minute"].indexOf(dateFomart) > -1){
        let minute=date.getMinutes();
        return minuteTextToMinute(minute, dateFomart);
    }
    if(PDFV["second"].indexOf(dateFomart) > -1){
        let second=date.getSeconds();
        return secondTextToSecond(second, dateFomart);
    }
    if(PDFV["midday"].indexOf(dateFomart) > -1){
        let hour=date.getHours();
        return middayTextToMidday(hour, dateFomart);
    }

    return elem;
}


export{
    fullDateTextToDate
}
