<?php
    $time=microtime(true);
    $time=date("d-m-Y h:m:sa", $time);
    echo $time;
    echo "<br/>";

    $time=microtime(true);


?>
<script>
    //geting microtime from php
    let time="<?php echo $time; ?>";
    console.log(time);
    time=time*1000; //convert microsecons to miliseconds
    console.log(time);
    time=parseInt(time);//convert float to int
    console.log(time);

    time= new Date(time);

    console.log(time);

    time= new Date();
    time=time.getTime();
    console.log(time);




    // const PATTERN="yyyy|yy|y|mmmm|mmm|mm|mmb|m|DDDD|DDD|D|d|db|h|hb|i|ib|s|sb";
    const PATTERN="\\byyyy\\b|\\byy\\b|\\by\\b|\\bmmmm\\b|\\bmmm\\b|\\bmm\\b|\\bmmb\\b|\\bm\\b|\\bDDDD\\b|\\bDDD\\b|\\bD\\b|\\bd\\b|\\bdb\\b|\\bh\\b|\\bhb\\b|\\bi\\b|\\bib\\b|\\bs\\b|\\bsb\\b";
    const getDatePatternFull=()=>{
        let datePatternFull;
        datePatternFull="/\\b("+PATTERN+"\\b)/";
        datePatternFull=eval(datePatternFull);
        console.log(datePatternFull);

        return datePatternFull;
    }
    const getDatePattern=()=>{
        let datePattern;
        datePattern="/\\b"+PATTERN+"\\b/";
        datePattern=eval(datePattern);
        console.log(datePattern);

        return datePattern;
    }
    const getSeparatorPattern=(separatorArr)=>{
        // /-| /
        let separatorPatternBefor=separatorArr;
        separatorPatternBefor.sort(
            (a, b)=>{
                return b.length - a.length;
            }
        );
        
        let separatorPattern="";
        let index=null;
        separatorPatternBefor.forEach(elem => {
            if(separatorPattern){separatorPattern=separatorPattern+"|";}
            separatorPattern=separatorPattern+elem;
        });
        separatorPattern="/"+separatorPattern+"/";
        separatorPattern=eval(separatorPattern);
        


        return separatorPattern;
    }
    const rearrangeSeparatorArr=(dateFomatArr, separatorArr)=>{
        let index=0;
        let newSeparatorArr=[];
        dateFomatArr.forEach(element => {
            if(separatorArr.indexOf(element) > -1){
                newSeparatorArr.push(element);
            }
        });

        return newSeparatorArr;
    }
    // const generateHardCoddedPattern=(posibleDateFomatValues)=>{
    //     let  jjjjj="";
    //     let jjddh=null;
    //     Object.values(posibleDateFomatValues).forEach(element => {
    //         element.forEach(element => {
    //             if(jjddh){
    //                 jjjjj+="|";
    //             }
    //             jjjjj+="\\b";
    //             jjjjj+=element;
    //             jjjjj+="\\b";
    //             jjddh++;
    //         });
    //     });

    //     document.write(jjjjj);
    //     console.log(jjjjj);
    //     document.write("<br/>");
    // }
    // generateHardCoddedPattern(posibleDateFomatValues);







    const defaultDateFomatValues={
        "year":"yyyy",
        "month":"mm",
        "day":"DDDD"
    }






    const posibleDateFomatValues={
        /* dateFomatObj parameter to expect
            arrangement: string, default="y-m-d h:s:i"
            year: string, default="yyyy"
            month: string, default="mmmm"
            day: string, default="DDDD"
            date: string, default="dd"
            hour: string, default="h"
            minute: string, default="i"
            second: string, default="s"
            is12hours: bool, default=false or null
        */


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
            "d", //2
            "db", //02
        ],
        "hour":[
            "h", //2
            "hb", //02
        ],
        "minute":[
            "i", //2
            "ib", //02
        ],
        "second":[
            "s", //2
            "sb", //02
        ]
    }
    const yearTextToYear=(year, fomart)=>{
        /*parameters expects
            fomart: string //sigle date fomat e.g "yyyy"
            year: string or int //year as a four digit number (yyyy)
        */
        // "yyyy", //2090
        // "yy", //90
        // "y" //short form for yyyy or default

        if(fomart=="y"){fomart="yyyy";} //set default

        let setYear=false;
        if(fomart=="yyyy"){
            return year;
        }
        if(fomart=="yy"){
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
            fomart: string //sigle date fomat e.g "mmmm"
            month: string or int //month as a number (0-11)
        */
        // "mmmm", //feburary
        // "mmm", //feb
        // "mm", //2
        // "mmb", //02
        // "m" //short form for mm or default

        if(fomart=="m"){fomart="mmmm";} //set default

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
            if(month.length > 1){
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
            fomart: string //sigle date fomat e.g "DDDD"
            day: string or int //the weekday of a date as a number (0-6)
        */
        // "DDDD", //friday
        // "DDD", //fri
        // "D" //short form for DDDD or default

        if(fomart=="D"){fomart="DDDD";} //set default

        let setDay=false;
        if(fomart=="DDDD"){
            return dayNamesArr[day][0];
        }
        if(fomart=="DDD"){
            return dayNamesArr[day][1];
        }
        

        return setDay;
    }
    const dateTextToDate=(date, fomart)=>{
        /*parameters expects
            fomart: string //sigle date fomat e.g "d"
            date: string or int //the day of a date as a number (1-31)
        */
        // "d", //2
        // "db", //02

        let setDate=false;
        if(fomart=="d"){
            return date;
        }
        if(fomart=="db"){
            if(date.length > 1){
                return date;
            }
            return "0"+date;
        }
        

        return setDate;
    }
    const hourTextToHour=(hour, fomart)=>{
        /*parameters expects
            fomart: string //sigle hour fomat e.g "h"
            hour: string or int //the hours of a date as a number (0-23)
        */
        // "h", //2
        // "hb", //02

        let setHour=false;
        if(fomart=="h"){
            return hour;
        }
        if(fomart=="hb"){
            if(hour.length > 1){
                return hour;
            }
            return "0"+hour;
        }
        

        return setHour;
    }
    const minuteTextToMinute=(minute, fomart)=>{
        /*parameters expects
            fomart: string //sigle minute fomat e.g "i"
            minute: string or int //the minutes of a date as a number (0-59)
        */
        // "i", //2
        // "ib", //02

        let setMinute=false;
        if(fomart=="i"){
            return minute;
        }
        if(fomart=="ib"){
            if(minute.length > 1){
                return minute;
            }
            return "0"+minute;
        }
        

        return setMinute;
    }
    const secondTextToSecond=(second, fomart)=>{
        /*parameters expects
            fomart: string //sigle second fomat e.g "s"
            second: string or int //the seconds of a date as a number (0-59)
        */
        // "s", //2
        // "sb", //02

        let setSecond=false;
        if(fomart=="s"){
            return second;
        }
        if(fomart=="sb"){
            if(second.length > 1){
                return second;
            }
            return "0"+second;
        }
        

        return setSecond;
    }
    const fullDateTextToDate=(dateFomart, date)=>{
        /*parameters expects
            dateFomart: string //sigle date fomat e.g "yyyy"
            date: int //date in miliseconds
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
            return dateTextToDate(datee, dateFomart);
        }
        if(PDFV["hour"].indexOf(dateFomart) > -1){
            let hour=date.getHours();
            return hourTextToHour(hour, dateFomart);
        }
        if(PDFV["minute"].indexOf(dateFomart) > -1){
            let minute=date.getMinutes();
            return minuteTextToMinute(minute, dateFomart);
        }
        if(PDFV["second"].indexOf(dateFomart) > -1){
            let second=date.getSeconds();
            return secondTextToSecond(second, dateFomart);
        }
        

        return elem;
    }









    const getDateFromSeconds=(arrangement=null, msDate=null, dateDetails=null)=>{
        /* parameter to expect
            arrangement: string, default="y-m-d h:s:i"
            msDate: string or int or float or date object, date in milisec or microsec
            dateDetails: object of object, or null
        */
        /* dateDetails parameter to expect
            is12hours: bool, default=false or null
            isMiliseconds: bool, default=false or null
            isPHPMicroSeconds: bool, default=false or null
            returnAsObject: bool, default=false or null
        */

        //set and declear variables
        if(!dateDetails){dateDetails={};}
        if(!arrangement){arrangement="y-m-d h:s:i";}
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
                msDate=new Date(msDate);
            }
        }
        if(typeof (msDate)!="object"){
            let err="The date you choose is invalid";
            alert(err);
            console.log(err);
            return;
        }

        //check f parameters are valid


        //get date and time arrangemt
        //this would be used to check if seperator or date comes first
        const datePatternFull=getDatePatternFull();
        const dateFomatArr=arrangement.split(datePatternFull);
        dateFomatArr.map(
            (elem, index, arr)=>{
                if(elem!==""){
                    return elem;
                }else{
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
                if(elem!==""){
                    return elem;
                }else{
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
                if(elem!==""){
                    return fullDateTextToDate(elem, msDate);
                }else{
                    arr.splice(index, 1);
                    arr=arr;
                }
            }
        );

        //convet dateArr elems from text to date
        const convertedDateArr=dateArr.map(
            (elem)=>{
                return (fullDateTextToDate(elem, msDate));
            }
        );

        //rearange separator array
        const arrangedSeparatorArr=rearrangeSeparatorArr(dateFomatArr, separatorArr);

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
        // console.log(dateFomatArr);
        // console.log(separatorArr);
        // console.log(arrangedSeparatorArr);
        // console.log(dateArr);
        // console.log(convertedDateArr);

        return result;
    }
    let textDate="Today is mmmm d, yyyy on a DDDD";
    let dateeee=getDateFromSeconds(textDate);
    console.log(dateeee);
    document.write(dateeee);



</script>