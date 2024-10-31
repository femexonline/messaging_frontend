import{
    Settings
} from "../_settings/settings.js";



const alertMsg=(errorCodeNumber)=>{
    let msg="There seam to be an error, please contact the Admin is this message persist";

    if(errorCodeNumber){
        msg=`Error ${errorCodeNumber}, please contact the Admin is this error persist`;
    }
    return msg;
}
const errorReportStatus=Settings.ErrorReport.status;
/*
    if status is set to 0, no err is reported
    if status is set to 1, alert user that there is an error
    if status is set to 2, console.log deveeloper error msg
    if status is set to 3, console.log deveeloper error msg and log

*/


//would be used in an algorithm
//to determine wether to alert
//user
const userIsAlerted={};
const allowUserAlert={};



class MyCodeErr{
    static announce(errMsg, errorCode, userErr=false, log=false){
        if(log){
            if(errorReportStatus===3){
                console.log(errorCode);
                return errMsg;
            }
            return;
        }
        
        if(errorReportStatus===0){
            return;
        }
        if(errorReportStatus===1){
            clearTimeout(allowUserAlert[errMsg]);

            let msg=alertMsg(errorCode);
            alert(msg);

            allowUserAlert[errMsg]=setTimeout(() => {
                userIsAlerted[errMsg]=false;
            }, 2000);
            return;
        }

        if(errorReportStatus===2){
            console.log(errorCode);
            return errMsg;
        }        
    }
}


export{
    MyCodeErr
}