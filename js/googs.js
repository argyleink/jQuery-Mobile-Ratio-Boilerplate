var app = {};

$(function() {

	var map,
		infowindow,
		pyrmont,
		service,
		request;

	app.initialize = function() {
	    app.pyrmont 	= new google.maps.LatLng(47.599732, -122.333150);

	    app.map 		= new google.maps.Map(
	    	document.getElementById('map'), {
		        mapTypeId: 		google.maps.MapTypeId.ROADMAP,
		        center: 		app.pyrmont,
		        zoom: 			15
	    });

	    app.request = {
	        location: 	app.pyrmont,
	        radius: 	500,
	        types: 		['store']
	    };

	    app.infowindow 	= new google.maps.InfoWindow();
	    app.service 	= new google.maps.places.PlacesService(map);

	    app.service.search(app.request, app.results);
	}

	app.results = function(results, status) {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
	        for (var i = 0; i < results.length; i++) {
	            app.createMarker(results[i]);
	        }
	    }
	}

	app.initialize();

	app.createMarker = function(place) {
	    var placeLoc 	= place.geometry.location;

	    var marker 		= new google.maps.Marker({
	        map: 			document.getElementById('map'),
	        position: 		place.geometry.location
	    });

	    google.maps.event.addListener(marker, 'click', function () {
	        infowindow.setContent(place.name);
	        infowindow.open(app.map, this);
	    });
	}
	
});