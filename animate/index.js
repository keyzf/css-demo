var logoView = document.querySelectorAll(".logo")[0];
var topView = document.querySelectorAll(".top")[0];

var timer = 0;
var initOffsetTop = 0;
var initOffsetLeft = 0;

document.ontouchstart = function(e) {
  // console.log("touchstart", e);
  const target = e.changedTouches[0];
  console.log("target--touchstart", target.screenY);
  initOffsetTop = target.screenY;
  initOffsetLeft = target.screenX;
};

document.ontouchmove = function(e) {
  console.log("ontouchmove", e);
  const target = e.changedTouches[0];

  topView.style.height = `${target.screenY - initOffsetTop}px`;

  var radiusLeft = target.screenY - initOffsetTop;
  var radiusright = target.screenY - initOffsetTop;

  // console.log("isLeft", isLeft);

  topView.style.borderBottomLeftRadius = `${radiusLeft}px`;
  topView.style.borderBottomRightRadius = `${radiusright}px`;
  console.log("target--ontouchmove", target.screenY - initOffsetTop);

  if (target.screenY - initOffsetTop > 100) {
    // logoView.style.display = "block";
    timer = Date.now();
  }
};

document.ontouchend = function(e) {
  console.log("touchstart", e);
  var diff = Date.now() - timer;

  // 计算动画结束的时间，结束时将 logo 隐藏
  diff = 2550 - (diff % 3000);
  console.log("diff", Date.now() - timer, diff);
  topView.style.height = `0px`;
  topView.style.transition = `height 0.2s ease-out`;
  // logoView.style.display = "none";

  // setTimeout(() => {
  //   topView.style.height = `0px`;
  //   topView.style.transition = "height 0.5s ease-out";
  //   logoView.style.display = "none";
  // }, diff);
};
