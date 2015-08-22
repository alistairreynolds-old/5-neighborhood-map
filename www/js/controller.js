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

	point: function(name, lat, long) {
	    this.name = name;
	    this.lat = ko.observable(lat);
	    this.long = ko.observable(long);

	    var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, long),
	        title: name,
	        map: view.map,
	        draggable: true
	    });

	    //if you need the poition while dragging
	    google.maps.event.addListener(marker, 'drag', function() {
	        var pos = marker.getPosition();
	        this.lat(pos.lat());
	        this.long(pos.lng());
	    }.bind(this));

	    //if you just need to update it when the user is done dragging
	    google.maps.event.addListener(marker, 'dragend', function() {
	        var pos = marker.getPosition();
	        this.lat(pos.lat());
	        this.long(pos.lng());
	    }.bind(this));
	},	

	getPoints: function(){
		points: ko.observableArray([
	        new this.point('The King\'s Head', 51.7558162, -2.2476957),
	        new this.point('Test2', 56, 12),
	        new this.point('Test3', 57, 13)]
		)
	}
}