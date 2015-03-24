angular.module('App').directive('profile', function() {
    return {
        restrict: 'E',
        scope: {
            profile: '='
        },
        templateUrl: 'templates/profile.html'
    }
})