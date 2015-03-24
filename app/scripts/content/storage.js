'use strict';
var Storage = {
    getProfile: function(id, callback) {
        chrome.storage.sync.get('profiles', function(res) {
            if (res.profiles && res.profiles[id]) {
                callback(res.profiles[id]);
            } else {
                callback(false);
            }
        });
    },
    setProfile: function(data, callback) {
        var profile = data;
        chrome.storage.sync.get('profiles', function(res) {
            if(!res.profiles)
                res.profiles = {};
        	res.profiles[profile.id] = profile;
            chrome.storage.sync.set({'profiles':res.profiles}, function() {
                callback(true);  
            });
        });
    }
};