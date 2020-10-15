var a = JSON.parse('{"0":{"name":"test","age":1},"1": 1, "2": 2,"3": {"4": 4444444444444444444444444, "5": {"6": 66666666666666666666666, "test_arr":[1,2,"test","12313121222222222222"]}}}', function (k, v) {
  console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                  // 最后一个属性名会是个空字符串。
 if(Object.prototype.toString.call(+v) === '[object Number]' && !Number.isNaN(+v) && !Number.isSafeInteger(+v)){ return BigInt(v)}
});

// 遍历顺序（后序遍历）
// name -> age -> 0 -> 1 -> 2 -> 4 -> 6 -> 0 -> 1 -> 2 -> 3 -> test_arr -> 5
