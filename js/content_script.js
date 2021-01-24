chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "getData") {
    console.log(request);
    sendResponse({ state: "获取数据成功" });
  } else if (request.action == "handleData") {
    document.body.click();
    var data = [
      {
        date: "2021-01-24",
        startTime: "19:00",
        endTime: "21:10",
        num: 2,
        mark: ""
      },
      {
        date: "2021-01-25",
        startTime: "19:00",
        endTime: "21:10",
        num: 2,
        mark: ""
      },
      {
        date: "2021-01-26",
        startTime: "19:00",
        endTime: "21:10",
        num: 2,
        mark: ""
      }
    ];
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
        if (i != data.length - 1) {
          $(
            "#TABLE_DL_fd_mxb1 > tbody > tr.tr_normal_opt > td > div > div.tr_normal_opt_c > span:nth-child(1)"
          ).click();
        }
      }
    }, 1000);
    sendResponse({ state: "表格填写完成" });
  } else if (request.action == "openNewPage") {
    window.open(
      "https://hr.konka.com/km/report/km_report_main/kmReportMain.do?method=add&fdTemplateId=1661a6e53cc31369332e95642d38c074"
    );
  }
});
