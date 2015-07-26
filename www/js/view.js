var viewModel = {
	loadMap: function(){
		map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 8,
			center: {lat: -34.397, lng: 150.644}
		});
	},
};