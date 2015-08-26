function viewModel() {
    var self = this;
    self.points = ko.observableArray([]);
    self.filter = ko.observable('');
    self.locationsLength = model.mapLocations.locations.length;

    // Create a point of interest
    self.point = function(name, lat, long, content, img, webUrl, web, wiki) {

        // Set properties of the object
        var that = this; //context-ception

        // Model data
        that.name = ko.observable(name);
        that.lat = ko.observable(lat);
        that.long = ko.observable(long);
        that.content = ko.observable(content);
        that.img = ko.observable(img);
        that.webUrl = ko.observable(webUrl);
        that.web = ko.observable(web);
        that.wiki = ko.observable(wiki);

        that.selected = ko.observable(false);
        that.isVisible = ko.observable(false);
        that.wikiTitle = ko.observable('');
        that.wikiBody = ko.observable('');

        // Get wikipedia entry based on the object's wiki property
        that.wikiData = ko.computed(function() {
            if (that.wiki()) {
                $.ajax({
                    url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + that.wiki() + '&callback=wikiCallBack&format=json',
                    dataType: 'jsonp'
                })
                    .complete(function(data) {
                        that.wikiTitle = data.responseJSON[0];
                        that.wikiLink = data.responseJSON[3][0];
                        that.wikiBody = data.responseJSON[2][0];
                    })
                    .error(function() {
                        return 'Wikipedia entries could not be loaded';
                    });
            }
        });

        // Create the google map marker
        that.marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            title: name,
            map: view.map,
            animation: google.maps.Animation.DROP,

            infowindow: new google.maps.InfoWindow({
                content: this.content()
            }),

            // Unanimate all points, then animate this one
            toggleActive: function() {
                for (var i = 0; i < self.locationsLength; i++) {
                    points()[i].marker.setAnimation(null);
                    points()[i].marker.infowindow.close(view.map);
                }
                this.setAnimation(google.maps.Animation.BOUNCE);
                this.infowindow.open(view.map, that.marker);
            },
        });

        // Adding a click event which hides all points, then shows the currently selected one
        google.maps.event.addListener(this.marker, 'click', function() {
            self.setSelected(that);
        }.bind(self));

        // Hiding/showing functionality for search filter
        that.isVisible.subscribe(function(currentState) {
            if (currentState) {
                that.marker.setMap(view.map);
            } else {
                that.marker.setMap(null);
            }
        });

        that.isVisible(true);

    };

    // Adds points of interest to the right side
    self.addPoints = function() {
        for (var i = 0; i < self.locationsLength; i++) {
            var p = new self.point(
                model.mapLocations.locations[i].name,
                model.mapLocations.locations[i].lat,
                model.mapLocations.locations[i].lng,
                model.mapLocations.locations[i].contentString,
                model.mapLocations.locations[i].img,
                model.mapLocations.locations[i].webUrl,
                model.mapLocations.locations[i].web,
                model.mapLocations.locations[i].wiki
            );
            self.points.push(p);
        }
    };

    // Hides all points on the left
    self.hidePoints = function() {
        for (var i = 0; i < self.locationsLength; i++) {
            self.points()[i].selected(false);
        }
    };

    // Hides all POI on right, then shows the selected one
    self.setSelected = function(point) {
        // This allows both the KO observable (menu on right) and the maps pointer to use the same function
        if (typeof point === undefined) {
            point = this;
        }
        point.marker.toggleActive();
        var isSelected = false;
        if (point.selected()) {
            isSelected = true;
        }

        self.hidePoints();

        if (isSelected) {
            point.selected(false);
        } else {
            point.selected(true);
        }
    };

    // Filter through points on the right/bottom. Credit http://jsfiddle.net/rniemeyer/vdcUA/
    self.filteredPoints = ko.computed(function() {
        var filter = self.filter().toLowerCase();
        if (!filter) {
            return this.points();
        } else {
            return ko.utils.arrayFilter(self.points(), function(point) {
                return ko.utils.stringStartsWith(point.name().toLowerCase(), filter);
            });
        }
    });

    // Filters through the points on the map. Credit http://stackoverflow.com/questions/29557938/removing-map-pin-with-search
    self.filterMap = function() {
        var filter = self.filter().toLowerCase();
        return ko.utils.arrayFilter(self.points(), function(point) {
            var doesMatch = ko.utils.stringStartsWith(point.name().toLowerCase(), filter);
            point.isVisible(doesMatch);
            return doesMatch;
        });
    };

}