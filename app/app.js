(function(){
	"use strict";
	
	var app = angular.module("myApp",
		                      ["common.services", 
		                       "ui.router", 
		                       "ui.mask","ui.bootstrap", "angularCharts",
		                       "productResourceMock"]);

	app.config(function($provide){
		$provide.decorator("$exceptionHandler", ["$delegate", function($delegate){
			return function(exception, cause){
				exception.message = "Please contact the help Desk! \n Message: " + exception.message;
				$delegate(exception, cause);
				alert(exception.message);
			};
		}]);
	});
	
	app.config(["$stateProvider", "$urlRouterProvider", 
		        function($stateProvider, $urlRouterProvider ){

		        	$urlRouterProvider.otherwise('/');

		        	$stateProvider
		        	.state("home", {
		        		url: "/",
		        		templateUrl: "app/views/home.html"
		        	})

		        	.state("productList", {
		        		url: "/products",
		        		templateUrl: "app/products/productListView.html",
		        		controller: "ProductController as pc"
		        	})
		        	
		        	.state("productEdit", {
		        		abstract: true,
		        		url: "/products/edit/:productId",
		        		templateUrl: "app/products/productEditView.html",
		        		controller: "ProductEditController as pc",

		        		resolve: {
		        		productResource: "productResource",
				        		product: function(productResource, $stateParams){
				        			var productId = $stateParams.productId;
				        			return productResource.get({productId:productId}).$promise;
				        	  }
				        }
		        	})
  					.state("productEdit.info", {
		        		url: "/info",
		        		templateUrl: "app/products/productEditInfo.html"
		      
		        	})
  					.state("productEdit.price", {
		        		url: "/price",
		        		templateUrl: "app/products/productEditPrice.html"
		        		
		        	})
  					.state("productEdit.tags", {
		        		url: "/tags",
		        		templateUrl: "app/products/productEditTags.html"
		        		
		        	})
		  
		        	.state("productDetail", {
		        		url: "/products/:productId",
		        		templateUrl: "app/products/productDetailView.html",
		        		controller: "ProductDetailController as pc",
		        	
		        	resolve: {
		        		productResource: "productResource",
				        		product: function(productResource, $stateParams){
				        			var productId = $stateParams.productId;
				        			return productResource.get({productId:productId}).$promise;
				        	  }
				        }
		        	})
		        	.state("priceAnalytics", {
		        		url: "/priceAnalytics",
		        		templateUrl: "app/prices/priceAnalyticsView.html",
		        		controller: "PriceAnalyticsController",
		        		resolve: {
		        			productResource: "productResource",

		        			products: function(productResource){
		        				return productResource.query(function(response){
		        					//no code needed for success
		        				},
		        				function(response){
		        					if(response.status == 404){
		        						alert("Error accesing resource: " + response.config.method + " " + response.config.url);
		        					} else{
		        						alert(response.statusText);
		        					}
		        				}).$promise;
		        			}
		        		}
		        	})
		        }]);
}());