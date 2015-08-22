point = function(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: view.map
    });

    google.maps.event.addListener(marker, 'click', function() {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));
};

var viewModel = {
	self: this,

    points: ko.observableArray([]),

    addPoints: function(){
		for(i=0; i < model.mapLocations.locations.length; i++){
			location = model.mapLocations.locations[i];
			p = new point(
	    			location.name,
	    			location.lat,
	    			location.lng
	    		)
			self.points.push(p);
		}
 	},
      
    displayPoint: function(point) {
        return points[point];
    },

    setSelected: function(point){
    	console.log(point);
    }
};