
var map = new google.maps.Map(document.getElementById('map-canvas'), controller.getMapOptions());

var view = {
	
	init: function(){
		this.loadMap();
		this.renderLocations();
	},

	loadMap: function(){
	},

	// Using for testing it exists
	getmapinfo: function(){
		return this.map;
	},

	renderLocations: function(){
		var locations = controller.getLocations();
		for(i = 0; i < locations.length; i ++){
			location = locations[i];
			this.createMarker(location);
		}
	},

	// credit http://stackoverflow.com/questions/5736691/google-maps-infowindow-showing-on-wrong-marker
	createMarker: function(location){
		var infoWindow = new google.maps.InfoWindow({
			content: controller.parseLocationWindowContent(location)
		});

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(location.lat, location.lng),
			map: map,
			title: location.name
		});

		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);
		});

	}
};