function viewModel(){

	var self = this;
    self.points = ko.observableArray([]);
    self.filter = ko.observable("");

    // Create a point of interest
	self.point = function(name, lat, long, content, img, webUrl, web) {
		
		// Set properties of the object
		var that = this;       //context-ception
	    this.name = ko.observable(name);
	    this.lat = ko.observable(lat);
	    this.long = ko.observable(long);
	    this.content = ko.observable(content);
	    this.img = ko.observable(img);
	    this.webUrl = ko.observable(webUrl);
	    this.web = ko.observable(web);
	    this.selected = ko.observable(false);

	    // Create the google map marker
	    this.marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, long),
	        title: name,
	        map: view.map
	    });

	    // Adding a click event which hides all points, then shows the currently selected one
	    google.maps.event.addListener(this.marker, 'click', function() {
	    	self.hidePoints();
	    	that.selected(true);
	    }.bind(self));
	};

	// Adds points of interest to the right side
    self.addPoints = function(){
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
			self.points.push(p);
		}
 	};

 	// Hides all points on the left
 	self.hidePoints = function(){
    	for(i=0; i < self.points().length; i++){
			self.points()[i].selected(false);
		}		
 	};

 	// Sets point of interest on the right
    self.setSelected = function(p){
 		self.hidePoints(); 
		self.p.selected(true);
    };

    // need a separate function for KO to use, so parameters don't need to be passed
    self.setSelectedKO = function(){
 		self.hidePoints(); 
		this.selected(true);
    };

	// Filter through points. Credit http://jsfiddle.net/rniemeyer/vdcUA/
    self.filteredPoints = ko.computed(function(){
    	var filter = self.filter().toLowerCase();
        if(!filter){
            return this.points(); 
        } else {
            return ko.utils.arrayFilter(self.points(), function(point) {
                return ko.utils.stringStartsWith(point.name().toLowerCase(), filter);
            });
        }
    });

};

