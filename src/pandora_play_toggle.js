chrome.runtime.connect();

chrome.runtime.onMessage.addListener(function(operation, sender, sendResponse) {
  if (operation == 'toggle_check') {
    sendResponse(document.querySelector("#playbackControl > .buttons > .pauseButton").style.display == 'block');
  } else if (operation == 'next_station') {
      var next_station = document.querySelector("#stationList > .selected").nextSibling;

      if (next_station !== null) {
        next_station.click();
        sendResponse(next_station.querySelector(".stationName > li > div").innerText);
      } else {
        next_stations = document.querySelectorAll("#stationList > div");

        if (next_stations !== null) {
          if (typeof next_stations[0] != 'undefined' && next_stations[0].querySelector(".stationName > li > div").innerText != "Shuffle") {
            next_stations[0].click();
            sendResponse(next_stations[0].querySelector(".stationName > li > div").innerText);
          } else if (typeof next_stations[1] != 'undefined') {
            next_stations[1].click();
            sendResponse(next_stations[1].querySelector(".stationName > li > div").innerText);
          }
        }
      }
  } else if (operation == 'song_skip') {
    sendResponse(true);
  }
});

setInterval(function() {
  var title_elm = document.querySelector("title");
      song_elm = document.querySelector(".playerBarSong"),
      artist_elm = document.querySelector(".playerBarArtist");

  if (title_elm && song_elm && artist_elm) {
    title_elm.innerText = song_elm.innerText + (artist_elm.innerText == '' ? '' : ' by ' + artist_elm.innerText);
  }
}, 750);
