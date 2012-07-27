'use strict';

/* Directives */
angular.module('phonecatDirectives', ['phonecatServices'])
	.directive('categoryTypeahead', function(Phone, UIUtil) {
		return function(scope, element, attrs) {
			
			element.bind('input change', function() {
				scope.current_category.filter = element.attr('value');
				scope.$apply();
				
				if(scope.current_category.title == 'phone') {
					var phones = Phone.query([], function() {
						var typeaheadPhones = [];
						for ( var i = 0; i < phones.length; i++) {
							var prev = scope.current_category.previousCategory;
							var selectedItem = prev.selectedItem[prev.displayProp];
							if(phones[i][prev.displayProp] == selectedItem)
								typeaheadPhones.push(phones[i].name);
						}
						UIUtil.refreshTypeahead(element, {source: typeaheadPhones, items: 5});
					});
				} 
				else if(scope.current_category.title == 'carrier') {
					var typeaheadCarriers = [],
						carriers = scope.current_category.items,
						displayProp = scope.current_category.displayProp;
					
					for ( var i = 0; i < carriers.length; i++) {
						var carrier = carriers[i];
						typeaheadCarriers.push(carrier[displayProp]); 
					}
					UIUtil.refreshTypeahead(element, {source: typeaheadCarriers, items: 5});
				}
			});
		};
	})
	.directive('searchTypeahead', function(Phone, UIUtil) {
		return function(scope, element, attrs) {
			element.bind('input change', function() {
				var phones = Phone.query([], function() {
					var typeaheadPhones = [];
					for ( var i = 0; i < phones.length; i++) {
						typeaheadPhones.push(phones[i].name);
					}
					UIUtil.refreshTypeahead(element, {source: typeaheadPhones, items: 5});
				});
			});
		};		
	})
	.directive('categoryItemClick', function() {
		return function(scope, element, attrs) {
			element.click(function(event) {
				event.preventDefault();
				
				var currentCategory = scope.current_category;
				var section = $('#collapse-' + currentCategory.title);
				var nextCategory = scope.categories[attrs.nextCategory];
				
				currentCategory.selectedItem = currentCategory.items[attrs.categoryItemClick];
				section.collapse('hide');
				if(nextCategory) {
					scope.setCategory(nextCategory);
					$('#collapse-' + nextCategory.title).collapse('show');
				}				
				scope.$apply();
				
				section.prev().addClass('alert alert-success');
				section.prev().children('a.close').removeClass('hide');
								
				$('#filter').attr('value', '');			
			});			
		};		
	})
	.directive('clearCategory', function() {
		return function(scope, element, attrs) {
			element.click(function(event) {
				event.preventDefault();
				
				var numCategories = scope.categories.length;
				
				for(var i = numCategories-1; i >= attrs.clearCategory; i-- ) {
					var category = scope.categories[i];
					
					if(category.selectedItem) {
						category.selectedItem = undefined;
						$('a.close[clear-category='+i+']').addClass('hide')
							.parent().removeClass('alert alert-success');
						category.filter = '';
					}
									
					if(i == attrs.clearCategory) {
						scope.setCategory(category);
						scope.$apply();
						$('#collapse-' + category.title).collapse('show');
					} else {
						$('#collapse-' + category.title).collapse('hide');
					}
					
				}				
			});
		};
	})	
	.directive('carrierChart', function(Phone) {
		return function(scope, element, attrs) {
			scope.$watch(attrs.carrierChart,
					function(phones) {
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'Carrier');
				data.addColumn('number', 'count');
				
				var carrierSet = new Set();
				var phoneCarriers = [];
				for (var i = 0; i < phones.length; i++) {
					carrierSet.add(phones[i].carrier);
					phoneCarriers.push(phones[i].carrier);
				}
				
				var phoneCarriersString = phoneCarriers.toString();
				
				var chartData = [];
				for (var carrier in carrierSet.collection ) {
					var match = phoneCarriersString.match(carrier);
					if(match)
						chartData.push([carrier, match.length]);
				}
				
				data.addRows(chartData.sort(Set.arraySort));
				
				var options = {'title':'Carriers'};

		        var chart = new google.visualization.PieChart(element[0]);
		        chart.draw(data, options);
			}, true);
		};
	});