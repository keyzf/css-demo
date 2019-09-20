const sourceDiv = document.getElementsByClassName("source-container")[0];
function drawSourceDiv(){
  for (let i = 0; i < 16; i++) {
    let itemDiv = document.createElement("div");
    itemDiv.classList.add('picture-container');

    let itemImage = document.createElement('img');
    itemImage.classList.add("item" ,`item-${i+1}`);
    itemImage.setAttribute('data-picture',`${i+1}`);

    itemDiv.appendChild(itemImage);
    
    sourceDiv.appendChild()
  }
}




const attr = sourceDiv.dataset.source;
console.log("attr", attr);

function dragStartFunc(ev) {
  // ev.preventDefault()
  // console.log("dragStartFunc", ev.target);
  ev.dataTransfer.setData("drag", ev.target.dataset.picture);

  // ev.dataTransfer.setData("text/plain", ev.target);



}

function dragOverFunc(ev) {
  ev.preventDefault();
  // console.log("dragOverFunc",ev);
}

function dropFunc(ev) {
  ev.preventDefault();

  const data = ev.dataTransfer.getData("drag");
  // const className = `.item-${data}`;
  const item = document.querySelectorAll(`.item-${data}`)[0];

  // console.log("data", data, item, className);

  // appendChild
  // console.log("ev.target", ev.target.dataset.drop);

  // console.log("ev.dataTransfer", ev.dataTransfer.getData("text"));
  
  ev.dataTransfer.clearData();
  if (data !== ev.target.dataset.drop) {
    alert("图片不匹配！")
    return;
  }
  ev.target.appendChild(item);


  // Clear the drag data cache (for all formats/types)
  // ev.dataTransfer.clearData();
}