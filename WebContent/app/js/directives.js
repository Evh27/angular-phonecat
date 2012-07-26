'use strict';

/* Directives */
angular.module('phonecatDirectives', ['phonecatServices'])
	.directive('typeahead', function(Phone) {
		return function(scope, element, attrs) {
			
			element.bind('input change', function() {
				scope.categories[scope.current_category].filter = element.attr('value');
				scope.$apply();
				
				var currentScopeTitle = scope.categories[scope.current_category].title;
				if(currentScopeTitle == 'phone') {
					var phones = Phone.query([], function() {
						var typeaheadSource = [];
						for ( var i = 0; i < phones.length; i++) {
							typeaheadSource[i] = phones[i].name;
						}
						element.typeahead({source: typeaheadSource, items: 10});
					});
				} 
				else if(currentScopeTitle == 'carrier') {
					var typeaheadSource = [];
					var carriers = scope.categories[scope.current_category].items;
					for ( var i = 0; i < carriers.length; i++) {
						typeaheadSource[i] = carriers[i].val;
					}
					element.typeahead({source: typeaheadSource, items: 10});
				}
			});
		};
	})
	.directive('categoryItemClick', function() {
		return function(scope, element, attrs) {
			element.click(function(event) {
				event.preventDefault();
				
				var currentCategoryCollapse = $('#collapse-' + scope.current_category);
				var nextCategory = currentCategoryCollapse.attr('next-category');
				
				scope.setCategoryItem(element.text());
				scope.current_category = nextCategory;
				scope.$apply();
				
				currentCategoryCollapse.prev().addClass('alert alert-success fade in');
				currentCategoryCollapse.prev().children('a.close').removeClass('hide');
				currentCategoryCollapse.collapse('hide');
				
				$('#collapse-' + nextCategory).collapse();
				
				$('input').attr('value', '');
			
			});			
		};		
	})
	.directive('clearCategory', function() {
		return function(scope, element, attrs) {
			element.click(function(event) {
				event.preventDefault();
				
				scope.current_category = attrs.clearCategory;
				scope.setCategoryItem('');
				scope.$apply();
				
				element.addClass('hide');
				element.parent().removeClass('alert alert-success');
				$('#collapse-' + scope.current_category).collapse();
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