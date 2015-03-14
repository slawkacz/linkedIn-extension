'use strict';
var getProfile = function(id) {
    return false;
};
var setProfile = function(data) {
    return true;
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
    
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