    

// const PATTERN="yyyy|yy|y|mmmm|mmm|mm|mmb|m|DDDD|DDD|D|d|db|h|hb|i|ib|s|sb";
const PATTERN="\\byyyy\\b|\\byy\\b|\\by\\b|\\bmmmm\\b|\\bmmm\\b|\\bmm\\b|\\bmmb\\b|\\bm\\b|\\bDDDD\\b|\\bDDD\\b|\\bD\\b|\\bdtH\\b|\\bdTH\\b|\\bd\\b|\\bdb\\b|\\bh\\b|\\bhb\\b|\\bi\\b|\\bib\\b|\\bs\\b|\\bsb\\b|\\bapM\\b|\\baPM\\b";
const getDatePatternFull=()=>{
    let datePatternFull;
    datePatternFull="/\\b("+PATTERN+"\\b)/";
    datePatternFull=eval(datePatternFull);
    // console.log(datePatternFull);

    return datePatternFull;
}

const getDatePattern=()=>{
    let datePattern;
    datePattern="/\\b"+PATTERN+"\\b/";
    datePattern=eval(datePattern);

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
    separatorPatternBefor.forEach(elem => {
        if(separatorPattern){separatorPattern=separatorPattern+"|";}
        separatorPattern=separatorPattern+elem;
    });
    separatorPattern="/"+separatorPattern+"/";
    separatorPattern=eval(separatorPattern);

    return separatorPattern;
}

const rearrangeSeparatorArr=(dateFomatArr, separatorArr)=>{
    let newSeparatorArr=[];
    dateFomatArr.forEach(element => {
        if(separatorArr.indexOf(element) > -1){
            newSeparatorArr.push(element);
        }
    });

    return newSeparatorArr;
}



export{
    getDatePatternFull,
    getDatePattern,
    getSeparatorPattern,
    rearrangeSeparatorArr
}