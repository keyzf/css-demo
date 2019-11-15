var flag = false
var container = document.querySelector('.box');
function direction(e) {
	var position = direction.position = direction.position || {x: 0, y: 0};
	var x = e.x;
	var y = e.y;
	var r = {};
	r.x = Math.abs(y - position.y) < 2 ? 0 : y < position.y ? 1 : -1;
	r.y = Math.abs(x - position.x) < 2 ? 0 : x < position.x ? -1 : 1;
	direction.position.x = x;
	direction.position.y = y;
	return r;
}

function start() {
	flag = true;
}
function move(e) {
	if (!flag) return; 
	var transform = getComputedStyle(container).getPropertyValue('transform');
	var r = direction(e);
	container.style.setProperty('transform', transform + 'rotateZ(' + r.x * 2 + 'deg) rotateY(' + r.y * 1.5  + 'deg)');
}
function end() {
	flag = false;
}
document.addEventListener('mousedown', start);
document.addEventListener('mousemove', move);
document.addEventListener('mouseup', end);
document.addEventListener('touchstart', start);
document.addEventListener('touchmove', move);
document.addEventListener('touchend', end);