angular.module('App').factory('Profiles', function($q) {
    return {
        getAll: function() {
            var deferred = $q.defer();
            chrome.storage.sync.get('profiles', function(res) {
                if (res.profiles) { 
                    var resArr = []
                    for(var i in res.profiles) {
                        resArr.push(res.profiles[i])
                    }
                    deferred.resolve(resArr);
                } else deferred.rejest('no-profiles');
            });
            return deferred.promise;
        }
    }
});