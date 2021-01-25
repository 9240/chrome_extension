function calcTime(start, end) {
  var S =
    (jQuery(
      "body > form > table:nth-child(6) > tbody > tr > td",
      window.frames["main"].document
    ).index(
      jQuery(
        `body > form > table:nth-child(6) > tbody > tr > td:contains('${start}')`,
        window.frames["main"].document
      ),
      window.frames["main"].document
    ) -
      16 -
      2) /
      16 +
    3;
  var E =
    (jQuery(
      "body > form > table:nth-child(6) > tbody > tr > td",
      window.frames["main"].document
    ).index(
      jQuery(
        `body > form > table:nth-child(6) > tbody > tr > td:contains('${end}')`,
        window.frames["main"].document
      ),
      window.frames["main"].document
    ) -
      16 -
      2) /
      16 +
    3;
  if (S < 3 || E < 3) {
    alert("没有找到该时间段");
  } else {
    var arr = [];
    for (let i = S; i <= E; i++) {
      if (
        jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(11)`,
          window.frames["main"].document
        )
          .text()
          .trim() != ""
      ) {
        let date = jQuery(
          `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(2)`,
          window.frames["main"].document
        )
          .text()
          .trim()
          .replace("*", "")
          .split("/")
          .reverse()
          .join("-");
        if (new Date(date).getDay() == 6 || new Date(date).getDay() == 0) {
          let startTime1 = jQuery(
            `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(5)`,
            window.frames["main"].document
          )
            .text()
            .trim();
          let endTime1 = jQuery(
            `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(6)`,
            window.frames["main"].document
          )
            .text()
            .trim();
          if (startTime1 != "" && endTime1 != "") {
            pushData(startTime1, "12:30", date) &&
              arr.push(pushData(startTime1, "12:30", date));
          }
          let startTime2 = jQuery(
            `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(7)`,
            window.frames["main"].document
          )
            .text()
            .trim();
          let endTime2 = jQuery(
            `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(10)`,
            window.frames["main"].document
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
            `body > form > table:nth-child(6) > tbody > tr:nth-child(${i}) > td:nth-child(10)`,
            window.frames["main"].document
          )
            .text()
            .trim();
          pushData(startTime, endTime, date) &&
            arr.push(pushData(startTime, endTime, date));
        }
      }
    }
    return arr;
  }
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getData") {
    sendResponse({
      code: 200,
      msg: "获取数据成功",
      data: calcTime(request.value.start, request.value.end)
    });
  }
});
