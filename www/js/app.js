function init(){
	// Start a timer for 10 seconds in case it doesn't work for some reason (eaasy to test in China - google's banned! :-))
	google.maps.event.addDomListener(window, 'load', view.init());
	var points =  ko.observableArray([
        new controller.point('The King\'s Head', 51.7558162, -2.2476957)]
	)	
	ko.applyBindings(points);
};

init();