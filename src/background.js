var pandora_sites = [
  'http://www.pandora.com/*',
  'http://pandora.com/*',
  'https://www.pandora.com/*',
  'https://pandora.com/*'
];

function querySite(url_pack, callback) {
  chrome.tabs.query({url: url_pack}, function(tabs) {
    if (typeof tabs[0] != 'undefined') {
      chrome.tabs.connect(tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, true, function(value) {
        callback(tabs[0], value);
      });
    } else {
	     chrome.windows.create({url: 'http://www.pandora.com', focused: true});
    }
  });
}

function sendScript(tab, toggle_code) {
  chrome.tabs.executeScript(tab.id, {
    code: toggle_code
  });
}

// This is the catch for the key command being pressed.
chrome.commands.onCommand.addListener(function(command) {
  if (command == 'toggle-pandora-play') {
    querySite(pandora_sites, function(tab, value) {
      var toggle_code = (value ?
        'document.querySelector("#playbackControl > .buttons > .pauseButton > a").click();' :
        'document.querySelector("#playbackControl > .buttons > .playButton > a").click();'
      );

      sendScript(tab, toggle_code);
    });
  } else if (command == 'toggle-pandora-skip') {
    querySite(pandora_sites, function(tab) {
      sendScript(tab, 'document.querySelector("#playbackControl > .buttons > .skipButton > a").click();');
    });
  }
});
