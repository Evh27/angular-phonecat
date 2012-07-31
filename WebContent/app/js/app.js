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
