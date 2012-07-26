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
function Category(title, idProp, intialiseItems) {
	this.title = title;
	(idProp) ? this.idProp = idProp : this.idProp = title;
		
	if(intialiseItems)
		intialiseItems(this);
}
Category.prototype.items = new Set();
Category.prototype.selectedItem = undefined;
Category.prototype.filter = '';
Category.prototype.display = function() {
	if(this.selectedItem)
		return this.selectedItem[this.idProp];
	else
		return this.title.charAt(0).toUpperCase() + this.title.substr(1);
};
