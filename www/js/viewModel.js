point = function(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);
    this.selected = ko.observable(false);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: view.map
    });

    google.maps.event.addListener(marker, 'click', function() {
    	viewModel.hidePoints();
    	this.selected(true);
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
			p = new point(
	    			model.mapLocations.locations[i].name,
	    			model.mapLocations.locations[i].lat,
	    			model.mapLocations.locations[i].lng
	    		)
			this.points.push(p);
		}
 	},
      
    displayPoint: function(point) {
        return points[point];
    },

    setSelected: function(point){
    	console.log(point);
    },

    hidePoints: function(){
    	for(i=0; i < this.points().length; i++){
			this.points()[i].selected(false);
		}    	
    }
};