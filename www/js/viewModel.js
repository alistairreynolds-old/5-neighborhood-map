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
	    this.isVisible = ko.observable(false);

	    // Create the google map marker
	    this.marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, long),
	        title: name,
	        map: view.map
	    });

	    // Adding a click event which hides all points, then shows the currently selected one
	    google.maps.event.addListener(this.marker, 'click', function() {
	 		var isSelected = false;
	 		if(that.selected()){
				isSelected = true;
			};

	 		self.hidePoints(); 

	 		if(isSelected){
				that.selected(false);
			}else{
				that.selected(true);
			};
	    }.bind(self));

	    // Hiding/showing functionality for search filter
		this.isVisible.subscribe(function(currentState) {
			if (currentState) {
				that.marker.setMap(view.map);
			} else {
				that.marker.setMap(null);
			}
		});

		this.isVisible(true);

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
    			model.mapLocations.locations[i].web
	    	);
			self.points.push(p);
		}
 	};

 	// Hides all points on the left
 	self.hidePoints = function(){
    	for(i=0; i < self.points().length; i++){
			self.points()[i].selected(false);
		}		
 	};

    // Hides all POI on right, then shows the selected one. Need a separate function for KO to use, so parameters don't need to be passed
    self.setSelectedKO = function(){
 		var isSelected = false;
 		if(this.selected()){
			isSelected = true;
		};

 		self.hidePoints(); 

 		if(isSelected){
			this.selected(false);
		}else{
			this.selected(true);
		};
    };

	// Filter through points on the right/bottom. Credit http://jsfiddle.net/rniemeyer/vdcUA/
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

    // Filters through the points on the map. Credit http://stackoverflow.com/questions/29557938/removing-map-pin-with-search
    self.filterMap = function(){
	    var filter  = self.filter().toLowerCase();
    	return ko.utils.arrayFilter(self.points(), function (point) {
        	var doesMatch = ko.utils.stringStartsWith(point.name().toLowerCase(), filter);
        	point.isVisible(doesMatch);
        	return doesMatch;
    	}); 
    };

};

