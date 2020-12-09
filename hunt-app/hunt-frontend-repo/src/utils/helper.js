import dayjs from 'dayjs';
 
export function getDiffTime(val){
    const day1 = dayjs(val);
    const day2 = dayjs() ;
    
    const day = day1.diff(day2,'day');
    console.log("expired days", day); 
    var timeExpired =<span style={{fontSize:12}}>{`expire in ${day} days`}</span>; 
    if(day <=0 ){
      const hours = day1.diff(day2,'hour');
      if(hours >=0 ){
        console.log("expired hour", hours);
        timeExpired =<span style={{fontSize:12}}>{`expire in ${day} days ${hours} hours`}</span>;
      }else{
        console.log("expired");
        timeExpired = <span style={{fontSize:12, color:'#333'}}>{ `end ${dayjs(val, "MM-DD-YYYY") } `}</span>; 
      }
    } 
         
    return timeExpired
  
}

export function getVoites(my, options){

    var total = 0; 
    options.map(function(opt){
        total = total + opt.votes;
    });
    return parseInt( ( (my / total ) * 100) );
  }
  