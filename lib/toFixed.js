// 浮点运算 - 精度丢失问题 实例
// 加法 =====================
// 0.1 + 0.2 = 0.30000000000000004
// 0.7 + 0.1 = 0.7999999999999999
// 0.2 + 0.4 = 0.6000000000000001

// 减法 =====================
//1.5 - 1.2 = 0.30000000000000004
// 0.3 - 0.2 = 0.09999999999999998

// 乘法 =====================
// 19.9 * 100 = 1989.9999999999998
// 0.8 * 3 = 2.4000000000000004
// 35.41 * 100 = 3540.9999999999995

// 除法 =====================
// 0.3 / 0.1 = 2.9999999999999996
// 0.69 / 10 = 0.06899999999999999

// 1.35.toFixed(1) // 1.4 正确
// 1.335.toFixed(2) // 1.33  错误
// 1.3335.toFixed(3) // 1.333 错误
// 1.33335.toFixed(4) // 1.3334 正确
// 1.333335.toFixed(5)  // 1.33333 错误
// 1.3333335.toFixed(6) // 1.333333 错误

/**
 *  自定义数值精度（遵守四舍五入）
 *
 * @param {number} value 要处理的数值
 * @param {number} len 小数点后保留的位数
 * @returns 返回一个 字符串 形式的数值
 */
function fixedFunc(value, len) {
  // 如果要保留的小数位数大于当前数值位数， 不做处理， 直接返回
  if (value * 1 !== value) {
    return;
  }

  var tempArr = value.toString().split(".");
  if (tempArr[1].length <= len) {
    return value;
  }

  //  lastN 为保留小数后的 判断值 （四舍五入）
  var lastN = tempArr[1][len];
  if (lastN >= 5) {
    var calcN = tempArr[1].substring(0, len) * 1;
    var deciN = calcN + 1;
    var intN = tempArr[0] * 1;

    //对运算后的数值作 进位 处理
    if (deciN.toString().length > calcN.toString().length) {
      deciN = deciN.toString().substr(1);
      intN = intN * 1 + 1;
    }
    var result = intN + "." + deciN;
    return result;
  }

  return tempArr[0] + "." + tempArr[1].substring(0, len);
}
