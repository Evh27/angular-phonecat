'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
	$scope.phones = Phone.query();

	if (!$scope.$parent.orderProp)
		$scope.$parent.orderProp = 'age';

	$scope.typeAhead = function() {
		var phones = [];
		phones = Phone.query([], function() {
			var typeaheadSource = [];
			for ( var i = 0; i < phones.length; i++) {
				typeaheadSource[i] = phones[i].name;
			}
			$('input').typeahead({
				source : typeaheadSource,
				items : 10
			});
		});
	};
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
