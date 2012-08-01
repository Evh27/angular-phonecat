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
    
    it('should display the name of the selected carrier on the highlighted header', function() {
    	element('li:first > a:first').click();
  	
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Other');
    	expect(element('.accordion-heading:first').attr('class')).toContain('alert alert-success');
    });
    
    it('should clear the selected carrier when clicking the "x"', function() {
    	element('li:first > a:first').click();
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Other');
    	
    	element('a.close:first').click();
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Carrier');
    });
    
    it('should allow the user to clear both carrier and phone', function() {
    	element('li:first > a:first').click(); //select first carrier
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).not().toEqual('Carrier');
    	
    	element('li:eq(2) > a:first').click(); //select first phone
    	expect(element('.accordion-heading:last > a.accordion-toggle').text()).not().toEqual('Phone');
    	
    	element('a.close:first').click(); //clear carrier
    	
    	expect(element('div.alert').count()).toEqual(0);
    	expect(element('.accordion-heading:last > a.accordion-toggle').text()).toEqual('Phone');
    	expect(element('.accordion-heading:first > a.accordion-toggle').text()).toEqual('Carrier');
    });
    
  });
  
});
