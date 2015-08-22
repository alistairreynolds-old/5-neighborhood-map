var view = {
	self: this,
	mapOptions: model.mapOptions,
	map: new google.maps.Map(document.getElementById('map'), {
    	zoom: model.mapOptions.zoom,
    	center: new google.maps.LatLng(model.mapOptions.center.lat, model.mapOptions.center.lng)
   	})
}