console.log("Content Script is ready to parse playlist!");

// Await a request from popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      sendResponse(parsePlaylist());
  });

function parsePlaylist() {
	let playlist_name_tag = null;
	let playlist_name = null;

	//most playlist pages are structured this way
	playlist_name_tag = document.querySelector("h1#title yt-formatted-string a");

	if(playlist_name_tag == null) {
		let playlist_name_tag = document.querySelector("#text-displayed");
		playlist_name = playlist_name_tag.innerHTML;
	}
	else {
		playlist_name = playlist_name_tag.innerHTML;
	}

	let playlist_items = document.querySelectorAll("#video-title");
	let playlist_titles = [];
	for(let i = 0; i < playlist_items.length; ++i) {
		playlist_titles.push(playlist_items[i].innerHTML.trim());
	}
	let final_product = 
		{
			playlist_name: playlist_name,
			playlist_titles: playlist_titles
		};
	return final_product;
}