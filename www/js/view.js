var view = {
	self: this,
	mapOptions: model.mapOptions,
	map: new google.maps.Map(document.getElementById('map'), {
    	zoom: model.mapOptions.zoom,
    	center: new google.maps.LatLng(model.mapOptions.center.lat, model.mapOptions.center.lng)
   	}),

	// Set timer if google maps not loaded in time. Credit - http://stackoverflow.com/questions/9228958/how-to-check-if-google-maps-api-is-loaded
	setTimer: function(){
		window.setTimeout(function() {
		    if (typeof google != 'object' || typeof google.maps != 'object') {
		    	$('body').html('Error loading google maps');
		    }else{
		    	//$('body').append('<input type="text" placeholder="Search..." data-bind="points" class="search" ' + 
		    	//	'onkeyup="viewModel.filterPoints(this.value)">');
		    }
		}, 2000);   
	}	
}
