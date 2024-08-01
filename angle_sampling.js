let temp = new Array(8).fill(0);
let diff_angle = new Array(8).fill(0);

let joint_name_all = ["左肩-左肘","右肩-右肘","左肘-左腕","右肘-右腕","左臗-左膝","右臗-右膝","左膝-左踝","右膝-右踝"]

let all_coordinate = [];  //儲存所有關節x,y座標
for(let i = 0;i<16;i++){
    all_coordinate[i] = new Array(2).fill(0);
}

let result = new Array(8).fill(0);
//順序:
//左肩-左肘、右肩-右肘、左肘-左腕、右肘-右腕、左臗-左膝、右臗-右膝、左膝-左踝、右膝-右踝
//all_coordinate陣列將儲存:
//[左肩x,左肩y]
//[左肘x,左肘y]
//[右肩x,右肩y]
//[右肘x,右肘y]
//...
//[右膝x,右膝y]
//[右踝x,右踝y]



function angle_sampling(pose){
  if (poses.length){
    let pose = poses[0];
    all_coordinate[0][0] = pose.left_shoulder.x;
    all_coordinate[0][1] = pose.left_shoulder.y;
    all_coordinate[1][0] = pose.left_elbow.x;
    all_coordinate[1][1] = pose.left_elbow.y;
    all_coordinate[2][0] = pose.right_shoulder.x;
    all_coordinate[2][1] = pose.right_shoulder.y;
    all_coordinate[3][0] = pose.right_elbow.x;
    all_coordinate[3][1] = pose.right_elbow.y;
    all_coordinate[4][0] = pose.left_elbow.x;
    all_coordinate[4][1] = pose.left_elbow.y;
    all_coordinate[5][0] = pose.left_wrist.x;
    all_coordinate[5][1] = pose.left_wrist.y;
    all_coordinate[6][0] = pose.right_elbow.x;
    all_coordinate[6][1] = pose.right_elbow.y;
    all_coordinate[7][0] = pose.right_wrist.x;
    all_coordinate[7][1] = pose.right_wrist.y;
    all_coordinate[8][0] = pose.left_hip.x;
    all_coordinate[8][1] = pose.left_hip.y;
    all_coordinate[9][0] = pose.left_knee.x;
    all_coordinate[9][1] = pose.left_knee.y;
    all_coordinate[10][0] = pose.right_hip.x;
    all_coordinate[10][1] = pose.right_hip.y;
    all_coordinate[11][0] = pose.right_knee.x;
    all_coordinate[11][1] = pose.right_knee.y;
    all_coordinate[12][0] = pose.left_knee.x;
    all_coordinate[12][1] = pose.left_knee.y;
    all_coordinate[13][0] = pose.left_ankle.x;
    all_coordinate[13][1] = pose.left_ankle.y;
    all_coordinate[14][0] = pose.right_knee.x;
    all_coordinate[14][1] = pose.right_knee.y;
    all_coordinate[15][0] = pose.right_ankle.x;
    all_coordinate[15][1] = pose.right_ankle.y;
  }
  
  for(let i=0,j=0;i<result.length;i++){
    result[i] = theta_2(all_coordinate[j][0],all_coordinate[j][1],all_coordinate[j+1][0],all_coordinate[j+1][1]);
    j+=2;
  }
  //console.log(result);
  return result;
}

function avg(sampled) {
  
  var sum = new Array(Num_angle).fill(0);
  
  for (let i = 0; i < sampled[0].length;i++) { //8個角度
    for (let j = 0;j < sampled.length;j++){ 
      sum[i] += sampled[j][i];
    }
  }
  for (let i = 0; i < Num_angle; i++) { //除以資料筆數用以取平均
    sum[i] /= sampled.length;
  }
  
  for(let i = 0;i<sum.length;i++){
    //diff_angle[i] = sum[i] - temp[i];
    
    diff_angle[i] = subtractAngles(sum[i],temp[i]); //此刻角度減前一刻角度
  }
    temp = sum;
    return sum;
}

function subtractAngles(angle1, angle2) { //計算角度差(自動補角)
    // 計算兩角度之間的差
    let diff = angle2 - angle1;

    // 轉換差異到 -180 到 180 度範圍內
    if (diff > 180) { 
        diff -= 360;
    } else if (diff < -180) {
        diff += 360;
    }

    // 確定方向
    let direction;
    if (diff > 0) {
        //direction = "clockwise";
    } else if (diff < 0) {
        //direction = "counterclockwise";
        //diff = -diff; // 差異轉為正值
    } else {
        direction = "none"; // 角度相同
    }

    return diff;
}


function std(angle){
  let avg=0;
  let sum=0;
  /*
  for(let i=0;i<angle.length;i++){
    avg += angle[i];
  }
  
  avg = avg/angle.length;
  */
  for(let i=0;i<angle.length;i++){
    sum = sum+((angle[i]-10)*(angle[i]-10));
  }
  return sqrt(sum/angle.length);
}

function transposeArray(arr) { //轉置陣列用函數
  let transposed = []; //用以儲存轉置後的陣列
  for (let i = 0; i < arr[0].length; i++) {
    transposed[i] = [];
    for (let j = 0; j < arr.length; j++) {
      transposed[i][j] = arr[j][i];
    }
  }
  return transposed;
}