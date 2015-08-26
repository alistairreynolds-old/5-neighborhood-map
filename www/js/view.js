var View = function(){
	'use strict';
	// Load map and set the options from model
	this.mapOptions = model.mapOptions;
	this.map = new google.maps.Map(document.getElementById('map'), {
    	zoom: model.mapOptions.zoom,
    	center: new google.maps.LatLng(model.mapOptions.center.lat, model.mapOptions.center.lng)
   	});

	// Set timer if google maps not loaded in time. Credit - http://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
	this.setTimer = function(){
		window.setTimeout(function() {
		    if (typeof google != 'object' || typeof google.maps != 'object') {
		    	$('body').html('Error loading google maps');
		    }
		}, 2000);   
	};	
};

var view = new View();