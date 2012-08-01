'use strict';

/* jasmine specs for directives go here */

describe('Directives', function() {
	
	beforeEach(module('phonecatServices'));
	beforeEach(module('phonecatDirectives'));	
	
	describe('categoryCollapse', function() {
		var scope, element, clone;
		
		beforeEach(inject(function($compile, $rootScope) {
			scope = $rootScope.$new();
			scope.current_category = {};
			
			spyOn(scope, '$watch').andCallThrough();
			
			element = angular.element('<div category-collapse="whatever" />');
			spyOn(element, 'collapse');
			clone = $compile(element)(scope, function(clonedElement){
				spyOn(clonedElement, 'collapse');
			});
		}));
		
		it('should set watcher on "current_category"', function() {
			expect(scope.$watch).toHaveBeenCalledWith('current_category', jasmine.any(Function));
		});
		
		describe('matching title', function() {
			var watchFunction;
			
			beforeEach(function() {
				watchFunction = scope.$watch.mostRecentCall.args[1];
				var closures = watchFunction.closures;
				
				watchFunction({title: 'whatever'});
			});
			
			it('should collapse the element', function() {
//				expect(element.collapse).toHaveBeenCalledWith('show');
//				expect(clone.collapse).toHaveBeenCalledWith('show');
//				expect(element.hasClass('in')).toBe(true);
			});
			
		});
	
	});
	
});
