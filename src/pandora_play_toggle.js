chrome.runtime.connect();

chrome.runtime.onMessage.addListener(function (operation, sender, sendResponse) {
	if (operation == 'toggle_check') {
		var play_control = document.querySelector(".Tuner__Audio__Control__Play > span > button > svg > use");
		if (play_control) {
			sendResponse(window.getComputedStyle(play_control).getPropertyValue("display") == 'inline');
		} else {
			sendResponse(false);
		}
	} else if (operation == 'next_station') {
		var next_stations = document.querySelectorAll(".StationList > div:nth-child(2n) > div"),
			found_recommend = false;

		if (next_stations !== null && next_stations.length > 1) {
			for (var i = (next_stations.length - 1); i >= 0; i--) {
				if (next_stations[i].className == "StationList__recommended") {
					continue;
				}

				next_stations[i].click();
				sendResponse(next_stations[i].querySelector(".StationListItem__content > span").innerText);
				break;
			}
		}
	} else if (operation == 'song_skip') {
		sendResponse(true);
	}
});

setInterval(function () {
	var title_elm = document.querySelector("title");
		song_elm = document.querySelector(".nowPlayingTopInfo__current__trackName > div > div"),
		artist_elm = document.querySelector(".nowPlayingTopInfo__current__artistName");

	if (title_elm && song_elm && artist_elm) {
		title_elm.innerText = song_elm.innerText + (artist_elm.innerText == '' ? '' : ' by ' + artist_elm.innerText);
	}
}, 750);
