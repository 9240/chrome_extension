chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action == "createPage") {
    chrome.tabs.create(
      {
        url:
          "https://hr.konka.com/km/report/km_report_main/kmReportMain.do?method=add&fdTemplateId=1661a6e53cc31369332e95642d38c074"
      },
      function () {
        chrome.tabs.executeScript(
          {
            code: "let timeData = " + JSON.stringify(msg.value)
          },
          function () {
            chrome.tabs.executeScript({
              code: `
                jQuery(document).ready(function(){
                  setTimeout(()=>{
                    for (let i = 0; i < timeData.length; i++) {
                      const item = timeData[i];
                      // name
                      jQuery(".inputsgl.xform_inputText")[i * 3].focus();
                      jQuery(".inputsgl.xform_inputText")[i * 3].value = jQuery('.inputread_normal')[0].value;
                      jQuery(".inputsgl.xform_inputText")[i * 3].blur();
                      // 时间
                      jQuery('[subject="开始时间"]')[i].value = item.date + " " + item.startTime;
                      jQuery('[subject="结束时间1"]')[i].value = item.date + " " + item.endTime;
                      jQuery('[subject="加班时数"]')[i].value = item.num;
                      jQuery('[subject="加班原因及说明"]')[i].value = item.mark;
                      if (i != timeData.length - 1) {
                        jQuery(
                          "#TABLE_DL_fd_mxb1 > tbody > tr.tr_normal_opt > td > div > div.tr_normal_opt_c > span:nth-child(1)"
                        ).click();
                      }
                    }
                  },2000)
                })
              `
            });
          }
        );
      }
    );
  }
});
