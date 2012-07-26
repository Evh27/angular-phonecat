'use strict';

/* Directives */
angular.module('phonecatDirectives', ['phonecatServices'])
	.directive('typeahead', function(Phone) {
		return function(scope, element, attrs) {
			
			element.bind('input change', function() {
				scope.current_category.filter = element.attr('value');
				scope.$apply();
				
				if(scope.current_category.title == 'phone') {
					var phones = Phone.query([], function() {
						var typeaheadSource = [];
						for ( var i = 0; i < phones.length; i++) {
							typeaheadSource.push(phones[i].name);
						}
						element.typeahead({source: typeaheadSource, items: 10});
					});
				} 
				else if(scope.current_category.title == 'carrier') {
					var typeaheadSource = [],
						carriers = scope.current_category.items,
						id = scope.current_category.idProp;
					
					for ( var i = 0; i < carriers.length; i++) {
						var carrier = carriers[i];
						typeaheadSource.push(carrier[id]); 
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
				
				var currentCategory = scope.current_category;
				var section = $('#collapse-' + currentCategory.title);
				var nextCategory = scope.categories[attrs.nextCategory];
				
				currentCategory.selectedItem = currentCategory.items[attrs.categoryItemClick];
				scope.current_category = nextCategory;
				scope.$apply();
				
				section.prev().addClass('alert alert-success');
				section.prev().children('a.close').removeClass('hide');
				
				section.collapse('hide');
				$('#collapse-' + nextCategory.title).collapse('show');
				$('#accordion > .accordion-body:not(.in)').collapse('hide');
				
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