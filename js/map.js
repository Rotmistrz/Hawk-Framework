$(document).ready(function($) {

    function initialize(loc, container) {
    	var style = [
            {
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 0.8
                    },
                    {
                        "lightness": 6
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }/**,
            {
                "featureType": "landscape.natural",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ccc"
                    },
                    {
                        "gamma": 4.97
                    },
                    {
                        "lightness": -5
                    },
                    {
                        "saturation": 100
                    }
                ]
            }**/
        ];

        var location = new google.maps.LatLng(loc.x, loc.y);
        var styledMap = new google.maps.StyledMapType(style);
      
        var mapProp = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        };
      
        var map = new google.maps.Map(document.getElementById(container),mapProp);

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        var latlng;
        var zoom;

        var count = function() {
            if($(window).width() > 1000) {
                return { latlng: location, zoom: 15 };
            } else {
                return { latlng: location, zoom: 15 };
            }
        }

        var data;

        $(window).ready(function() {
            data = count();

            map.setCenter(data.latlng);
            map.setZoom(data.zoom); 
        });

        $(window).resize(function() {
            data = count();

            map.setCenter(data.latlng);
        });

        var image = { url: '/img/marker.png', size: new google.maps.Size(27, 51)}

        var marker = new google.maps.Marker({
            position: location,
            icon: image
        });

        marker.setMap(map);
    }

    function GoogleMap(container, centerLocation) {
        this.style = [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#ebeff3" //"#d7e5ea"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];

        /**[
            {
            **/
                /**"stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "gamma": 0.8
                    },
                    {
                        "lightness": 6
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }**//**,
            {
                "featureType": "landscape.natural",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#ccc"
                    },
                    {
                        "gamma": 4.97
                    },
                    {
                        "lightness": -5
                    },
                    {
                        "saturation": 100
                    }
                ]
            }**/
        /**];**/

        this.container = container;
        this.centerLocation = centerLocation;
        this.zoom = 7;
        this.markers = [];
        this.width;

        this.mapProperities = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        };

        this.markerImage = { url: '/img/marker.png', size: new google.maps.Size(34, 46) };

        this.countWidth = function() {
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.width = w;

            return w;
        }

        this.refresh = function() {
            var width = this.countWidth();
            var that = this;

            if(width < 500) {
                this.zoom = 5;
            } else if(width < 1400) {
                this.zoom = 6;
            } else {
                this.zoom = 7;
            }

            if(width < 800) {
                for(var i = 0; i < this.markers.length; i++) {
                    that.markers[i].infobox.hide();

                    google.maps.event.addListener(that.markers[i], 'click', function(i) {
                        for(var n = 0; n < that.markers.length; n++) {
                            if(n != this.id) that.markers[n].infobox.hide();
                        }

                        that.markers[this.id].infobox.show();

                        /**var info = document.getElementById("locationInfo");
                        
                        infobox.open(map, this);
                        $(info).fadeIn(300);

                        map.panTo(data.latlng);**/
                    });
                }
            } else {
                for(var i = 0; i < this.markers.length; i++) {
                    that.markers[i].infobox.show();
                }
            }

            this.centered = new google.maps.LatLng(this.centerLocation.x, this.centerLocation.y);
            this.map.setCenter(this.centered);
            this.map.setZoom(this.zoom);
        }

        this.setMarker = function(location, description) {
            var that = this;

            var googleLocation = new google.maps.LatLng(location.x, location.y);
            var i = this.markers.length;

            this.markers[i] = new google.maps.Marker({
                position: googleLocation,
                icon: that.markerImage
            });

            this.markers[i].setMap(this.map);
            this.markers[i].id = i;

            this.markers[i].infobox = new InfoBox({
                 content: "<div class=\"infobox\"><h1>" + description.title + "</h1><p>" + description.content + "</p></div>",
                 disableAutoPan: true,
                 pixelOffset: new google.maps.Size(25, -48),
                 zIndex: null,
                 boxStyle: {
                    //background: "#fff",
                    //border: "2px solid #c6715a",
                    margin: "0",
                    color: "#0c265d",
                    padding: "0",
                    width: 'auto'
                },
                closeBoxMargin: "5px",
                closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(1, 1)
            });
            

            this.markers[i].infobox.open(this.map, this.markers[i]);

            //this.map.panTo(googleLocation);
            //this.refresh();

            this.refresh();

            return this.markers[i];
        }

        this.run = function() {
            var that = this;

            this.map = new google.maps.Map(document.getElementById(this.container), this.mapProperities);
            this.styledMap = new google.maps.StyledMapType(this.style);
            this.map.mapTypes.set('map_style', this.styledMap);
            this.map.setMapTypeId('map_style'); 

            this.refresh();

            $(window).resize(function() {
                that.refresh();
            });
        }
    }

    google.maps.event.addDomListener(window, 'load', function() {
        var mainmap = new GoogleMap('googlemap-01', { x: 51.95397278, y: 19.13716152 });
        mainmap.run();
        mainmap.setMarker({ x: 51.90559154, y: 19.45027187 }, { title: 'Nasz oddział', content: 'Łódź' });
        mainmap.setMarker({ x: 51.39728239, y: 22.57038906 }, { title: 'Nasz oddział', content: 'Lublin' });
        mainmap.setMarker({ x: 54.34035183, y: 18.65925625 }, { title: 'Nasz oddział', content: 'Gdańsk' });
        mainmap.setMarker({ x: 52.54108027, y: 16.93440273 }, { title: 'Nasz oddział', content: 'Poznań' });
        mainmap.setMarker({ x: 53.2830786, y: 23.17463711 }, { title: 'Nasz oddział', content: 'Białystok' });
        mainmap.setMarker({ x: 50.29965236, y: 19.10420254 }, { title: 'Nasz oddział', content: 'Sosnowiec' });
        mainmap.setMarker({ x: 53.55071819, y: 14.55036953 }, { title: 'Nasz oddział', content: 'Szczecin' });
        mainmap.setMarker({ x: 51.22946195, y: 17.03877285 }, { title: 'Nasz oddział', content: 'Wrocław' });
    } );
});

