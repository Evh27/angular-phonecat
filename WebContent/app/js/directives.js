'use strict';

/* Directives */
angular.module('phonecatDirectives', ['phonecatServices'])
	.directive('typeahead', function(Phone) {
		return function(scope, element, attrs) {
			element.bind('input change', function() {
				scope[scope.category + 'Filter'] = element.attr('value');
				scope.$apply();
				
				
				if(scope.category == 'phone') {
									
					var phones = Phone.query([], function() {
						var typeaheadSource = [];
						for ( var i = 0; i < phones.length; i++) {
							typeaheadSource[i] = phones[i].name;
						}
						element.typeahead({source: typeaheadSource, items: 10});
					});
				} 
				else if(scope.category == 'carrier') {
					var typeaheadSource = [];
					for ( var i = 0; i < scope.carriers.length; i++) {
						typeaheadSource[i] = scope.carriers[i].val;
					}
					element.typeahead({source: typeaheadSource, items: 10});
				}
			});
		};
	})
	.directive('categoryAccordion', function(){
		return function(scope, element, attrs) {
			scope.$watch(attrs.categoryAccordion, 
					function(data) {
				if(data && data.length == 1) {
					element.prev().children().text(data[0].val).addClass('selected');
					element.collapse();
					$('#collapse-' + attrs.nextCategory).collapse();
					$('input').attr('value', '')
					scope.category = attrs.nextCategory;
				}
			}, true);
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