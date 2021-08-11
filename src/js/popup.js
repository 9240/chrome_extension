import '../css/bootstrap.min.css';
$("#submit").click(function () {
  var start = $("#startTime").val();
  var end = $("#endTime").val();
  if (/\d{2}\/\d{2}\/\d{4}/.test(start) && /\d{2}\/\d{2}\/\d{4}/.test(end)) {
    document.querySelector("#startTime").style.border = "1px solid #ced4da";
    document.querySelector("#endTime").style.border = "1px solid #ced4da";
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (getDataTab) {
        chrome.tabs.sendMessage(
          getDataTab[0].id,
          {
            action: "getData",
            value: {
              start,
              end
            }
          },
          function (getData) {
            if (getData.code == 200) {
              console.log(getData.data);
              chrome.runtime.sendMessage({
                action: "createPage",
                value: getData.data
              });
            }
          }
        );
      }
    );
  } else if (
    !/\d{2}\/\d{2}\/\d{4}/.test(start) &&
    !/\d{2}\/\d{2}\/\d{4}/.test(end)
  ) {
    document.querySelector("#startTime").style.border = "1px solid red";
    document.querySelector("#endTime").style.border = "1px solid red";
  } else if (!/\d{2}\/\d{2}\/\d{4}/.test(start)) {
    document.querySelector("#startTime").style.border = "1px solid red";
  } else if (!/\d{2}\/\d{2}\/\d{4}/.test(end)) {
    document.querySelector("#endTime").style.border = "1px solid red";
  }
});
