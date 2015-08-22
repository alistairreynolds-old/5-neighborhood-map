function point(name, lat, long) {
    this.name = name;
    this.lat = ko.observable(lat);
    this.long = ko.observable(long);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map
    });

    //if you need the poition while dragging
    google.maps.event.addListener(marker, 'click', function() {
    	console.log(this);
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));

}

var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(51.7558162,  -2.2476957),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var viewModel = {
    points: ko.observableArray([
        new point('The King\'s Head', 51.7558162, -2.2476957),
        new point('Stroud Train Station', 51.7445949, -2.2193167)
     ]),
      
    displayPoint: function(point) {
        return points[point];
    },

    setSelected: function(point){
    	console.log(point);
    }
};

ko.applyBindings(viewModel);