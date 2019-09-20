const container = document.querySelectorAll(".container")[0];

const item = document.querySelectorAll(".item");
const item1 = document.querySelectorAll(".item-1")[0];
const item2 = document.querySelectorAll(".item-2")[0];
const item3 = document.querySelectorAll(".item-3")[0];

let timer = 0;
container.onclick = function(e) {
  console.log("e", e.target.dataset.pos);
  const pos = e.target.dataset.pos;
  const flag = e.target.dataset.flag;
  item.forEach(obj => {
    if (pos * 1 === 3) {
      obj.setAttribute("data-flag", 0);
      obj.classList.remove("positive1");
    }
    if (pos * 1 === 1) {
      obj.setAttribute("data-flag", 1);
      obj.classList.add("positive");
    }
    if (flag * 1 === 1) {
      if (pos * 1 === 1) {
        obj.classList.add("positive");
      }
      if (pos * 1 === 2) {
        obj.classList.add("positive1");
      }
    } else {
      if (pos * 1 === 2) {
        obj.classList.remove("positive");
      }
    }
  });
};
