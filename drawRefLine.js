function drawRefLine(){
  var r = 100;
  var refX;
  var refY;
  var refX1;
  var refY1;
  var refX2;
  var refY2;
  stroke(0, 128, 128);
  strokeWeight(4);
  if(location_flag==1){
    if(joint_sequence.includes(0) || joint_sequence.includes(2)){
      if(joint_sequence.includes(0) && joint_sequence.includes(2)){
        refX1 = all_coordinate[0][0] + r*cos(radians(start_angle[joint_sequence.indexOf(0)]));
        refY1 = all_coordinate[0][1] - r*sin(radians(start_angle[joint_sequence.indexOf(0)]));
        
        refX2 = refX1 + r*cos(radians(start_angle[joint_sequence.indexOf(2)]));
        refY2 = refY1 - r*sin(radians(start_angle[joint_sequence.indexOf(2)]));
        
        line(all_coordinate[0][0],all_coordinate[0][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(0)){
          refX = all_coordinate[0][0] + r*cos(radians(start_angle[joint_sequence.indexOf(0)]));
          refY = all_coordinate[0][1] - r*sin(radians(start_angle[joint_sequence.indexOf(0)]));
          line(all_coordinate[0][0],all_coordinate[0][1],refX,refY);
        }
        else{
          refX = all_coordinate[4][0] + r*cos(radians(start_angle[joint_sequence.indexOf(2)]));
          refY = all_coordinate[4][1] - r*sin(radians(start_angle[joint_sequence.indexOf(2)]));
          line(all_coordinate[4][0],all_coordinate[4][1],refX,refY);
        }
      }
    }
    
    if(joint_sequence.includes(1) || joint_sequence.includes(3)){
      if(joint_sequence.includes(1) && joint_sequence.includes(3)){
        refX1 = all_coordinate[2][0] + r*cos(radians(start_angle[joint_sequence.indexOf(1)]));
        refY1 = all_coordinate[2][1] - r*sin(radians(start_angle[joint_sequence.indexOf(1)]));

        refX2 = refX1 + r*cos(radians(start_angle[joint_sequence.indexOf(3)]));
        refY2 = refY1 - r*sin(radians(start_angle[joint_sequence.indexOf(3)]));

        line(all_coordinate[2][0],all_coordinate[2][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(1)){
          refX = all_coordinate[2][0] + r*cos(radians(start_angle[joint_sequence.indexOf(1)]));
          refY = all_coordinate[2][1] - r*sin(radians(start_angle[joint_sequence.indexOf(1)]));
          line(all_coordinate[2][0],all_coordinate[2][1],refX,refY);
        }
        else{
          refX = all_coordinate[6][0] + r*cos(radians(start_angle[joint_sequence.indexOf(3)]));
          refY = all_coordinate[6][1] - r*sin(radians(start_angle[joint_sequence.indexOf(3)]));
          line(all_coordinate[6][0],all_coordinate[6][1],refX,refY);
        }
      }
    }
    if(joint_sequence.includes(4) || joint_sequence.includes(6)){
      if(joint_sequence.includes(4) && joint_sequence.includes(6)){
        refX1 = all_coordinate[8][0] + r*cos(radians(start_angle[joint_sequence.indexOf(4)]));
        refY1 = all_coordinate[8][1] - r*sin(radians(start_angle[joint_sequence.indexOf(4)]));

        refX2 = refX1 + r*cos(radians(start_angle[joint_sequence.indexOf(6)]));
        refY2 = refY1 - r*sin(radians(start_angle[joint_sequence.indexOf(6)]));

        line(all_coordinate[8][0],all_coordinate[8][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(4)){
          refX = all_coordinate[8][0] + r*cos(radians(start_angle[joint_sequence.indexOf(4)]));
          refY = all_coordinate[8][1] - r*sin(radians(start_angle[joint_sequence.indexOf(4)]));
          line(all_coordinate[8][0],all_coordinate[8][1],refX,refY);
        }
        else{
          refX = all_coordinate[12][0] + r*cos(radians(start_angle[joint_sequence.indexOf(6)]));
          refY = all_coordinate[12][1] - r*sin(radians(start_angle[joint_sequence.indexOf(6)]));
          line(all_coordinate[12][0],all_coordinate[12][1],refX,refY);
        }
      }
    }
    
    if(joint_sequence.includes(5) || joint_sequence.includes(7)){
      if(joint_sequence.includes(5) && joint_sequence.includes(7)){
        refX1 = all_coordinate[10][0] + r*cos(radians(start_angle[joint_sequence.indexOf(5)]));
        refY1 = all_coordinate[10][1] - r*sin(radians(start_angle[joint_sequence.indexOf(5)]));

        refX2 = refX1 + r*cos(radians(start_angle[joint_sequence.indexOf(7)]));
        refY2 = refY1 - r*sin(radians(start_angle[joint_sequence.indexOf(7)]));

        line(all_coordinate[10][0],all_coordinate[10][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(5)){
          refX = all_coordinate[10][0] + r*cos(radians(start_angle[joint_sequence.indexOf(5)]));
          refY = all_coordinate[10][1] - r*sin(radians(start_angle[joint_sequence.indexOf(5)]));
          line(all_coordinate[10][0],all_coordinate[10][1],refX,refY);
        }
        else{
          refX = all_coordinate[14][0] + r*cos(radians(start_angle[joint_sequence.indexOf(7)]));
          refY = all_coordinate[14][1] - r*sin(radians(start_angle[joint_sequence.indexOf(7)]));
          line(all_coordinate[14][0],all_coordinate[14][1],refX,refY);
        }
      }
    }
    
  }
  
  
  
  
  if((location_flag==0) && (act_flag==1)){
    var time_scale = (timer-location_time)/ref_time;
    var ref_theta;
    var ref_theta1;
    var ref_theta2;
    if(joint_sequence.includes(0) || joint_sequence.includes(2)){
      if(joint_sequence.includes(0) && joint_sequence.includes(2)){
        ref_theta1 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(0)],end_angle[joint_sequence.indexOf(0)]) + start_angle[joint_sequence.indexOf(0)];
        
        ref_theta2 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(2)],end_angle[joint_sequence.indexOf(2)]) + start_angle[joint_sequence.indexOf(2)];
        
        refX1 = all_coordinate[0][0] + r*cos(radians(ref_theta1));
        refY1 = all_coordinate[0][1] - r*sin(radians(ref_theta1));

        refX2 = refX1 + r*cos(radians(ref_theta2));
        refY2 = refY1 - r*sin(radians(ref_theta2));

        line(all_coordinate[0][0],all_coordinate[0][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(0)){
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(0)],end_angle[joint_sequence.indexOf(0)]) + start_angle[joint_sequence.indexOf(0)];
          refX = all_coordinate[0][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[0][1] - r*sin(radians(ref_theta));
          line(all_coordinate[0][0],all_coordinate[0][1],refX,refY);
        }
        else{
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(2)],end_angle[joint_sequence.indexOf(2)]) + start_angle[joint_sequence.indexOf(2)];
          refX = all_coordinate[4][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[4][1] - r*sin(radians(ref_theta));
          line(all_coordinate[4][0],all_coordinate[4][1],refX,refY);
        }
      }
    }
    
    if(joint_sequence.includes(1) || joint_sequence.includes(3)){
      if(joint_sequence.includes(1) && joint_sequence.includes(3)){
        ref_theta1 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(1)],end_angle[joint_sequence.indexOf(1)]) + start_angle[joint_sequence.indexOf(1)];
        
        ref_theta2 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(3)],end_angle[joint_sequence.indexOf(3)]) + start_angle[joint_sequence.indexOf(3)];
        
        refX1 = all_coordinate[2][0] + r*cos(radians(ref_theta1));
        refY1 = all_coordinate[2][1] - r*sin(radians(ref_theta1));

        refX2 = refX1 + r*cos(radians(ref_theta2));
        refY2 = refY1 - r*sin(radians(ref_theta2));

        line(all_coordinate[2][0],all_coordinate[2][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(1)){
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(1)],end_angle[joint_sequence.indexOf(1)]) + start_angle[joint_sequence.indexOf(1)];
          refX = all_coordinate[2][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[2][1] - r*sin(radians(ref_theta));
          line(all_coordinate[2][0],all_coordinate[2][1],refX,refY);
        }
        else{
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(3)],end_angle[joint_sequence.indexOf(3)]) + start_angle[joint_sequence.indexOf(3)];
          refX = all_coordinate[6][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[6][1] - r*sin(radians(ref_theta));
          line(all_coordinate[6][0],all_coordinate[6][1],refX,refY);
        }
      }
    }
    if(joint_sequence.includes(4) || joint_sequence.includes(6)){
      if(joint_sequence.includes(4) && joint_sequence.includes(6)){
        ref_theta1 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(4)],end_angle[joint_sequence.indexOf(4)]) + start_angle[joint_sequence.indexOf(4)];
        
        ref_theta2 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(6)],end_angle[joint_sequence.indexOf(6)]) + start_angle[joint_sequence.indexOf(6)];
        
        refX1 = all_coordinate[8][0] + r*cos(radians(ref_theta1));
        refY1 = all_coordinate[8][1] - r*sin(radians(ref_theta1));

        refX2 = refX1 + r*cos(radians(ref_theta2));
        refY2 = refY1 - r*sin(radians(ref_theta2));

        line(all_coordinate[8][0],all_coordinate[8][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(4)){
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(4)],end_angle[joint_sequence.indexOf(4)]) + start_angle[joint_sequence.indexOf(4)];
          refX = all_coordinate[8][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[8][1] - r*sin(radians(ref_theta));
          line(all_coordinate[8][0],all_coordinate[8][1],refX,refY);
        }
        else{
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(6)],end_angle[joint_sequence.indexOf(6)]) + start_angle[joint_sequence.indexOf(6)];
          refX = all_coordinate[12][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[12][1] - r*sin(radians(ref_theta));
          line(all_coordinate[12][0],all_coordinate[12][1],refX,refY);
        }
      }
    }
    if(joint_sequence.includes(5) || joint_sequence.includes(7)){
      if(joint_sequence.includes(5) && joint_sequence.includes(7)){
        ref_theta1 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(5)],end_angle[joint_sequence.indexOf(5)]) + start_angle[joint_sequence.indexOf(5)];
        
        ref_theta2 = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(7)],end_angle[joint_sequence.indexOf(7)]) + start_angle[joint_sequence.indexOf(7)];
        
        refX1 = all_coordinate[10][0] + r*cos(radians(ref_theta1));
        refY1 = all_coordinate[10][1] - r*sin(radians(ref_theta1));

        refX2 = refX1 + r*cos(radians(ref_theta2));
        refY2 = refY1 - r*sin(radians(ref_theta2));

        line(all_coordinate[10][0],all_coordinate[10][1],refX1,refY1);
        line(refX1,refY1,refX2,refY2);
      }
      else{
        if(joint_sequence.includes(5)){
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(5)],end_angle[joint_sequence.indexOf(5)]) + start_angle[joint_sequence.indexOf(5)];
          refX = all_coordinate[10][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[10][1] - r*sin(radians(ref_theta));
          line(all_coordinate[10][0],all_coordinate[10][1],refX,refY);
        }
        else{
          ref_theta = time_scale * subtractAngles(start_angle[joint_sequence.indexOf(7)],end_angle[joint_sequence.indexOf(7)]) + start_angle[joint_sequence.indexOf(7)];
          refX = all_coordinate[14][0] + r*cos(radians(ref_theta));
          refY = all_coordinate[14][1] - r*sin(radians(ref_theta));
          line(all_coordinate[14][0],all_coordinate[14][1],refX,refY);
        }
      }
    }
  }
}
