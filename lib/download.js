var rows = [
  ['name1', 'city1', '哈哈哈'],
  ['name2', 'city2', 'more info']
]

var csvContent = 'data:text/csv;charset=utf-8,'

rows.forEach(function(rowArray) {
  var row = rowArray.join(',')
  csvContent += row + '\r\n'
})

// var encodedUri = encodeURI(csvContent)
// window.open(encodedUri)
var downloaddata = window.URL.createObjectURL(new Blob(['\uFEFF' + csvContent]))//添加utf-8  BOM头防止excel打开中文乱码

var downloadFile = (url, fileName = '') => {
  var eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.style.display = 'none'
  eleLink.href = url
  // 受浏览器安全策略的因素，动态创建的元素必须添加到浏览器后才能实施点击
  document.body.appendChild(eleLink)
  // 触发点击
  eleLink.click()
  // 然后移除
  document.body.removeChild(eleLink)
}

downloadFile(downloaddata, 'aa.csv')