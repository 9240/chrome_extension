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
