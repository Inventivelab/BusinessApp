(function(){

	"use strict";

	angular
	.module("myApp")
	.controller("ProductDetailController", ["product", "productService", ProductDetailController]);
	 
	 function ProductDetailController(product, productService){
	 	var pc = this;

	 	pc.product = product;
	 	// {
	 	//   "productId": 2,
			// "name": "Lister",
			// "description": "Real estate Web App",
			// "price": 450000,
			// "lauchdate": "June 23, 2014",
			// "category": "Web App",
			// "tags": ["Real estate", "Social media", "technologies"],
			// "image": "./images/Lister5.png",
			// "url": "http://lister.pro"
   //  };
	 	pc.title = "Product Details: " + pc.product.name;

	 	pc.marginPercent = productService.calculateMarginPercent(pc.product.price, pc.product.cost);

	 	if (pc.product.tags){
	 		pc.product.tagTag = pc.product.tags.toString();
	 	}
	 	
	}

}());