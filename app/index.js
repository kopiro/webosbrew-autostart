var terminal = document.getElementById("terminal");
var errorCount = 0;
var maxRetries = 3;

function log(message) {
  terminal.innerHTML += new Date().toString() + " : " + message + "<br>";
}

function makeCall() {
  log("Making call to luna://org.webosbrew.hbchannel.service");

  webOS.service.request("luna://org.webosbrew.hbchannel.service", {
    method: "autostart",
    parameters: { subscribe: true },
    onSuccess: function (res) {
      errorCount = 0;
      log("success: " + JSON.stringify(res));
    },
    onFailure: function (res) {
      errorCount++;
      log("error: " + JSON.stringify(res));
      if (errorCount < 3) {
        log(
          "Making call again automatically, retries left: " +
            (maxRetries - errorCount)
        );
        setTimeout(makeCall, 0);
      }
    },
  });
}

function registerAutostart() {
  webOS.service.request("luna://com.webos.service.eim", {
    method: "addDevice",
    parameters: {
      appId: "org.webosbrew.autostart", // your application ID, required
      pigImage: "", // required, preview image rendered in "All inputs", relative to main application directory, can be just an empty string
      mvpdIcon: "", // required on webOS <3.x
      type: "MVPD_IP", // optional, no idea (can be MVPD_IP or MVPD_RF)
      showPopup: true, // optional, shows a toast with info that default input has been changed to label
      label: "Autostart", // optional, used in toast message only
      description: "testing", // optional, description rendered in "All inputs"
    },
    onSuccess: function (res) {
      log("EIM - success: " + JSON.stringify(res));
    },
    onFailure: function (res) {
      log("EIM - failure: " + JSON.stringify(res));
    },
  });
}

document.getElementById("button").addEventListener("click", function () {
  errorCount = 0;
  makeCall();
});

makeCall();
registerAutostart();