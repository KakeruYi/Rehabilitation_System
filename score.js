function location_check(abs_angle,start_angle){
  var delta = abs(abs_angle-start_angle);
  if(delta < 20)
    return true;
  else
    return false;
}

function acc(start,end,theta){
  var acc = (subtractAngles(start,theta)/subtractAngles(start,end))*100;
  acc = min(100,max(0,acc));
  return acc;
}

function score_acc(acc){return (100/log(100))*log(acc);}

function Stable_Rate_Dynamic(arr){
  let avg=0;
  let sum=0;
  
  for(let i=0;i<arr.length;i++){
    avg += arr[i];
  }
  
  avg = avg/arr.length;
  
  for(let i=0;i<arr.length;i++){
    sum = sum+((arr[i]-avg)*(arr[i]-avg));
  }
  std = sqrt(sum/arr.length);
  //std = (sum/arr.length);
  unstable_rate = (std/sqrt(arr.length))/abs(avg);
  //unstable_rate = (std/sqrt(arr.length))/(abs(avg)*abs(avg));
  unstable_rate = min(1,unstable_rate);
  stable_rate = 1 - unstable_rate;
  return stable_rate;
}


function Stable_Rate_Static(arr,offset){
  let sum=0;
  
  for(let i=0;i<arr.length;i++){
    sum = sum+((arr[i]-offset)*(arr[i]-offset));
  }
  var variance = (sum/arr.length);
  
  unstable_rate = variance/offset;
  unstable_rate = min(1,unstable_rate);
  stable_rate = 1 - unstable_rate;
  return stable_rate;
}

function Extinct_Rate(ref_time,time){
  var delta_time = time - ref_time;
  var delay_scale = 6;
  var advance_scale = 4;
  if (delta_time>=0){
    if ((1.0894-0.0894*exp((25*delta_time)/(delay_scale*ref_time)))>0)
      return (1.0894-0.0894*exp((25*delta_time)/(delay_scale*ref_time)));
    else
      return 0;
  }
  else{
    if ((1.0894-0.0894*exp((25*abs(delta_time))/(advance_scale*ref_time)))>0)
      return (1.0894-0.0894*exp((25*abs(delta_time))/(advance_scale*ref_time)));
    else
      return 0;
  }
}

function speed_hint(start,end,theta,time,ref_time){
  var time_scale = time/ref_time;
  var ref_theta = time_scale * subtractAngles(start,end) + start;
  if(acc(start,end,theta) > 1.2*acc(start,end,ref_theta)){
    console.log("速度過快");
  }
  else if(acc(start,end,theta) < 0.8*acc(start,end,ref_theta)){
    console.log("速度過慢");
  }
  else
    console.log("速度正常");
}

function Total_Score(score_acc,Stable_Rate,Extinct_Rate){
  return (score_acc*Stable_Rate*Extinct_Rate);
}
