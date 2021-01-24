// var data = [
//   {
//     date: "2021-01-13",
//     startTime: "19:30",
//     endTime: "20:00",
//     num: 0.5,
//     mark: ""
//   },
//   {
//     date: "2021-01-14",
//     startTime: "19:30",
//     endTime: "20:00",
//     num: 0.5,
//     mark: ""
//   },
//   {
//     date: "2021-01-15",
//     startTime: "19:30",
//     endTime: "20:00",
//     num: 0.5,
//     mark: ""
//   }
// ];
// function addRow() {
//   for (let i = 0; i < data.length - 1; i++) {
//     console.log(
//       $(
//         "#TABLE_DL_fd_mxb1 > tbody > tr.tr_normal_opt > td > div > div.tr_normal_opt_c > span:nth-child(1)"
//       )
//     );
//     $(
//       "#TABLE_DL_fd_mxb1 > tbody > tr.tr_normal_opt > td > div > div.tr_normal_opt_c > span:nth-child(1)"
//     ).click();
//   }
// }
// // function insertJquery() {
// //   var head = document.getElementsByTagName("HEAD").item(0);
// //   var js = document.createElement("script");
// //   js.src = "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js";
// //   head.appendChild(js);
// // }
// // setTimeout(() => {
// //   for (let i = 0; i < data.length; i++) {
// //     const item = data[i];
// //     // name
// //     $(".inputsgl.xform_inputText")[i * 3].focus();
// //     $(".inputsgl.xform_inputText")[i * 3].value = "KK37627";
// //     $(".inputsgl.xform_inputText")[i * 3].blur();
// //     // 时间
// //     $('[subject="开始时间"]')[i].value = item.date + " " + item.startTime;
// //     $('[subject="结束时间1"]')[i].value = item.date + " " + item.endTime;
// //     $('[subject="加班时数"]')[i].value = item.num;
// //     $('[subject="加班原因及说明"]')[i].value = item.mark;
// //   }
// // }, 3000);
// document.querySelector("#submit").addEventListener("click", fn);
// function fn() {
//   //   insertJquery();
//   //   addRow();
//   //   for (let i = 0; i < data.length; i++) {
//   //     const item = data[i];
//   //     // name
//   //     $(".inputsgl.xform_inputText")[i * 3].focus();
//   //     $(".inputsgl.xform_inputText")[i * 3].value = "KK37627";
//   //     $(".inputsgl.xform_inputText")[i * 3].blur();
//   //     // 时间
//   //     $('[subject="开始时间"]')[i].value = item.date + " " + item.startTime;
//   //     $('[subject="结束时间1"]')[i].value = item.date + " " + item.endTime;
//   //     $('[subject="加班时数"]')[i].value = item.num;
//   //     $('[subject="加班原因及说明"]')[i].value = item.mark;
//   //   }
//   chrome.tabs.getSelected(null, function (tab) {
//     // 先获取当前页面的tabID
//     console.log(tab);
//   });
// }

$("#submit").click(function () {
  window.close();
  var start = $("#startTime").val();
  var end = $("#endTime").val();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    chrome.tabs.sendMessage(
      tab[0].id,
      {
        action: "openNewPage",
        value: {
          start,
          end
        }
      },
      function (response) {
        console.log(response);
      }
    );
  });
});
