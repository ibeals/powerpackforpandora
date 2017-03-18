var pandora_sites = [
      'http://www.pandora.com/*',
      'http://pandora.com/*',
      'https://www.pandora.com/*',
      'https://pandora.com/*'
    ],
    station_timeout = null,
    change_gate = null;

function querySite(url_pack, callback, operation) {
  chrome.tabs.query({url: url_pack}, function(tabs) {
    if (typeof tabs[0] != 'undefined') {
      chrome.tabs.connect(tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, operation, function(value) {
        callback(tabs[0], value);
      });
    } else {
	     chrome.windows.create({url: 'http://www.pandora.com', focused: true});
    }
  });
}

function sendScript(tab, toggle_code, callback) {
  chrome.tabs.executeScript(
    tab.id,
    {
      code: toggle_code
    },
    callback
  );
}

// This is the catch for the key command being pressed.
chrome.commands.onCommand.addListener(function(command) {

  if (command == 'toggle-pandora-play') {
    querySite(pandora_sites, function(tab, value) {
      var toggle_code = "document.querySelector('.Tuner__Audio__Control__Play > span > button').click()";

      sendScript(
        tab,
        toggle_code,
        function() {}
      );
    }, 'toggle_check');

  } else if (command == 'toggle-pandora-skip') {
    if (station_timeout !== null) {
      clearTimeout(station_timeout);

      querySite(pandora_sites, function(tab, station_name) {
        change_gate = null;
        station_timeout = null;
        chrome.notifications.create("powerpack", {type: "basic", message: station_name, title: "Station Change..", iconUrl: "128logo.png"});
      }, 'next_station');
    } else if (change_gate == null) {
      change_gate = true;

      station_timeout = setTimeout(function() {
        querySite(pandora_sites, function(tab) {
          sendScript(
            tab,
            'document.querySelector(".Tuner__Audio__Control__Skip > span > button").click();',
            function() {
              station_timeout = null;
              change_gate = null;
            }
          );
        }, 'song_skip');
     }, 500);
    }
  }
});
