ko.applyBindings(viewModel);
viewModel.addPoints();
window.setTimeout(function() {
    if (typeof google != 'object' || typeof google.maps != 'object') {
    	$('body').html('Error loading google maps');
    }
}, 2000);
