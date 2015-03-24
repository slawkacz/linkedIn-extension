angular.module('App').controller('ProfilesCtrl', function($scope, Profiles){
	$scope.profiles = [];
	$scope.searchText = "";
	 Profiles.getAll().then(function(profiles){
		$scope.profiles = profiles;
	});
});