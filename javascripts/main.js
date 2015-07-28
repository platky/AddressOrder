var curLat=0;
var curLon=0;
var map;

function initialize(lon, lat) {
    console.log("initalizing map");
    var mapOptions = {
        center: { lat: lat, lng: lon},
        zoom: 14,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false

    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    var marker = new google.maps.Marker({
        position: {lat: lat, lng: lon},
        map: map,
        title: 'Current Location',
        label: '0'
    })
}


//google.maps.event.addDomListener(window, 'load', initialize);

window.addEventListener('load', function() {
    console.log("window loaded");
    getLocation();

    var search = document.getElementById("search");
    search.addEventListener('click', function () {
        console.log("search button clicked");
        var popupdiv = document.getElementById("popup");
        popupdiv.style.display="block";
    });
    var exitBut = document.getElementById("exitBut");
    exitBut.addEventListener('click', function() {
        var popupdiv = document.getElementById("popup");
        popupdiv.style.display="none";
    });
    var addPlace = document.getElementById("addPlace");
    addPlace.addEventListener('click', function() {

    });
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
    //alert("Testing position");
}

function showPosition(position){
    alert("Latitude is " + position.coords.latitude +"\nLongitude is "+ position.coords.longitude);
    console.log("Latitude is " + position.coords.latitude +" Longitude is "+ position.coords.longitude);
}

function popup(popupdiv) {

    var input1 = document.getElementById("place1");
    var options = {};
    var autocomplete =new google.maps.places.Autocomplete(input1, options);
    //refine it better so that it only gives options within current country/city etc.
}