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

function Set() {}
Set.prototype.collection = {};
Set.prototype.add = function(o) { if(o != undefined) this.collection[o] = true; };
Set.prototype.remove = function(o) { delete this.collection[o]; };
Set.prototype.arraySort = function(a,b){
    if(a.val<b.val) return -1;
    if(a.val>b.val) return 1;
    return 0;
}; 
Set.prototype.toArray = function() {
	var array = [];
	for(var prop in this.collection) {
		array.push({val: prop});
	}
	return array.sort(this.arraySort);
}