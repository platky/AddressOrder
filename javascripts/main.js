var curLat=0;
var curLon=0;
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var labelList=[];
var waypnts = [];

function initialize(lon, lat) {
    console.log("initalizing map");
    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        center: { lat: lat, lng: lon},
        zoom: 14,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false

    };
    map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    /*var marker = new google.maps.Marker({
        position: {lat: lat, lng: lon},
        map: map,
        title: 'Current Location',
        label: 'A'
    });*/
    directionsDisplay.setMap(map);
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
        if(labelList.length==0){
            popup();
        }
    });
    var exitBut = document.getElementById("exitBut");
    exitBut.addEventListener('click', function() {
        var popupdiv = document.getElementById("popup");
        popupdiv.style.display="none";
    });
    var addPlace = document.getElementById("addPlace");
    addPlace.addEventListener('click', function() {
        var popupdiv = document.getElementById("popup");
        popup();
    });
    var goBut = document.getElementById("doneBut");
    goBut.addEventListener('click', function() {
        if(checkWayPoints()){
            mapDirections();
            var popupdiv = document.getElementById("popup");
            popupdiv.style.display="none";
        } else {
            var errorMes = document.getElementById("error");
            errorMes.innerText="You must fill all available boxes or remove unnecessary ones";
        }
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

function popup() {
    var popupdiv = document.getElementById("pop-inputs");
    var popdiv = document.createElement('div');
    var input = document.createElement('input');
    var cleana = document.createElement('a');
    var cleani = document.createElement('img');
    var dela = document.createElement('a');
    var deli = document.createElement('img');

    input.className="place";
    input.id="inputPlace";
    input.type="text";
    popdiv.appendChild(input);

    cleana.href="#";
    cleani.src="images/edit_clear.png";
    cleani.style.width="20px";
    cleani.style.height="20px";
    cleana.appendChild(cleani);
    popdiv.appendChild(cleana);
    cleana.addEventListener('click', function() {
        console.log("brush");
        var curDiv = cleana.parentNode;
        var children = curDiv.childNodes;
        children[0].value="";
    });


    dela.href="#";
    deli.src="images/delete.png";
    deli.style.width="20px";
    deli.style.height="20px";
    dela.appendChild(deli);
    popdiv.appendChild(dela);
    dela.addEventListener('click', function() {
        var curDiv = dela.parentNode;
        curDiv.parentNode.removeChild(curDiv);var addBut = document.getElementById("addPlace");
        for(var i=0; i<labelList.length; i++) {
            if(labelList[i]==curDiv){
                console.log("found in list at index "+i);
                labelList.splice(i,1);
                break;
            }
        }
        if(labelList.length ==5){
            addBut.style.display="none";
        } else {
            addBut.style.display="block";
        }
        console.log("REMOVE: the list is size "+labelList.length);
    });

    var options = {};
    var autocomplete =new google.maps.places.Autocomplete(input, options);
    //refine it better so that it only gives options within current country/city etc.

    labelList.push(popdiv);
    popupdiv.appendChild(popdiv);
    var addBut = document.getElementById("addPlace");
    console.log("the list is size "+labelList.length);
    if(labelList.length ==5){
        addBut.style.display="none";
    } else {
        addBut.style.display="block";
    }
}

function mapDirections() {

    var request = {
        origin: {lat: curLat, lng: curLon},
        destination: {lat: curLat, lng: curLon},
        waypoints: waypnts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

function checkWayPoints() {
    waypnts=[];
    for (var i=0; i<labelList.length; i++){
        var curDiv = labelList[i];
        var children = curDiv.childNodes;
        if(children[0].value==""){
            return false;
        } else {
            waypnts.push({location: children[0].value, stopover: true});
        }
    }
    return true;
}