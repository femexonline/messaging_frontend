import{
    formatDate
} from "../_timeFunc/dateFormatter.js";



class TimeFunctions{
    static generateTimeSentStringT1(timeInMiliseconds){
        let timeSentString;
    
        let hours24InMiliSecs=24*60*60*1000;
        let todayInMiliSe=new Date;
        todayInMiliSe.setHours(0, 0, 0);
        todayInMiliSe=Date.parse(todayInMiliSe);
        let yesterdayInMiliSe=todayInMiliSe-hours24InMiliSecs;
        let tomorrowInMiliSec=todayInMiliSe+hours24InMiliSecs;
    
        let dateDetails={
            "isMiliseconds":true
        };
        //before yesterday
        let arrangement="db-mmb-yyyy";
    
        //yesterday
        if(timeInMiliseconds >= yesterdayInMiliSe){
            arrangement=null;
            timeSentString="Yesterday";
        }
        //today
        if(timeInMiliseconds >= todayInMiliSe){
            arrangement=null;
            timeSentString="Today";
        }
        //after today
        if(timeInMiliseconds >= tomorrowInMiliSec){
            arrangement="db-mmb-yyyy";
        }
    
        if(arrangement){
            timeSentString=formatDate(arrangement, timeInMiliseconds, dateDetails);
        }
    
    
        return timeSentString;
    }

    static generateTimeSentStringT2(timeInMiliseconds){
        let timeSentString;
    
        let dateDetails={
            "isMiliseconds":true
        };
        let arrangement="h:i apM";
    
        timeSentString=formatDate(arrangement, timeInMiliseconds, dateDetails);
    
    
        return timeSentString;
    }
}


export{
    TimeFunctions
}