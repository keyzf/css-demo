
/**
 * 1.随机取一个数 和最后一个交换位置
 * 2.从 n-1 中取一个数 和n-1 的位置交换
 * ...
 *
 * @param {*} array
 * @returns
 */
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}