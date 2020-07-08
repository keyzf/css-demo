function download(data, name) {
  var isString = Object.prototype.toString.call(data) === '[object String]'
  var tranferDataToStr = ""
  if(isString){
    tranferDataToStr = data  
  } else {
    try {
      tranferDataToStr = JSON.stringify(data);
      
    } catch {
      console.error('该数据不能转化为字符串')

    }


  }
  console.log('tranferDataToStr',tranferDataToStr)

   var encodeData = window.btoa(tranferDataToStr);
   var url = 'data:application/octet-stream;base64,' + encodeData;
   
   //download
   var a = document.createElement('a');
   a.download = name;
   a.href = url; 
  
   a.click()

}

var a = {
  name:'test',
  value:'this is a demo'
}

download(a,'test.json')