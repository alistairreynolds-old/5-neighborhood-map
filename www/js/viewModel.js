function viewModel(){

	var self = this;
    self.points = ko.observableArray([]);
    //self.currentFilter = ko.observable;
    self.filter = ko.observable("");

	self.point = function(name, lat, long, content, img, webUrl, web) {
		
		var that = this;       //context-ception
	    this.name = ko.observable(name);
	    this.lat = ko.observable(lat);
	    this.long = ko.observable(long);
	    this.content = ko.observable(content);
	    this.img = ko.observable(img);
	    this.webUrl = ko.observable(webUrl);
	    this.web = ko.observable(web);
	    this.selected = ko.observable(false);

	    this.marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, long),
	        title: name,
	        map: view.map
	    });

	    google.maps.event.addListener(this.marker, 'click', function() {
	    	self.hidePoints();
	    	that.selected(true);
	    }.bind(self));
	};

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

 	self.hidePoints = function(){
    	for(i=0; i < self.points().length; i++){
			self.points()[i].selected(false);
		}		
 	};

    self.setSelected = function(p){
 		self.hidePoints(); 
		self.p.selected(true);
    };

    self.setSelectedKO = function(){
 		self.hidePoints(); 
		this.selected(true);
    };

    self.setFilter = function(){
    	console.log(filterPoints());
    };

	/*self.filter = function() {
		var f = 'asd';
		console.log(f);
	    self.currentFilter(f);
	};*/



    self.filteredPoints = ko.computed(function(){
    	var filter = self.filter().toLowerCase();
        if(!filter){
            return this.points(); 
        } else {
            return ko.utils.arrayFilter(self.points(), function(point) {
            	//console.log(point.name());
                return ko.utils.stringStartsWith(point.name().toLowerCase(), filter);
            });
        }
    });

/*filteredPoints = ko.dependentObservable(function() {
    var filter = this.filter().toLowerCase();
    if (!filter) {
        return this.points();
    } else {
        return ko.utils.arrayFilter(this.points(), function(point) {
        	console.log(point());
            return ko.utils.stringStartsWith(p.name().toLowerCase(), filter);
        });
    }
}); */

};

