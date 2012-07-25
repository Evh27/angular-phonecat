'use strict';

/* Directives */
angular.module('phonecatDirectives', ['phonecatServices'])
	.directive('phoneTypeahead', function(Phone) {
		return function(scope, element) {
			var phones = [];
			
			phones = Phone.query([], function() {
				var typeaheadSource = [];
				for ( var i = 0; i < phones.length; i++) {
					typeaheadSource[i] = phones[i].name;
				}
				element.typeahead({source: typeaheadSource, items: 10});
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
				for(var carrier in carrierSet ) {
					var match = phoneCarriersString.match(carrier);
					if(match)
						chartData.push([carrier, match.length]);
				}
				
//				var chartData = [];
//				phones:
//				for (var i = 0; i < phones.length; i++) {
//					var carrier = phones[i].carrier;
//					carriers:
//					if(carrier) {
//						for(var j = 0; j < chartData.length; j++) {
//							var currentCarrier = chartData[j]; 
//							if(currentCarrier[0] == carrier) {
//								currentCarrier[1]++;
//								break carriers;
//							}
//						}
//						chartData.push([carrier, 1]);
//					}						
//				}
				data.addRows(chartData);
				
				var options = {'title':'Carriers'};

		        var chart = new google.visualization.PieChart(element[0]);
		        chart.draw(data, options);
			}, true);
//			var phones = scope.$eval(attrs.carrierChart);
		};
	});