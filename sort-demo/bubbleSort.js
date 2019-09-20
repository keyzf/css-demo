function CArray(numElements) {
  this.dataStore = [];
  this.pos = 0;
  this.numElements = numElements;
  this.insert = insert;
  this.toString = toString;
  this.clear = clear;
  this.setData = setData;
  this.swap = swap;
  this.display = display;

  this.bubbleSort = bubbleSort; //冒泡
  this.selectionSort = selectionSort;
  this.insertionSort = insertionSort;

  for (var i = 0; i < numElements; ++i) {
    this.dataStore[i] = i;
  }
}
function getBgColor(n) {
  return "rgba(" + 15 * n + "," + 15 * n + "," + 15 * n + ",0.5)";
}

function display(divName) {
  var container = document.createElement("div");
  for (var i = 0; i < this.dataStore.length; ++i) {
    var item = document.createElement("div");
    item.style.height = this.dataStore[i] * 3 + "px";
    item.style.background = getBgColor(i);
    item.classList.add("item");
    container.appendChild(item);
  }
  document.getElementsByClassName(divName)[0].appendChild(container);
}

function setData() {
  for (var i = 0; i < this.numElements; ++i) {
    this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1));
  }
}
function clear() {
  for (var i = 0; i < this.dataStore.length; ++i) {
    this.dataStore[i] = 0;
  }
}
function insert(element) {
  this.dataStore[this.pos++] = element;
}
function toString() {
  var retstr = "";
  for (var i = 0; i < this.dataStore.length; ++i) {
    retstr += this.dataStore[i] + " ";
    if ((i > 0) & (i % 10 == 0)) {
      retstr += "\n";
    }
  }
  return retstr;
}

function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function bubbleSort() {
  var numElements = this.dataStore.length;
  var temp;
  for (var outer = numElements; outer >= 2; --outer) {
    for (var inner = 0; inner <= outer - 1; ++inner) {
      if (this.dataStore[inner] > this.dataStore[inner + 1]) {
        swap(this.dataStore, inner, inner + 1);
        this.display('bubble');
      }
    }
  }
}

function selectionSort() {
  var min, temp;
  for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {
    min = outer;
    for (var inner = outer + 1; inner <= this.dataStore.length - 1; ++iner) {
      if (this.dataStore[inner] < this.dataStore[min]) {
        min = inner;
      }
      swap(this.dataStore, outer, min);
      this.display('selection');
    }
  }
}

function insertionSort() {
  var temp, inner;
  for (var outer = 1; outer <= this.dataStore.length - 1; ++outer) {
    temp = this.dataStore[outer];
    inner = outer;
    while (inner > 0 && this.dataStore[inner - 1] >= temp) {
      this.dataStore[inner] = this.dataStore[inner - 1];
      --inner;
    }
    this.dataStore[inner] = temp;
    this.display('insert');
  }
}
