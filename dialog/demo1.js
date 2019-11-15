var container = document.querySelectorAll(".dialog-container")[0];
var mask = document.querySelectorAll(".dialog-mask")[0];
var bodyDialog = document.querySelectorAll(".dialog-body")[0];

function openDialog() {
  console.log("container");
  // container.style.display = "block";
  container.classList.add('visiable')

  bodyDialog.classList.add('body-visiable')

}

function closeDialog() {
  container.classList.remove('visiable')

  bodyDialog.classList.remove('body-visiable')
}
