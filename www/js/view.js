var view = {

	init: function(){
		this.loadMap();
		this.renderLocations();
	},

	loadMap: function(){
		this.map = new google.maps.Map(document.getElementById('map-canvas'), controller.getMapOptions() );
	},

	// Using for testing it exists
	getmapinfo: function(){
		return this.map;
	},

	renderLocations: function(){
		var locations = controller.getLocations();
		for(i = 0; i < locations.length; i ++){
			var infoWindow = new google.maps.InfoWindow({
				content: controller.parseLocationWindowContent(locations[i])
			});

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
				map: this.map,
				title: locations[i].name
			});

			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.open(this.map, marker);
			});
		}
	}
};