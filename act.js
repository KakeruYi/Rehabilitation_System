function test(diff_angle,avg_angles){ //一完整的動作(可自由加入多肢體)
  
  joint_sequence = [];
  aim_joint_angles = [];  //用以儲存多個目標瞬時肢體絕對角度
  aim_joint_diff_angles = []; //用以儲存多個目標肢體瞬時兩時刻角度差
  joint_name = [];
  start_angle = []; //用以儲存多個目標肢體起點角度
  end_angle = [];  //用以儲存多個目標肢體終點角度
  ref_time = 60; //本動作參考時間
  
  //可任意增加、減少推入的內容
  
  //肢體一
  joint_sequence.push(0); //推入肢體(詳見關節對照.txt)
  start_angle.push(-30); //推入起點角度
  end_angle.push(30); //推入終點角度
  
  //肢體二
  joint_sequence.push(1);
  start_angle.push(-150);
  end_angle.push(150);
  
  //肢體三
  joint_sequence.push(2);
  start_angle.push(-45);
  end_angle.push(45);
  
  
  //肢體四
  joint_sequence.push(3); 
  start_angle.push(-135); 
  end_angle.push(135); 

  
  /*
  //肢體五
  joint_sequence.push(4);
  start_angle.push(-90);
  end_angle.push(-100);
  
  
  //肢體六
  joint_sequence.push(5); 
  start_angle.push(-90); 
  end_angle.push(-100); 
  
  //肢體七
  joint_sequence.push(6); 
  start_angle.push(-90);
  end_angle.push(-80); 

  //肢體八
  joint_sequence.push(7);
  start_angle.push(-90);
  end_angle.push(-100);
  */
  
  for(let i = 0;i<joint_sequence.length;i++){
    aim_joint_angles.push(avg_angles[joint_sequence[i]]);  //推入絕對角度
    aim_joint_diff_angles.push(diff_angle[joint_sequence[i]]); //推入角度差
    joint_name.push(joint_name_all[joint_sequence[i]]);  //推入肢體名稱
  }
  
  
  //有n個肢體，則需要算計n筆穩定度，故取joint_sequence陣列長度(同肢體數目)，建立空陣列
  var Rstable = new Array(joint_sequence.length);
  
  if (location_flag){ //location_flag用以表示是否進行定位(預備)，預設為1
    for(let i = 0;i < joint_sequence.length;i++){ 
      console.log(joint_name[i],"目前角度:",Math.round(aim_joint_angles[i]),"起點角度:",start_angle[i]); //遍歷每一個肢體，並告知使用者該肢體目前角度與應擺放角度
        
      
      if(location_check(aim_joint_angles[i],start_angle[i])){
        //函數檢測該肢體實際角度與正確角度是否在誤差內(誤差可自訂)，函數回傳true、false
        location_count[i]++; //檢測於誤差內，該肢體定位計數器+1
      } 
      else
        location_count[i] = 0 //一旦檢測到超出合理誤差，將該肢體定位計數器歸0
      console.log(location_count);
    }
    let location_done = 0; //紀錄定位完畢的肢體數目
    for(let i = 0;i < joint_sequence.length;i++){
      if(location_count[i] >= 5){ //若某肢體的計數器皆為連續5次以上在合理範圍內，判斷該肢體定位完畢，故location_done + 1
        location_done ++;
      }
    }
    console.log("已準備好的肢體數量 = ",location_done);
    if(location_done == joint_sequence.length){ //若準備好的肢體數量與肢體數目相同，開始評分
      for(let i = 0;i < joint_sequence.length;i++)
        location_count[i] = 0; //肢體定位計數器歸0
      location_done = 0; //定位成功肢體計數器歸0
      location_flag = 0; //定位模式關閉
      location_time = timer; //令location_time為定位完畢時的秒數
    }
  }
    

  if((location_flag==0) && (act_flag==1)){ //當定位模式為0、動作模式為1時
    var acc_score = []; //儲存每個肢體的完成度函數
    for(let i = 0;i < joint_sequence.length;i++){ //遍歷每一個肢體，計算其acc並打印
      acc_score[i] = Math.round(acc(start_angle[i],end_angle[i],aim_joint_angles[i]));
      //speed_hint(start_angle,end_angle,avg_angles[1],timer-location_time,ref_time);
      console.log(joint_name[i],"目前角度:",aim_joint_angles[i],"起點角度:",start_angle[i],"終點角度:",end_angle[i],"完成度:",acc_score[i],"當前時間:",timer-location_time);
      
    }
    //console.log("aim_joint_diff_angles:",aim_joint_diff_angles);
    diff_angles_storage.push(aim_joint_diff_angles); //將每個肢體的角度差推入diff_angles_storage

    for(let i = 0;i < joint_sequence.length;i++){
      if(acc_score[i]>=90){
        //Rstable[i] = Math.round(Stable_Rate_Dynamic()*100)/100;
        
        /*
        aim_joint_angles.splice(i,1);
        aim_joint_diff_angles.splice(i,1);
        start_angle.splice(i,1);
        end_angle.splice(i,1);
        */
        
      }
    }
    
    let all_done = 0;
    for(let i = 0;i < joint_sequence.length;i++){ //目前為測試，所有肢體維持在100%acc得評分結束(後續將修改)
      if(acc_score[i]==100)
        all_done ++; //每當一個姿勢維持在100%判定為做完，all_done + 1
      else
        all_done = 0;
    }
    var Rextinct = Math.round(Extinct_Rate(ref_time,timer-location_time)*100)/100;
    
    if(all_done == joint_sequence.length || (Rextinct<0.4 && ((timer-location_time-ref_time)>0))){ //all_done數量與肢體數量符合，得最終評分
      //console.log(diff_angles_storage);
      diff_angles_storage = transposeArray(diff_angles_storage);
      //console.log(diff_angles_storage);
      for(let i = 0;i < joint_sequence.length;i++){
        diff_angles_storage[i].shift();
      }  
      console.log("-----------------------------");
      for(let i = 0;i < joint_sequence.length;i++){
        console.log(joint_name[i],"完成度=",acc_score[i],"分");
      }
      console.log("-----------------------------");
      for(let i = 0;i < joint_sequence.length;i++){
        Rstable[i] = Math.round(Stable_Rate_Dynamic(diff_angles_storage[i])*100)/100;
        console.log(joint_name[i],"穩定度=",Rstable[i]*100,"分");
      }
      console.log("-----------------------------");
      console.log("時間評分=",Rextinct*100,"分","(標準時間:",ref_time,"實際時間:",timer-location_time,")");
      console.log("-----------------------------");
      for(let i = 0;i < joint_sequence.length;i++){
        console.log(joint_name[i],"總分:",Math.round(acc_score[i]*Rstable[i]*Rextinct*100)/100);
        act_flag = 0;
      }
    }

  }
}


