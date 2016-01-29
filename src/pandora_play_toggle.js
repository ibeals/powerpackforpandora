chrome.runtime.connect();

chrome.runtime.onMessage.addListener(function(expression, sender, sendResponse) {
  sendResponse(document.querySelector("#playbackControl > .buttons > .pauseButton").style.display == 'block');
});
