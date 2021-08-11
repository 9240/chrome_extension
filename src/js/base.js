function insertJquery() {
  var head = document.getElementsByTagName("HEAD").item(0);
  var js = document.createElement("script");
  js.src = "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js";
  head.appendChild(js);
}

function calcTime(start, end) {
  var S =
    (jQuery("body > form > table:nth-child(6) > tbody > tr > td").index(
      jQuery(
        `body > form > table:nth-child(6) > tbody > tr > td:contains(${start})`
      )
    ) -
      16 -
      2) /
      16 +
    3;
  var E =
    (jQuery("body > form > table:nth-child(6) > tbody > tr > td").index(
      jQuery(
        `body > form > table:nth-child(6) > tbody > tr > td:contains(${end})`
      )
    ) -
      16 -
      2) /
      16 +
    3;
  var arr = [];
  for (let i = S; i <= E; i++) {
    if (
      jQuery(
        `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(11)`
      )
        .text()
        .trim() != ""
    ) {
      let date = jQuery(
        `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(2)`
      )
        .text()
        .trim()
        .replace("*", "")
        .split("/")
        .reverse()
        .join("-");
      if (new Date(date).getDay() == 6 || new Date(date).getDay() == 0) {
        let startTime1 = jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(5)`
        )
          .text()
          .trim();
        let endTime1 = jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(6)`
        )
          .text()
          .trim();
        if (startTime1 != "" && endTime1 != "") {
          pushData(startTime1, "12:30", date) &&
            arr.push(pushData(startTime1, "12:30", date));
        }
        let startTime2 = jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(7)`
        )
          .text()
          .trim();
        let endTime2 = jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(10)`
        )
          .text()
          .trim();
        if (startTime2 != "" && endTime2 != "") {
          pushData("14:00", endTime2, date) &&
            arr.push(pushData("14:00", endTime2, date));
        }
      } else {
        let startTime = "19:00";
        let endTime = jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(10)`
        )
          .text()
          .trim();
        pushData(startTime, endTime, date) &&
          arr.push(pushData(startTime, endTime, date));
      }
    }
  }
  return JSON.stringify(arr);
}

function pushData(startTime, endTime, date) {
  let num =
    Number(endTime.split(":")[0]) +
    (Number(endTime.split(":")[1]) >= 30 ? 0.5 : 0) -
    (Number(startTime.split(":")[0]) +
      (Number(startTime.split(":")[1]) == 0
        ? 0
        : Number(startTime.split(":")[1]) > 30
        ? 1
        : 0.5));
  if (num > 0) {
    return {
      date: date,
      startTime: startTime,
      endTime: endTime,
      num: num,
      mark: ""
    };
  }
}

var data = [];
function addRow() {
  for (let i = 0; i < data.length - 1; i++) {
    $(
      "#TABLE_DL_fd_mxb1 > tbody > tr.tr_normal_opt > td > div > div.tr_normal_opt_c > span:nth-child(1)"
    ).click();
  }
}
setTimeout(() => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    // name
    $(".inputsgl.xform_inputText")[i * 3].focus();
    $(".inputsgl.xform_inputText")[i * 3].value = "KK37627";
    $(".inputsgl.xform_inputText")[i * 3].blur();
    // 时间
    $('[subject="开始时间"]')[i].value = item.date + " " + item.startTime;
    $('[subject="结束时间1"]')[i].value = item.date + " " + item.endTime;
    $('[subject="加班时数"]')[i].value = item.num;
    $('[subject="加班原因及说明"]')[i].value = item.mark;
  }
}, 3000);
