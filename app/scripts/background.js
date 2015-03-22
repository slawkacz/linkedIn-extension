'use strict';
var getProfile = function(id) {
    var profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    if(profiles[id])
        return profiles[id];
    return false;
};
var setProfile = function(data) {
    var profile = JSON.parse(data);
    var profiles = JSON.parse(localStorage.getItem('profiles')) || {};
    profiles[profile.id] = profile;
    localStorage.setItem('profiles',JSON.stringify(profiles));
    return true;
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var response = {};
    switch (request.msg) {
        case 'getProfile':
            response = getProfile(request.id);
            break;
        case 'setProfile':
            response = setProfile(request.profile);
            break;
        default:
            console.log(request);
            break;
    }
    sendResponse(response);
});
chrome.runtime.onInstalled.addListener(function(details) {
    console.log('previousVersion', details.previousVersion);
});