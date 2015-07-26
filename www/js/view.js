var view = {
	loadMap: function(){
		map = new google.maps.Map(document.getElementById('map-canvas'), model.mapOptions );
	},
};