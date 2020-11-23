/*农历部分*/
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(
  0xa4b,
  0x5164b,
  0x6a5,
  0x6d4,
  0x415b5,
  0x2b6,
  0x957,
  0x2092f,
  0x497,
  0x60c96,
  0xd4a,
  0xea5,
  0x50da9,
  0x5ad,
  0x2b6,
  0x3126e,
  0x92e,
  0x7192d,
  0xc95,
  0xd4a,
  0x61b4a,
  0xb55,
  0x56a,
  0x4155b,
  0x25d,
  0x92d,
  0x2192b,
  0xa95,
  0x71695,
  0x6ca,
  0xb55,
  0x50ab5,
  0x4da,
  0xa5b,
  0x30a57,
  0x52b,
  0x8152a,
  0xe95,
  0x6aa,
  0x615aa,
  0xab5,
  0x4b6,
  0x414ae,
  0xa57,
  0x526,
  0x31d26,
  0xd95,
  0x70b55,
  0x56a,
  0x96d,
  0x5095d,
  0x4ad,
  0xa4d,
  0x41a4d,
  0xd25,
  0x81aa5,
  0xb54,
  0xb6a,
  0x612da,
  0x95b,
  0x49b,
  0x41497,
  0xa4b,
  0xa164b,
  0x6a5,
  0x6d4,
  0x615b4,
  0xab6,
  0x957,
  0x5092f,
  0x497,
  0x64b,
  0x30d4a,
  0xea5,
  0x80d65,
  0x5ac,
  0xab6,
  0x5126d,
  0x92e,
  0xc96,
  0x41a95,
  0xd4a,
  0xda5,
  0x20b55,
  0x56a,
  0x7155b,
  0x25d,
  0x92d,
  0x5192b,
  0xa95,
  0xb4a,
  0x416aa,
  0xad5,
  0x90ab5,
  0x4ba,
  0xa5b,
  0x60a57,
  0x52b,
  0xa93,
  0x40e95
);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;

function GetBit(m, n) {
  return (m >> n) & 1;
}
function e2c() {
  TheDate =
    arguments.length != 3
      ? new Date()
      : new Date(arguments[0], arguments[1], arguments[2]);
  var total, m, n, k;
  var isEnd = false;
  var tmp = TheDate.getYear();
  if (tmp < 1900) {
    tmp += 1900;
  }
  total =
    (tmp - 1921) * 365 +
    Math.floor((tmp - 1921) / 4) +
    madd[TheDate.getMonth()] +
    TheDate.getDate() -
    38;

  if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
    total++;
  }
  for (m = 0; ; m++) {
    k = CalendarData[m] < 0xfff ? 11 : 12;
    for (n = k; n >= 0; n--) {
      if (total <= 29 + GetBit(CalendarData[m], n)) {
        isEnd = true;
        break;
      }
      total = total - 29 - GetBit(CalendarData[m], n);
    }
    if (isEnd) break;
  }
  cYear = 1921 + m;
  cMonth = k - n + 1;
  cDay = total;
  if (k == 12) {
    if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
      cMonth = 1 - cMonth;
    }
    if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
      cMonth--;
    }
  }
}

function GetcDateString() {
  var lunaryYear = "";
  lunaryYear += tgString.charAt((cYear - 4) % 10);
  lunaryYear += dzString.charAt((cYear - 4) % 12);
  lunaryYear += "年 (";
  lunaryYear += sx.charAt((cYear - 4) % 12);
  lunaryYear += ")";

  var lunaryMonth = "";
  if (cMonth < 1) {
    lunaryMonth += "(闰)";
    lunaryMonth += monString.charAt(-cMonth - 1);
  } else {
    lunaryMonth += monString.charAt(cMonth - 1);
  }
  lunaryMonth += "月";

  var lunaryDate = "";
  lunaryDate += cDay < 11 ? "初" : cDay < 20 ? "十" : cDay < 30 ? "廿" : "三十";
  if (cDay % 10 != 0 || cDay == 10) {
    lunaryDate += numString.charAt((cDay - 1) % 10);
  }
  var result = {
    year: lunaryYear,
    month: lunaryMonth,
    date: lunaryDate
  };
  return result;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
  //solarYear = solarYear<1900?(1900+solarYear):solarYear;
  if (solarYear < 1921 || solarYear > 2020) {
    return "";
  } else {
    solarMonth = parseInt(solarMonth) > 0 ? solarMonth - 1 : 11;
    e2c(solarYear, solarMonth, solarDay);
    return GetcDateString();
  }
}

// 获取24节气
/**
 *
 * @param {Date} DateGL
 */

function SolarTerm(DateGL) {
  var SolarTermStr = new Array(
    "小寒",
    "大寒",
    "立春",
    "雨水",
    "惊蛰",
    "春分",
    "清明",
    "谷雨",
    "立夏",
    "小满",
    "芒种",
    "夏至",
    "小暑",
    "大暑",
    "立秋",
    "处暑",
    "白露",
    "秋分",
    "寒露",
    "霜降",
    "立冬",
    "小雪",
    "大雪",
    "冬至"
  );
  var DifferenceInMonth = new Array(
    1272060,
    1275495,
    1281180,
    1289445,
    1299225,
    1310355,
    1321560,
    1333035,
    1342770,
    1350855,
    1356420,
    1359045,
    1358580,
    1355055,
    1348695,
    1340040,
    1329630,
    1318455,
    1306935,
    1297380,
    1286865,
    1277730,
    1274550,
    1271556
  );
  var DifferenceInYear = 31556926;
  var BeginTime = new Date(1901 / 1 / 1);
  BeginTime.setTime(947120460000);
  for (; DateGL.getFullYear() < BeginTime.getFullYear(); ) {
    BeginTime.setTime(BeginTime.getTime() - DifferenceInYear * 1000);
  }
  for (; DateGL.getFullYear() > BeginTime.getFullYear(); ) {
    BeginTime.setTime(BeginTime.getTime() + DifferenceInYear * 1000);
  }
  for (var M = 0; DateGL.getMonth() > BeginTime.getMonth(); M++) {
    BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
  }
  if (DateGL.getDate() > BeginTime.getDate()) {
    BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
    M++;
  }
  if (DateGL.getDate() > BeginTime.getDate()) {
    BeginTime.setTime(BeginTime.getTime() + DifferenceInMonth[M] * 1000);
    M == 23 ? (M = 0) : M++;
  }
  var JQ = "二十四节气";
  var solarTermDate = `${DateGL.getMonth() + 1}`;
  var solarTermValue = "";
  if (DateGL.getDate() == BeginTime.getDate()) {
    JQ += " 今日 " + SolarTermStr[M];
    solarTermValue = SolarTermStr[M];
  } else if (DateGL.getDate() == BeginTime.getDate() - 1) {
    JQ += " 明日 " + SolarTermStr[M];
  } else if (DateGL.getDate() == BeginTime.getDate() - 2) {
    JQ += " 后日 " + SolarTermStr[M];
  } else {
    JQ = "二十四节气";
    if (DateGL.getMonth() == BeginTime.getMonth()) {
      JQ += ` 本月(${DateGL.getMonth() + 1})`;
    } else {
      JQ += ` 下月(${DateGL.getMonth() + 2})`;
      solarTermDate = `${DateGL.getMonth() + 2}`;
    }
    JQ += BeginTime.getDate() + "日" + SolarTermStr[M];
  }
  solarTermDate = `${solarTermDate}/${BeginTime.getDate()}`;
  var currDate = `${DateGL.getMonth() + 1}/${DateGL.getDate()}`;
  var result = {
    str: JQ,
    value: solarTermValue,
    date: solarTermDate,
    currDate
  };
  return result;
}

function $(query) {
  return document.querySelectorAll(query);
}

var containerView = $(".calendar-content")[0];

// 节日信息
function getFestival(year, month, date) {
  // 公历
  if (month == 0 && date == 1) return "元旦";
  if (month == 2 && date == 12) return "植树节";
  if (month == 3 && date == 1) return "愚人节";
  if (month == 3 && date == 5) return "清明节";
  if (month == 4 && date == 1) return "国际劳动节";
  if (month == 4 && date == 4) return "青年节";
  if (month == 5 && date == 1) return "国际儿童节";
  if (month == 7 && date == 1) return "建军节";
  if (month == 7 && date == 16) return "七夕情人节";
  if (month == 8 && date == 10) return "教师节";
  if (month == 9 && date == 1) return "国庆节";
  if (month == 11 && date == 24) return "平安夜";

  // 农历
  var lunaryObj = GetLunarDay(year, month+1, date);
  console.log('solarTermObj',lunaryObj)
  if (lunaryObj.month === "八月" && lunaryObj.date === "十五") {
    return "中秋节";
  }
}

// 假日信息
function getHoliday(month, date) {
  var str = "";
  if (month === 9 && date <= 7) str = "休";
  return str;
}

function renderView(
  year,
  month,
  firstDay,
  preMonthTotalDay,
  currMonthTotalDay
) {
  var table = document.createElement("table");
  table.classList.add("calendar-content__table");
  for (let i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    row.classList.add("calendar-content__table-tr");
    for (let j = 0; j < 7; j++) {
      var column = document.createElement("td");
      column.classList.add("calendar-content__table-td");
      var dateNum = firstDay + i * 7 + j;

      if (j === 0 || j === 6) {
        column.classList.add("calendar-content__table-td__week");
      }

      var nowDay = new Date().getDate();
      var CurrMonth = new Date().getMonth();
      if (month === CurrMonth && nowDay === dateNum - preMonthTotalDay) {
        column.classList.add("calendar-content__table-td__now");
      }

      if (
        dateNum <= preMonthTotalDay ||
        dateNum - preMonthTotalDay - currMonthTotalDay > 0
      ) {
        column.classList.add("calendar-content__table-td__gray");
      }

      var dayNum =
        dateNum > preMonthTotalDay
          ? dateNum - preMonthTotalDay > currMonthTotalDay
            ? dateNum - preMonthTotalDay - currMonthTotalDay
            : dateNum - preMonthTotalDay
          : dateNum;
      var festivalStr = "";
      var holidayStr = "";
      var lunarDayObj = "";

      var solarTermsObj = "";

      if (dateNum - preMonthTotalDay <= 0) {
        lunarDayObj = GetLunarDay(year, month, dayNum); //获取农历
        festivalStr = getFestival(year, month - 1, dayNum); //节日
        holidayStr = getHoliday(month - 1, dayNum); //假日
        solarTermsObj = SolarTerm(new Date(year, month - 1, dayNum)); // 节气

        // console.log("农历日期 pre：", year, month, dayNum, LunarDayStr);
      } else if (dateNum - preMonthTotalDay - currMonthTotalDay > 0) {
        // console.log("农历日期 next：", year, month + 2, dayNum);
        lunarDayObj = GetLunarDay(year, month + 2, dayNum);
        festivalStr = getFestival(year, month + 1, dayNum);
        holidayStr = getHoliday(month + 1, dayNum);
        solarTermsObj = SolarTerm(new Date(year, month + 1, dayNum)); // 节气
      } else {
        // console.log("农历日期 curr：", year, month + 1, dayNum);
        lunarDayObj = GetLunarDay(year, month + 1, dayNum);
        festivalStr = getFestival(year, month, dayNum);
        holidayStr = getHoliday(month, dayNum);
        solarTermsObj = SolarTerm(new Date(year, month, dayNum)); // 节气
      }
      var solarTermsStr = solarTermsObj.value;
      var lunarDayStr = lunarDayObj.date;
      // console.log("二十四节气： ", solarTermsObj, solarTermsStr);

      // console.log("农历日期： ", lunarDayObj);

      column.innerHTML = festivalStr
        ? `
        <div class='calendar-content__table-td__num'>${dayNum}
          <sup class='calendar-content__table-td__holiday'>${holidayStr}</sup>
        </div>
        <div class='calendar-content__table-td__str'>${festivalStr}</div>`
        : solarTermsStr
        ? `
        <div class='calendar-content__table-td__num'>${dayNum}
          <sup class='calendar-content__table-td__holiday'>${holidayStr}</sup>
        </div>
        <div class='calendar-content__table-td__str'>${solarTermsStr}</div>`
        : `
        <div class='calendar-content__table-td__num'>${dayNum}
          <sup class='calendar-content__table-td__holiday'>${holidayStr}</sup>
        </div>
        <div class='calendar-content__table-td__str-gray'>${lunarDayStr}</div>`;
      row.appendChild(column);
    }
    table.appendChild(row);
  }

  removeChildren();
  containerView.appendChild(table);
}

function getCalendar(year = 2019, mon = "") {
  var month = mon || new Date().getMonth();
  if (mon === 0) {
    month = 0;
  }
  var currMonthFirstDay = new Date(year, month, 1).getDay();
  var preMonthTotalDay = new Date(year, month, 0).getDate();
  var currMonthTotalDay = new Date(year, month + 1, 0).getDate();
  var firstDay = preMonthTotalDay - currMonthFirstDay + 1;
  renderView(year, month, firstDay, preMonthTotalDay, currMonthTotalDay);
}

getCalendar();
var currDate = new Date().getDate();
var currMon = new Date().getMonth();
var currYear = new Date().getFullYear();
var calendarTitle = $(".calendar-title__left")[0];

calendarTitle.innerText = `${currYear} 年 ${currMon + 1}月`;
function preMonth() {
  currMon -= 1;

  if (currMon < 0) {
    currMon = 11;
    currYear--;
  }

  getCalendar(currYear, currMon);
  calendarTitle.innerText = `${currYear} 年 ${currMon + 1}月`;
}

function nextMonth() {
  currMon += 1;
  if (currMon > 11) {
    currMon = 0;
    currYear++;
  }
  getCalendar(currYear, currMon);
  calendarTitle.innerText = `${currYear} 年 ${currMon + 1}月`;
}

function removeChildren() {
  var childs = $(".calendar-content")[0].childNodes;
  for (var i = childs.length - 1; i >= 0; i--) {
    $(".calendar-content")[0].removeChild(childs.item(i));
  }
}

window.onload = function () {
  nextMonth()
  preMonth()
}
