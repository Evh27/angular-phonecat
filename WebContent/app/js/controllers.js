'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
		
	$scope.categories = 
		[new Category('carrier'), 
		new Category('phone', 'name', function(category) {
			
			category.displayType = 'thumbnails';
		
			Phone.query([], function(phones) {
				
				var carrierSet = new Set('carrier');
				for (var i = 0; i < phones.length; i++) {
					carrierSet.add(phones[i].carrier);
				}
				
				$scope.categories[0].items = carrierSet.toArray();
				$scope.categories[1].items = phones;
			});
		})];
	
	for(var i=1; i < $scope.categories.length; i++) {
		$scope.categories[i].previousCategory = $scope.categories[i-1];
	}	
	
	$scope.setCategory = function(category) {
		$scope.current_category = category;
	};
	$scope.setCategory($scope.categories[0]);
	
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
