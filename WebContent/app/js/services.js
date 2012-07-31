'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource'])
	.factory('Phone', function($resource) {
		return $resource('phones/:phoneId.json', {}, {
			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
		});
	})
	.factory('Category', function() {
		
		/** Category Object **/
		function Category(title, displayProp, initItems) {
			this.title = title;
			(displayProp) ? this.displayProp = displayProp : this.displayProp = title;
				
			if(initItems)
				initItems(this);
		}
		Category.prototype.items = [];
		Category.prototype.selectedItem = undefined;
		Category.prototype.filter = '';
		Category.prototype.displayType = '';
		Category.prototype.displayProp = '';
		Category.prototype.typeahead = undefined;
		Category.prototype.displayName = function() {
			if(this.selectedItem)
				return this.selectedItem[this.displayProp];
			else
				return this.title.charAt(0).toUpperCase() + this.title.substr(1);
		};
		
		return {
			create : function(options) {
				var cat = new Category();
				
				cat.title = options.title;
				(options.displayProp) ? cat.displayProp = options.displayProp : cat.displayProp = options.title;
				(options.displayType) ? cat.displayType = options.displayType : cat.displayType = 'list'; 
				if(options.initItems)
					cat.items = options.initItems();
				
				cat.typeahead = options.typeahead;
								
				return cat;
			}
		};		
	})
	.factory('Set', function() {
		
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
		
		return {
			create : function(arrayKey) {
				return new Set(arrayKey);
			}
		};
	})
	.factory('UIUtil', function() {
		return {
			refreshTypeahead: function(element, options) {
				$('ul.typeahead').remove();
				element.removeData('typeahead');
				element.typeahead(options);
			},		
			clearTypeahead: function(element) {
				$('ul.typeahead').remove();
				$('#filter').removeData('typeahead');
			}
		};
	});
