angular.module('App').controller('ProfilesCtrl', function($scope, Profiles){
	$scope.profiles = [];
	$scope.searchText = "piotr";
	 Profiles.getAll().then(function(profiles){
		$scope.profiles = profiles;
	});
});