var controller = {
	getMapOptions: function(){
		return model.mapOptions;
	},

	getLocations: function(){
		return model.mapLocations.locations;
	},

	parseLocationWindowContent: function(location){
		var html = '<div>' + 
			'<h2>' + location.name + '</h2>' + 
			'<div><div style="float:left; width:60%;">' + location.contentString + '<br />' + 
			'<a href="' + location.webUrl + '" target="_blank">' + location.web + '</a>' +
			'</div>' + 
			'<div style="float:right; width:40%;"><img src="' + location.img + '"></div>' + 	
			'</div>';
		return html;
	},

	// credit - http://jsfiddle.net/t9wcC/
	point: function(name, lat, long) {
	    this.name = ko.observable(name);
	    this.lat = ko.observable(lat);
	    this.long = ko.observable(long);
	    var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, long),
	        title: name,
	        map: view.map
	    });

		google.maps.event.addListener(marker, 'click', function(){
        	var pos = marker.getPosition();
        	this.lat(pos.lat());
        	this.long(pos.lng());
        	this.name('asd');
    	}.bind(this));

	},	

	//getPoints: function(){

	//}
}