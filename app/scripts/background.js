'use strict';
chrome.browserAction.onClicked.addListener(function(tab) { //Fired when User Clicks ICON
    var url = chrome.runtime.getURL('scripts/profiles/index.html');
    if (tab.url != url) { // Inspect whether the place where user clicked matches with our list of URL
        chrome.tabs.create({
            url: url,
            active: true
        });
    }
});