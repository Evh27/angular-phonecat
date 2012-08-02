'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource'])
	.service('Phone', function($resource) {
		this.res = $resource('phones/:phoneId.json', {}, {
			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
		});
	})	
	.service('Categories', function(Model, Phone) {
		var categories = [];
		var add = function(category) {categories.push(category);};
		
		add(Model.Category({
			 title : 'carrier',
			 typeahead: function() {
				 var typeaheadCarriers = []
				 for ( var i = 0; i < this.items.length; i++) {
					var carrier = this.items[i];
					typeaheadCarriers.push(carrier[this.displayProp]); 
				 }
				 return typeaheadCarriers;
			 }
		}));
		
		add(Model.Category({	
			 title: 'phone',
			 displayProp: 'name',
			 displayType: 'thumbnails',
			 initItems: function(category) {
				 var phones = Phone.res.query([], function(phones) {
				 	 var carrierSet = Model.Set('carrier');
					 for (var i = 0; i < phones.length; i++) {
						 carrierSet.add(phones[i].carrier);
					 }
					 categories[0].items = carrierSet.toArray();
				 });
				 return phones;
			 },
		 	 typeahead: function() {
				var typeaheadPhones = [],
					prev = this.previousCategory,
					prevSelectedItem = prev.selectedItem[prev.displayProp];
				
				Phone.res.query([], function(phones) {
					for ( var i = 0; i < phones.length; i++) {
						if(phones[i][prev.displayProp] == prevSelectedItem)
							typeaheadPhones.push(phones[i].name);
					}
				});
				return typeaheadPhones;
		 	 }
		 }));
		
		for(var i=1; i < categories.length; i++) {
			categories[i].previousCategory = categories[i-1];
		}
		
		this.all = function() { return categories; };
	})
	.service('UIUtil', function() {
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
