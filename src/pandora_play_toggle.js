chrome.runtime.connect();

chrome.runtime.onMessage.addListener(function(expression, sender, sendResponse) {
  sendResponse(document.querySelector("#playbackControl > .buttons > .pauseButton").style.display == 'block');
});

setInterval(function() {
  var title_elm = document.querySelector("title");
      song_elm = document.querySelector(".playerBarSong"),
      artist_elm = document.querySelector(".playerBarArtist");

  if (title_elm && song_elm && artist_elm) {
    title_elm.innerText = song_elm.innerText + ' by ' + artist_elm.innerText;
  }
}, 750);
