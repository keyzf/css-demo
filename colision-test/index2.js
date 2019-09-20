var box = document.getElementsByClassName("view")[0];
var ball = document.getElementsByClassName("ball")[0];
var ballFixed = document.getElementsByClassName("fixed-ball")[0];

var x1 = 0;
var x2 = 540;
var y1 = 0;
var y2 = 440;

var box_w = 600;
var box_h = 500;
var ball_w = 60;
var ball_h = 60;
var ball_fixed_w = 80;
var ball_fixed_h = 80;

function getPosition() {
  if (x1 < 540 && x2 === 540) {
    x1 += 2;
    ball.style.left = `${x1}px`;
    if (y1 < 440 && y2 === 440) {
      y1 += 2;
      ball.style.top = `${y1}px`;
    }
    if (y2 > 0 && y1 === 440) {
      y2 -= 2;
      ball.style.top = `${y2}px`;
    }
    if (y2 === 0) {
      y1 = 0;
      y2 = 440;
    }
  }

  if (x2 > 0 && x1 === 540) {
    x2 -= 2;
    ball.style.left = `${x2}px`;
    if (y1 < 440 && y2 === 440) {
      y1 += 2;
      ball.style.top = `${y1}px`;
    }
    if (y2 > 0 && y1 === 440) {
      y2 -= 2;
      ball.style.top = `${y2}px`;
    }
    if (y2 === 0) {
      y1 = 0;
      y2 = 440;
    }
  }

  if (x2 === 0) {
    x1 = 0;
    x2 = 540;
  }

  // console.log(x1, x2);

  window.requestAnimationFrame(getPosition);
}

// getPosition();

document.onmousedown = run;

var result = { x_direction: true, y_direction: true }; //最初同正方向
var step = 1;
function run() {
  var p1 = {};
  var p2 = {};
  p1.x = ball.offsetLeft;
  p1.y = ball.offsetTop;
  p1.r = ball_w / 2;
  p2.x = ballFixed.offsetLeft;
  p2.y = ballFixed.offsetTop;
  p2.r = ball_fixed_w / 2;

  if (result.x_direction) {
    p1.x += step;
  } else {
    p1.x -= step;
  }
  if (result.y_direction) {
    p1.y += step;
  } else {
    p1.y -= step;
  }
  console.log("run p1: ", p1);
  console.log("run direction: ", result);
  ball.style.left = `${p1.x}px`;
  ball.style.top = `${p1.y}px`;
  window.requestAnimationFrame(run);
  crash();
}
run();

// 近似于正负 value 之间
function closeToEqual(value, rangeValue) {
  if (Math.abs(value) <= rangeValue) {
    return true;
  }
  return false;
}

var crashBall = false;
function crash() {
  var p1 = {};
  var p2 = {};
  p1.x = ball.offsetLeft;
  p1.y = ball.offsetTop;
  p1.r = ball_w / 2;
  p2.x = ballFixed.offsetLeft;
  p2.y = ballFixed.offsetTop;
  p2.r = ball_fixed_w / 2;
  console.log("p1", ball.offsetLeft, ball.offsetTop);
  // console.log("p2", ballFixed.offsetLeft, ballFixed.offsetTop);
  console.log("crash", p1, p2);

  var distance = getDistance(p1, p2);

  console.log("distance", distance);
 

  // 碰撞同种类型的碰撞只会发生一次，用crashBall 来区分；
  if (distance < p1.r + p2.r) {
    if(crashBall){
      return;
    }
    crashBall = true;
    console.log("两者发生了碰撞", step);
    console.log("crash", p1, p2);
    console.log("p1.r + p2.r - distance", p1.r + p2.r - distance);
    if (Math.abs(p1.x - p2.x) >= Math.abs(p1.y - p2.y)) {
      console.log("x轴方向发生了碰撞", step);
      result.x_direction = !result.x_direction;
    } else {
      console.log("y轴方向发生了碰撞", step);
      result.y_direction = !result.y_direction;
    }
  }

  var p1_x_close_min = closeToEqual(p1.x, 2);
  var p1_y_close_min = closeToEqual(p1.y, 2);
  var p1_x_close_max = closeToEqual(p1.x - 540, 2);
  var p1_y_close_max = closeToEqual(p1.y - 440, 2);

  if (p1_x_close_min || p1_x_close_max) {
    console.log("x轴方向发生了碰撞", step);
    crashBall = false;
    result.x_direction = !result.x_direction;
  }

  if (p1_y_close_min || p1_y_close_max) {
    console.log("y轴方向发生了碰撞", step);
    crashBall = false;
    result.y_direction = !result.y_direction;
  }
}

function getDistance(p1, p2) {
  var x_dis = Math.pow(p1.x + 30 - (p2.x + 40), 2);
  var y_dis = Math.pow(p1.y + 30 - (p2.y + 40), 2);
  var distance = Math.sqrt(x_dis + y_dis);

  return distance;
}
