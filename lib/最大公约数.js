function isPrime(num) {
  return !/^1?$|^(11+?)\1+$/.test(Array(num + 1).join('1'))
};

function factorization (num1,num2){
  var min =Math.min(num1,num2);
  var max = Math.max(num1,num2);
  if(max%min===0){
    return min;
  }
  var result = 1;
  for(var i = 2; i<=min/2; i++){
    if(num1%i===0 && num2%i===0){
      result = i
    }
  }

  console.log('commonArr====>', result);

};

factorization(108,81)