'use strict';

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('phonecatServices'));


  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;
    
    var phoneData = [{name: 'Nexus S'}, {name: 'Motorola DROID'}];

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond(phoneData);

      scope = $rootScope.$new();
      ctrl = $controller(PhoneListCtrl, {$scope: scope});
    }));


    it('should create two categories', function() {
      expect(scope.categories.length).toEqual(2);
    });
    
    it('should load phones correctly', function() {
    	$httpBackend.flush();
    	
    	var phones = scope.categories[1]; 
    	
    	expect(phones.title).toEqual('phone');
        expect(phones.items.length).toEqual(phoneData.length);
        
    });

    it('should set the first category to "Carrier"', function() {
      expect(scope.current_category.title).toBe('carrier');
    });
    
  });


  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
          return {
            name: 'phone xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/xyz.json').respond(xyzPhoneData());

      $routeParams.phoneId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller(PhoneDetailCtrl, {$scope: scope});
    }));


    it('should fetch phone detail', function() {
      expect(scope.phone).toEqualData({});
      $httpBackend.flush();

      expect(scope.phone).toEqualData(xyzPhoneData());
    });
  });
});
