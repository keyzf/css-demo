function isPrime(num) {
  return !/^1?$|^(11+?)\1+$/.test(Array(num + 1).join('1'))
};

function factorization (num1,num2){
  var min =Math.min(num1,num2);
  var max = Math.max(num1,num2);
  if(max%min===0){
    return min;
  }
  var num1Arr = [], num2Arr = [];
  for(var i = 1;i<=min; i++){
    // if(isPrime(i)){
      if(num1%i===0){
        num1Arr.push(i)
      }
      if(num2%i===0){
        num2Arr.push(i)
      }
    // };
  }

  console.log('num1Arr==>%s num2Arr===>%s',JSON.stringify(num1Arr,null,4),JSON.stringify(num2Arr,null,4));

  var commonArr = []
  num1Arr.forEach(item=>{
    if(num2Arr.includes(item)){
      commonArr.push(item)
    }
  })

  console.log('commonArr====>',Math.max(...commonArr));

};

factorization(108,84)