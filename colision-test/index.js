var box = document.querySelectorAll(".container");
var ball = document.querySelectorAll(".item");
var btnStart = document.querySelectorAll(".btn-start")[0];
var btnPause = document.querySelectorAll(".btn-pause")[0];

var box_w = box[0].clientWidth;
var box_h = box[0].clientHeight;
var ball_w = ball[0].clientWidth;
var ball_h = ball[0].clientHeight;

var x1 = 0;
var x2 = box_w - ball_w;
var timer = null;
var step = 5;
var isPause = false;

function run() {
  isPause = false;
  btnStart.style.display = "none";
  btnPause.style.display = "inline-block";
  var w_diff = box_w - ball_w;
  var w_diff_half = w_diff / 2;
  var h_diff = box_h - ball_h;
  var h_diff_half = h_diff / 2;
  if (x1 < x2 && x2 === w_diff) {
    x1 += step;
    var y = 0;
    if (x1 <= w_diff_half) {
      y = x1 * (h_diff_half / w_diff_half) + h_diff_half;
    } else {
      y = h_diff - x1 * (h_diff_half / w_diff_half) + h_diff_half;
    }

    ball[0].style.transform = `translate(${x1}px,${y}px)`;
  }

  if (x2 > 0 && x1 === w_diff) {
    x2 -= step;

    var y = 0;
    if (x2 >= w_diff_half) {
      y = x2 * (h_diff_half / w_diff_half) - h_diff_half;
    } else {
      y = h_diff_half - x2 * (h_diff_half / w_diff_half);
    }

    ball[0].style.transform = `translate(${x2}px,${y}px)`;
  }

  if (x2 === 0) {
    x1 = 0;
    x2 = w_diff;
  }
  timer = window.requestAnimationFrame(run);
}
function stop() {
  x1 = 0;
  x2 = box_w - ball_w;
  btnStart.style.display = "inline-block";
  btnPause.style.display = "none";
  ball[0].style.transform = `translate(0px, 160px)`;
  window.cancelAnimationFrame(timer);
  console.clear();
}


function pause() {
  isPause = !isPause;
  btnPause.style.display = "inline-block";
  if(isPause){
    window.cancelAnimationFrame(timer);
  }else{
    run()
  }
}



