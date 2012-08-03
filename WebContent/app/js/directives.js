'use strict';

/* Directives */
angular.module('phonecatDirectives', ['phonecatServices'])
	.directive('categoryTypeahead', function(UIUtil) {
		return function(scope, element, attrs) {
			scope.$watch(attrs.ngModel, function() {
				if(scope.current_category) {
					var items = scope.current_category.typeahead();
					element.typeahead({source: items, items: 5});
				}
			}, true);
		};
	})
	.directive('searchTypeahead', function(Phone, UIUtil) {
		return function(scope, element, attrs) {
			element.bind('input change', function() {
				var phones = Phone.res.query([], function() {
					var typeaheadPhones = [];
					for ( var i = 0; i < phones.length; i++) {
						typeaheadPhones.push(phones[i].name);
					}
					UIUtil.refreshTypeahead(element, {source: typeaheadPhones, items: 5});
				});
			});
		};		
	})
	.directive('categoryCollapse', function(UIUtil, $timeout) {
		return function(scope, element, attrs) {
			scope.$watch('current_category', function(newCat) {
				if(newCat && newCat.title == attrs.categoryCollapse) {
					$timeout(function() {
						element.collapse('show');
						UIUtil.clearTypeahead();
					}, 0);
				} 
				else if(element.hasClass('in')) {
					element.collapse('hide');
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