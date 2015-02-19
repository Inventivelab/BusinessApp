(function(){
	"use strict";
	
	var app = angular.module("productResourceMock", ["ngMockE2E"]);

	app.run(function($httpBackend){
		var products = [
		{
			"productId": 1,
			"name": "App Cubator",
			"description": "Developer Business Network",
			"price": 350000,
			"cost": 200000,
			"lauchdate": "May 23, 2014",
			"phone": 2409907960,
			"category": "Web App",
			"tags": ["Social media", "technologies"],
			"image": "./images/Appcubator.png",
			"url": "http://app-cubator.com"

		},
		{
			"productId": 2,
			"name": "Lister",
			"description": "Real estate Web App",
			"price": 450000,
			"cost": 300000,
			"lauchdate": "June 23, 2014",
			"phone": 2349906789,
			"category": "Web App",
			"tags": ["Real estate", "Social media", "technologies"],
			"image": "./images/Lister5.png",
			"url": "http://lister.pro"

		},
		{
			"productId": 3,
			"name": "Invettive",
			"description": "Software Developement Company",
			"price": 550000,
			"cost": 200000,
			"lauchdate": "December 12, 2014",
			"phone": 2307780099,
			"category": "Web App",
			"tags": ["Software","Social media", "technologies"],
			"image": "./images/Mastube.png",
			"url": "http://inventive.com"

		},
		{
			"productId": 4,
			"name": "Envettive",
			"description": "Event and Startup Web App",
			"price": 5000000,
			"cost": 3500000,
			"lauchdate": "Novenber 12, 2014",
			"phone": 22407169000,
			"category": "Web App",
			"tags": ["Software","Social media", "IOS", "technologies"],
			"image": "./images/Zynga.png",
			"url": "http://enventive.com"

		},
		{
			"productId": 5,
			"name": "Metube",
			"description": "Video hub web app",
			"price": 200000,
			"cost": 3500000,
			"lauchdate": "April 12, 2014",
			"phone": 2307780099,
			"category": "Web App",
			"tags": ["Software","Social media", "Android", "technologies"],
			"image": "./images/masma.png",
			"url": "http://metube.herokuapp.com"

		}
		// {
		// 	"productId": 6,
		// 	"name": "NaijaProperty",
		// 	"description": "Real Estate Portal and Directory",
		// 	"price": 10000000,
		// 	"cost": 7500000,
		// 	"lauchdate": "December 30, 2010",
		// 	"phone": 2307780099,
		// 	"category": "Web App",
		// 	"tags": ["Software","Social media", "Real Estate", "Property", "technologies"],
		// 	"image": "./images/thumb_jpg.png",
		// 	"url": "http://naijaproperty.com"

		// },
		// {
		// 	"productId": 7,
		// 	"name": "MasmaSpace",
		// 	"description": "News curator web application",
		// 	"price": 6000000,
		// 	"cost": 2500000,
		// 	"lauchdate": "December 02, 2012",
		// 	"phone": 2307780099,
		// 	"category": "Web Application",
		// 	"tags": ["Software","Social media", "News Desk", "technologies"],
		// 	"image": "./images/masmaspace3.png",
		// 	"url": "http://masmaspace.com"

		// }
		];

		var productUrl = "/api/products"
		$httpBackend.whenGET(productUrl).respond(products);

		var editingReqex = new RegExp(productUrl + "/[0-9][0-9]*", '');
		$httpBackend.whenGET(editingReqex).respond(function(method, url, data){
			var product = {"productId": 0};
			var parameters = url.split('/');
			var length = parameters.length;
			var id = parameters[length - 1];

			if (id > 0){
				for(var i = 0; i < products.length; i++){
					if(products[i].productId == id){
						product = products[i];
						break;
					}
				};
			}
			return [200, product, {}];
		});

		$httpBackend.whenPOST(productUrl).respond(function(method, url, data){
			var product = angular.fromJson(data);
			if(!product.productId){
				//new product id
				product.productId = products[products.length - 1].productId + 1;
				products.push(product);
			}
			else{
				//updated product
				for(var i = 0; i < products.length; i++){
					if(products[i].productId == product.productId){
						products[i] = product;
						break;
					}
				};
			}
			
			return [200, product, {}];
		});

		//Pass through any requests for application files
		$httpBackend.whenGET(/app/).passThrough();
		
	})
}());