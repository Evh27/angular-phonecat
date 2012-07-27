'use strict';

/* Filters */

angular.module('phonecatFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
}).filter('categoryFilter', function() {
	return function(items, cat) {
		var prev = cat.previousCategory;
		if(prev && prev.selectedItem ) {

			var previousCategoryItem = prev.selectedItem[prev.displayProp];
		
			var filtered = [];
			for ( var i = 0; i < items.length; i++) {
				var item = items[i];
				if(item[prev.displayProp] == previousCategoryItem) {
					filtered.push(item);
				}
			}
			return filtered;
		} else {
			return items;
		}
	};
});
