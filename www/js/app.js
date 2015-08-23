function init(){
	ko.applyBindings(viewModel);
	viewModel.addPoints();
}

// Set timeout for loading google maps. Credit - http://stackoverflow.com/questions/22923106/google-maps-js-v3-detect-load-failures
$(function(){
    var timeoutId;
    timeoutId = window.setTimeout(function() {
        $('body').html('Error loading google maps.')
    }, 2000);
    var url = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=init';
    $.getScript(url, function(){ window.clearTimeout(timeoutId) });
});