'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/phones', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/phones');
  });


  describe('Phone list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/');
    });
    
    it('should filter the first category, "carriers"', function() {
    	
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Carrier');
    	
    	input('current_category.filter').enter('verizon');
    	
    	expect(repeater('li:first').count()).toBe(1);
    });
    
    it('should display the name of the selected carrier on the header', function() {
    	element('li:first > a:first').click();
  	
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Other');
    });
    
    it('should clear the selected carrier when clicking the "x"', function() {
    	element('li:first > a:first').click();
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Other');
    	
    	element('a.close:first').click();
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Carrier');
    });
    
  });
  
});
