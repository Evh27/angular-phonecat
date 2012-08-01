'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone, Category, Set) {
		
	$scope.categories = 
		[Category.create({
			 title : 'carrier',
			 typeahead: function() {
				 var typeaheadCarriers = [],
					carriers = $scope.current_category.items,
					displayProp = $scope.current_category.displayProp;
				
				 for ( var i = 0; i < carriers.length; i++) {
					var carrier = carriers[i];
					typeaheadCarriers.push(carrier[displayProp]); 
				 }
				 return typeaheadCarriers;
			 }
		}), 
		 Category.create({	
			 title: 'phone',
			 displayProp: 'name',
			 displayType: 'thumbnails',
			 initItems: function(category) {
				 var phones = Phone.query([], function(phones) {
				 	 var carrierSet = Set.create('carrier');
					 for (var i = 0; i < phones.length; i++) {
						 carrierSet.add(phones[i].carrier);
					 }
					 $scope.categories[0].items = carrierSet.toArray();
				 });
				 return phones;
			 },
		 	 typeahead: function() {
		 		var typeaheadPhones = [];
		 		 Phone.query([], function(phones) {
					 for ( var i = 0; i < phones.length; i++) {
						 var prev = $scope.current_category.previousCategory;
						 var prevSelectedItem = prev.selectedItem[prev.displayProp];
						 if(phones[i][prev.displayProp] == prevSelectedItem)
							 typeaheadPhones.push(phones[i].name);
					 }
				 });
		 		 return typeaheadPhones;
		 	 }
		 })];
	
	for(var i=1; i < $scope.categories.length; i++) {
		$scope.categories[i].previousCategory = $scope.categories[i-1];
	}	
	
	$scope.setCategory = function(category) {
		$scope.current_category = category;
		
		if(category) 
			category.filter = '';
	};
	$scope.setCategory($scope.categories[0]);
	
	$scope.selectItem = function(itemIndex) {
		var currentCategory = $scope.current_category,
			nextCategoryIndex = $scope.categories.indexOf(currentCategory) + 1;
		
		currentCategory.selectedItem = currentCategory.items[itemIndex];
		$scope.setCategory($scope.categories[nextCategoryIndex]);
	};
	
	$scope.clearCategory = function(category) {
		var categoryIndex = $scope.categories.indexOf(category),
			numCategories = $scope.categories.length;
		
		$scope.setCategory(category);
		
		for(var i = numCategories-1; i >= categoryIndex; i-- ) {
			var cat = $scope.categories[i];
			
			if(cat.selectedItem) {
				cat.selectedItem = undefined;
			}
		}
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
