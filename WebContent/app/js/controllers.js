'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
	$scope.phones = Phone.query([], function() {
		
		var carrierSet = new Set();
		for (var i = 0; i < $scope.phones.length; i++) {
			carrierSet.add($scope.phones[i].carrier);
		}
		
		$scope.carriers = carrierSet.toArray();
	});
	
	$scope.category = 'carrier';
	$scope.carrierFilter = '';
	$scope.phoneFilter = '';
	
	if (!$scope.$parent.orderProp)
		$scope.$parent.orderProp = 'name';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];

function PhoneDetailCtrl($scope, $routeParams, Phone) {

	$scope.phone = Phone.get({
		phoneId : $routeParams.phoneId
	}, function(phone) {
		$scope.setImage(phone.images[0]);
	});

	$scope.setImage = function(imageUrl) {
		$scope.mainImageUrl = imageUrl;
	};
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
