var curLat=0;
var curLon=0;


function initialize(lon, lat) {
    console.log("initalizing map");
    var mapOptions = {
        center: { lat: lat, lng: lon},
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}


//google.maps.event.addDomListener(window, 'load', initialize);

window.addEventListener('load', function() {
    console.log("window loaded");
    getLocation();
});

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(updatePosition);
    } else {
        alert("GPS location not working");
        console.log("alert working?");
    }
}

function updatePosition(position){
    curLat = position.coords.latitude;
    curLon = position.coords.longitude;
    initialize(curLon, curLat);
}

function showPosition(position){
    alert("Latitude is " + position.coords.latitude +"\nLongitude is "+ position.coords.longitude);
    console.log("Latitude is " + position.coords.latitude +" Longitude is "+ position.coords.longitude);
}