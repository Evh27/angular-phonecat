'use strict';

/* Controllers */
angular.module('phonecatControllers', ['phonecatServices'])
	.controller('PhoneListCtrl', function ($scope, Categories) {
		
		$scope.categories = function() {return Categories.all();};
		
		$scope.setCategory = function(category) {
			if(category) 
				category.filter = '';
			
			$scope.current_category = category;
		};
		
		//set first category
		$scope.setCategory($scope.categories()[0]);
		
		$scope.selectItem = function(itemIndex) {
			var currentCategory = $scope.current_category,
				nextCategoryIndex = $scope.categories().indexOf(currentCategory) + 1;
			
			currentCategory.selectedItem = currentCategory.items[itemIndex];
			$scope.setCategory($scope.categories()[nextCategoryIndex]);
		};
		
		$scope.clearCategory = function(category) {
			var categoryIndex = $scope.categories().indexOf(category),
				numCategories = $scope.categories().length;
			
			$scope.setCategory(category);
			
			for(var i = numCategories-1; i >= categoryIndex; i-- ) {
				var cat = $scope.categories()[i];
				
				if(cat.selectedItem) {
					cat.selectedItem = undefined;
				}
			}
		};
		
	})
	.controller('PhoneDetailCtrl', function($scope, $routeParams, Phone) {

		$scope.phone = Phone.res.get({
			phoneId : $routeParams.phoneId
		}, function(phone) {
			$scope.setImage(phone.images[0]);
		});

		$scope.setImage = function(imageUrl) {
			$scope.mainImageUrl = imageUrl;
		};
	});