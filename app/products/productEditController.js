(function(){

	"use strict";

	angular
	.module("myApp")
	.controller("ProductEditController", ["product", "$state", "productService", ProductEditController]);
	 
	 function ProductEditController(product, $state, productService){
	 	var pc = this;

	 	pc.product = product;
	 	pc.priceOption = "percent";

	 	pc.marginPercent = function(){
	 		return productService.calculateMarginPercent(pc.product.price, pc.product.cost);
	 	};

	 	pc.calculatePrice = function(){
	 		var price = 0;

	 		if (pc.priceOption == 'amount'){
	 			price = productService.calculatePriceFromMarkupAmount(pc.product.cost, pc.markupAmount);
	 		}

	 		if(pc.priceOption == 'percent'){
	 			price = productService.calculatePriceFromMarkupPercent(pc.product.cost, pc.markupPercent);
	 		}
	 		pc.product.price = price;
	 	};
	 

	 	if (pc.product && pc.product.productId){
	 		pc.title = "Edit: " + pc.product.name;
	 	}
	 	else{
	 		pc.title = "New Product"
	 	}

	 	pc.open = function($event){
	 		$event.preventDefault();
	 		$event.stopPropagation();

	 		pc.opened = !pc.opened;
	 	};

	 	pc.submit = function(){
	 		
	 		pc.product.$save(function(data){
	 			toastr.success("save Successful");
	 		})
	 	};

	 	// pc.submit = function(isValid){
	 	// 	if(isValid){
	 	// 	pc.product.$save(function(data){
	 	// 		toastr.success("save Successful");
	 	// 	})
	 	// 	}
	 	// 	else{
	 	// 		alert("Please correct the validation errors");
	 	// 	}
	 	// };
	 	
	 	pc.cancel = function(){
	 		$state.go('productList');
	 	};

	 	pc.addTags = function(tags){
	 		if(tags){
	 			var array = tags.split(',');
	 			pc.product.tags = pc.product.tags ? pc.product.tags.concat(array) : array;
	 			pc.newTags = "";
	 		}
	 		else{
	 			alert("Please enter one or more tage seperated by commas");
	 		}
	 	}

	 	pc.removeTag = function(index){
	 		pc.product.tags.splice(index, 1);
	 	}
	}

}());