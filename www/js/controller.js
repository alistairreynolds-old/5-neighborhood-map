var controller = {
  
	getKOLocaitions: function(){
    	var that = {};
	    that.Latitude=ko.observable();
    	that.Longitude=ko.observable();
    	return that;
	},

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
	}
}