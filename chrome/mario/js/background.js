chrome.browserAction.onClicked.addListener(function(tab) {
    // call the browser tab and initialize the app
    chrome.tabs.sendRequest(tab.id, {evt: "clicked"}, function(response) {
        console.log(response.received);
    });
});