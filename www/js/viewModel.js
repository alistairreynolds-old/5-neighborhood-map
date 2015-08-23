var viewModel = {
	self: this,

	point: function(name, lat, long, content, img, webUrl, web) {
	    this.name = name;
	    this.lat = ko.observable(lat);
	    this.long = ko.observable(long);
	    this.content = ko.observable(content);
	    this.img = ko.observable(img);
	    this.webUrl = ko.observable(webUrl);
	    this.web = ko.observable(web);
	    this.selected = ko.observable(false);

	    var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, long),
	        title: name,
	        map: view.map
	    });

	    google.maps.event.addListener(marker, 'click', function() {
	    	viewModel.setSelected(this);
	    	this.selected(true);
	    }.bind(this));
	},

    points: ko.observableArray([]),

    addPoints: function(){
		for(i=0; i < model.mapLocations.locations.length; i++){
			p = new self.point(
	    			model.mapLocations.locations[i].name,
	    			model.mapLocations.locations[i].lat,
	    			model.mapLocations.locations[i].lng,
	    			model.mapLocations.locations[i].contentString,
	    			model.mapLocations.locations[i].img,
	    			model.mapLocations.locations[i].webUrl,
	    			model.mapLocations.locations[i].webvi
	    		)
			this.points.push(p);
		}
 	},

 	hidePoints: function(){
    	for(i=0; i < this.points().length; i++){
			this.points()[i].selected(false);
		}		
 	},

    setSelected: function(point){
 		viewModel.hidePoints();    // oddly, self and this don't work here when calling from data-bind click events
		point.selected(true);
    },
};