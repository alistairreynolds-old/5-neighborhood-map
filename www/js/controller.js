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
			'<div><div style="float:left">' + location.contentString + '<br />' + 
			'<a href="' + location.webUrl + '" target="_blank">' + location.web + '</a>' +
			'</div>' + 
			'<div style="float:right:"><img src="' + location.img + '" width="200px"/></div>' + 	
			'</div>';
		return html;
	}
}