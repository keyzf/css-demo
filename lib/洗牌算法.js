
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


// 快速排序算法

function swap (arr, i, j) {
  [arr[j], arr[i]] = [arr[i], arr[j]]
}

function divide(arr, start, end) {
  const x = arr[end - 1];
  let i = start - 1;

  for(let j = start; j < end -1; j++) {
    if(arr[j] <= x) {
       i++;
       swap(arr, i, j)
    }
  }

  swap(arr, i+1, end-1);
  return i+1
}

function qsort(arr, start=0, end){
  end = end || arr.length
  if(start < end -1) {
    const q = divide(arr, start, end)
    console.log('---%s----', start, q)
    qsort(arr, start, q)
    qsort(arr, q+1, end)
  }

  return arr
}