// Viewer beware: this code ain't modular or easliy reusable

document.querySelector("#save-button").addEventListener("click", function()
{   
    //send a message to contentScript.js (doesn't matter what message)
    //recieve the playlist title, tracks, put them in a file, and download
    queryContentScript();
});

function queryContentScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response)
        {
            // Make filename
            let date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let playlist_name = response.playlist_name.trim();
            let regex = new RegExp(/[\s:<>/\\|?\*"]/, "g");
            playlist_name = playlist_name.replace(regex, "_");
            // I'm a dumb american
            playlist_name += "_" + month + "-" + day + "-" + year + ".txt";

            //convert the list of titles to a single string w/ newlines
            let playlist = "";
            for(let i=0; i < response.playlist_titles.length; ++i) {
                playlist += (i + 1) + " " + response.playlist_titles[i] + "\n";
            }

            // Package them in a file and download them
            // LATER: investigate how to choose where to save file
            // https://developer.chrome.com/extensions/messaging
            download(playlist, playlist_name, "text/plain");
            });
    });
}    

// Function to download data to a file
function download(data, filename, type) {
    // Make a blob, url-ify it, download it
    // Type should usually be "text/plain"
    let file = new Blob([data], {type: type});
    let file_url = URL.createObjectURL(file);
    chrome.downloads.download(
        {
            "url": file_url,
            "filename": filename,
            "conflictAction": "overwrite",
            "saveAs": false
        }
    );
}