const getDate=(date)=>new Date().toISOString().split("T")[0] 

const calcYears=(date1,date2=null)=>{
  let firstDate = new Date(date1);
  let d1 = firstDate.getDate();
  let m1 = firstDate.getMonth() + 1;
  let y1 = firstDate.getFullYear();

  let secondDate=date2?new Date(date2):new Date()
 
  let d2 = secondDate.getDate();
  let m2 = secondDate.getMonth() + 1;
  let y2 = secondDate.getFullYear();

  let y3;

  y3 = y2 - y1;
  if(m2 >= m1){
      if (d2<d1&&m2==m1)
        y3--
  } else {
      y3--;
  }

  return y3  
}

// 
const addYears=(years,date=null)=>{
  let fecha=date?new Date(date):new Date()

  let newYear=fecha.getFullYear()+years
  return `${newYear}-${(fecha.getMonth()+1).toString().padStart(2,'0')}-${fecha.getDate().toString().padStart(2,'0')}`
}





