angular.module('phonecatModels', [])
	.service('Model', function() {
		
		/* Category Object */
		function Category(options) {
					
			this.title = options.title;
			(options.displayProp) ? this.displayProp = options.displayProp : this.displayProp = options.title;
			(options.displayType) ? this.displayType = options.displayType : this.displayType = 'list'; 
			if(options.initItems)
				this.items = options.initItems();
			
			this.typeahead = options.typeahead;
		}
		Category.prototype.items = [];
		Category.prototype.selectedItem = undefined;
		Category.prototype.filter = '';
		Category.prototype.displayType = '';
		Category.prototype.displayProp = '';
		Category.prototype.typeahead = undefined;
		Category.prototype.displayName = function() {
			if(this.selectedItem)
				return this.selectedItem[this.displayProp];
			else
				return this.title.charAt(0).toUpperCase() + this.title.substr(1);
		};
		
		/* Set Object */
		function Set(arrayKey) { this.arrayKey = arrayKey; }
		Set.prototype.collection = {};
		Set.prototype.add = function(o) { if(o != undefined) this.collection[o] = true; };
		Set.prototype.remove = function(o) { delete this.collection[o]; };
		Set.prototype.arraySort = function(a,b){
		    if(a.arrayKey<b.arrayKey) return -1;
		    if(a.arrayKey>b.arrayKey) return 1;
		    return 0;
		}; 
		Set.prototype.toArray = function() {
			var array = [];
			for(var prop in this.collection) {
				var propObject = {};
				propObject[this.arrayKey] = prop;
				array.push(propObject);
			}
			return array.sort(this.arraySort);
		};
		
		/* API */		
		return {
			Category : function(options) {
				return new Category(options)
			},
	
			Set : function(arrayKey) {
				return new Set(arrayKey);
			}
		};		
	});