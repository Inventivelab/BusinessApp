(function(){

	"use strict";

	angular
	.module("myApp")
	.controller("ProductController",["productResource", ProductController]);
	 
	 function ProductController(productResource){
	 	var pc = this;

	 	productResource.query(function(data){
	 		pc.products = data;
	 	});

		pc.showImage = false;
		pc.toggleImage = function(){
			pc.showImage = !pc.showImage;
		}
	}
		// var products = [
		// {
		// 	"id": 1,
		// 	"name": "App Cubator",
		// 	"description": "Developer Business Network",
		// 	"price": 250000,
		// 	"lauchdate": "May 23, 2014",
		// 	"category": "Web App",
		// 	"tags": ["Social media", "technologies"],
		// 	"image": "./images/Appcubator.png",
		// 	"url": "http://app-cubator.com"

		// },
		// {
		// 	"id": 2,
		// 	"name": "Lister",
		// 	"description": "Real estate Web App",
		// 	"price": 450000,
		// 	"lauchdate": "June 23, 2014",
		// 	"category": "Web App",
		// 	"tags": ["Real estate", "Social media", "technologies"],
		// 	"image": "./images/Lister5.png",
		// 	"url": "http://lister.pro"

		// },
		// {
		// 	"id": 3,
		// 	"name": "Invettive",
		// 	"description": "Software Developement Company",
		// 	"price": 550000,
		// 	"lauchdate": "December 12, 2014",
		// 	"category": "Web App",
		// 	"tags": ["Software","Social media", "technologies"],
		// 	"image": "./images/Mastube.png",
		// 	"url": "http://inventive.com"

		// }]
		

}());