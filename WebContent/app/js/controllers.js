'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
		
	$scope.categories = 
		[new Category('carrier'), 
		new Category('phone', 'name', function(category) {
			
			Phone.query([], function(phones) {
				
				var carrierSet = new Set('carrier');
				for (var i = 0; i < phones.length; i++) {
					carrierSet.add(phones[i].carrier);
				}
				
				$scope.categories[0].items = carrierSet.toArray();
				$scope.categories[1].items = phones;
			});
		})];
	$scope.current_category = 0;
	
	if (!$scope.$parent.orderProp)
		$scope.$parent.orderProp = 'name';
	
	$scope.setCategoryItem = function(item) {
		$scope.categories[$scope.current_category].selectedItem = item;
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
