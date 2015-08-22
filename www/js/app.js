function init(){
	// Start a timer for 10 seconds in case it doesn't work for some reason (eaasy to test in China - google's banned! :-))
	google.maps.event.addDomListener(window, 'load', view.init());
	ko.applyBindings(controller.getPoints());
};

init();