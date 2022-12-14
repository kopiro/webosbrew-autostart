var terminal = document.getElementById("terminal");
var errorCount = 0;
var maxRetries = 3;

function log(message, className = "") {
  const div = document.createElement("div");
  div.className = className;
  div.innerText = "[" + new Date().toLocaleString() + "] " + message;
  terminal.appendChild(div);
}

function launchHomebrewStartup() {
  log("Launching homebrew startup...");

  try {
    webOS.service.request("luna://org.webosbrew.hbchannel.service", {
      method: "autostart",
      onSuccess: function (res) {
        errorCount = 0;
        log("Startup success: " + JSON.stringify(res));
        log("You can now use your TV.", "success");
      },
      onFailure: function (res) {
        errorCount++;
        log("Startup failure: " + JSON.stringify(res), "error");
        if (errorCount < 3) {
          log("Retrying, retries left: " + (maxRetries - errorCount));
          setTimeout(launchHomebrewStartup, 500);
        }
      },
    });
  } catch (err) {
    log("Startup error: " + err.message);
  }
}

function registerAutostart() {
  try {
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
        log("Register autostart (EIM) - success: " + JSON.stringify(res));
      },
      onFailure: function (res) {
        log(
          "Register autostart (EIM) - failure: " + JSON.stringify(res),
          "error"
        );
      },
    });
  } catch (err) {
    log("Register autostart (EIM) - error: " + err.message);
  }
}

document.getElementById("logo").addEventListener("click", function () {
  errorCount = 0;
  launchHomebrewStartup();
});

registerAutostart();
launchHomebrewStartup();
