let video;
let bodyPose;
let connections;
let poses = [];
let timer = 0;  
let theta_arr = [];//存每次擷取的角度
let diff_theta_arr= []; //存兩角度差
let time_rate = 1;  //每幾秒回傳一次
const SAMPLE_PERIOD = 3; // sampling period in second
const SAMPLE_FREQ = 20;
const Num_angle = 8;  // number of angles
let time_unit = 10; // use 60 frame as one time unit
let sampled = [];


let act_flag = 1; //評分旗標(動作結束旗標)
let location_flag = 1; //初始定位旗標
let location_count = [];  //計數每個肢體的連續成功定位次數
let location_time; //評分結束、開始評分的時間點
let diff_angles_storage=[]; //持續推入diff_angle(用以計算穩定度)
let joint_sequence = []; //用以依序紀錄肢體編號
let aim_joint_angles = [];  //用以儲存多個目標瞬時肢體絕對角度
let aim_joint_diff_angles = []; //用以儲存多個目標肢體瞬時兩時刻角度差
let joint_name = []; //依序儲存肢體名稱
let start_angle = []; //用以儲存多個目標肢體起點角度
let end_angle = [];  //用以儲存多個目標肢體終點角度
let ref_time; //本動作參考時間
let refX = new Array(8).fill(0); //計算輔助線座標
let refY = new Array(8).fill(0);

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

   // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  //get the skeleton connection information
  connections = bodyPose.getSkeleton();
  
  // Hide the video element, and just show the canvas
  video.hide();
  location_count = new Array(8).fill(0);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  push();
  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  
  // clock
  if(frameCount % time_unit == 0) {
    timer++;
  }
  
  if ((frameCount % 2 == 0) && poses.length) {
    let angles = angle_sampling(poses[0]); 
    
    //傳入身體座標點，回傳出肩-肘、肘-腕、臗-膝、膝-踝的角度(共8個)，並儲存。
    //angles變數儲存此8個角度，並推入sampled(保持10筆)
    
    if (sampled.length >= SAMPLE_FREQ) {
      sampled.shift();
    } 
    sampled.push(angles);
    
    //console.log(sampled);
    //湊滿10筆時，會是10x8的陣列，Row代表每一筆Sampled，Col代表每一個關節角度
    
    if(frameCount % time_unit == 0){
      let avg_angles = avg(sampled);
      //console.log(avg_angles);
      //console.log(diff_angle);
      
      /*
      if (diff_angle_10.length >= 10) {
        diff_angle_10.shift();
      }
      if(timer>3)
        diff_angle_10.push(diff_angle[0]);
      
      //console.log(diff_angle[0]);
      //console.log(diff_angle_10);
      //console.log(std(diff_angle_10));
      */
      
      test(diff_angle,avg_angles);
    }
    
  }
 
  drawRefLine();
  
  // Draw the webcam video
  
  //console.log(poses[0]);
  //draw the skeleton connections
  
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
  
  
  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.score > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
  pop();
}



//內積方法求角度(cx,cy為向量共起點)
function theta(cx,cy,x1,y1,x2,y2){
  var dx1 = x1 - cx;
  var dy1 = y1 - cy;
  var dx2 = x2 - cx;
  var dy2 = y2 - cy;
  return acos(((dx1*dx2)+(dy1*dy2))/(sqrt(dx1*dx1+dy1*dy1)*sqrt(dx2*dx2+dy2*dy2)));
}

//直接兩關節點求絕對角度
function theta_2(x1,y1,x2,y2){
  return degrees(atan2(-(y2-y1),x2-x1));
}


function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}