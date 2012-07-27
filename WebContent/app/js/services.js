'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
	  return $resource('phones/:phoneId.json', {}, {
	    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
	  });
}).factory('UIUtil', function(){
	return {
		refreshTypeahead: function(element, options) {
			$('ul.typeahead').remove();
			element.removeData('typeahead');
			element.typeahead(options);
		}
	};
});
