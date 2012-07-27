'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices', 'phonecatDirectives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'});
}]);

(function($){
	$.extend($.fn.typeahead.Constructor.prototype, {
		select: function() {
			var val = this.$menu.find('.active').attr('data-value');
		    this.$element
		      .val(this.updater(val))
		      .trigger('input').change();

		    return this.hide();
		} 
	});
})(window.jQuery);


/** Set Object **/
function Set(arrayKey) { this.arrayKey = arrayKey; }
Set.prototype.collection = {};
Set.prototype.add = function(o) { if(o != undefined) this.collection[o] = true; };
Set.prototype.remove = function(o) { delete this.collection[o]; };
Set.prototype.arraySort = function(a,b){
    if(a.arrayKey<b.arrayKey) return -1;
    if(a.arrayKey>b.arrayKey) return 1;
    return 0;
}; 
Set.prototype.toArray = function() {
	var array = [];
	for(var prop in this.collection) {
		var propObject = {};
		propObject[this.arrayKey] = prop;
		array.push(propObject);
	}
	return array.sort(this.arraySort);
};

/** Category Object **/
function Category(title, displayProp, intialiseItems) {
	this.title = title;
	(displayProp) ? this.displayProp = displayProp : this.displayProp = title;
		
	if(intialiseItems)
		intialiseItems(this);
}
Category.prototype.items = new Set();
Category.prototype.selectedItem = undefined;
Category.prototype.filter = '';
Category.prototype.displayType = 'list';
Category.prototype.displayProp = '';
Category.prototype.applyFilter = function() {
	
	var returnItems = [];
	for(var i = 0; i < this.items.length; i++) {
		var item = this.items[i],
		res = false;
		var textFilter = 
			(this.filter.length > 0) ? item[this.displayProp].contains(this.filter) : true;
		if(this.previousCategory && this.previousCategory.selectedItem) {
			res = (item[prev.displayProp] == prev.selectedItem[prev.displayProp])
				&& textFilter; 
		} else {
			res = textFilter;
		}
		if(res) returnItems.push(item);
	}
	return returnItems;
};
Category.prototype.displayName = function() {
	if(this.selectedItem)
		return this.selectedItem[this.displayProp];
	else
		return this.title.charAt(0).toUpperCase() + this.title.substr(1);
};
