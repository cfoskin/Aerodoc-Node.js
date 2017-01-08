'use strict';

let circle;
let map;
let marker;

function initialize()
{
    const center = new google.maps.LatLng(52.254427, -7.185281);
    const initRadius = 2000;
    const mapOptions = {
            center      :center,
            zoom        :12,
            mapTypeId   :google.maps.MapTypeId.ROADMAP
    };
    const mapDiv = document.getElementById("map");
    mapDiv.style.width  = '100%';
    mapDiv.style.height = '400px';
    map = new google.maps.Map(mapDiv,mapOptions);

    circle = new google.maps.Circle({
        center:center,
        radius:initRadius,
        strokeColor:"#0000FF",
        strokeOpacity:0.4,
        strokeWeight:1,
        fillColor:"#0000FF",
        fillOpacity:0.4,
        draggable: true
        });
    //Enable to allow user to vary radius by dragging anchor point
    circle.setEditable(true);
    circle.setMap(map);
    //addMarker(map, center);
   // markerListener(marker);
    circleListener();
    //on initialization get publish default values
    circleData();
   // markerData(marker);
   // isMarkerInCircle();
};

function circleListener()
{
    google.maps.event.addListener(circle, 'center_changed', function() 
    {
        circleData();
        //isMarkerInCircle();
    }); 
    google.maps.event.addListener(circle, 'radius_changed', function() 
    {
        circleData();
       // isMarkerInCircle();
    }); 
}

// function markerListener()
// {
//   google.maps.event.addListener(marker, 'drag', function() {
//         markerData();
//         isMarkerInCircle();
//     });
// }

function circleData() {
  const center = circle.getCenter();
  const latcenter = center.lat().toString();
  const lngcenter = center.lng().toString();
  const radius = circle.getRadius().toString();
  $("#radius").val(radius);
  $("#latcenter").val(latcenter);
  $("#lngcenter").val(lngcenter);    
}

// function markerData()
// {
//     const latLng = marker.getPosition();
//     const latlong = latLng.lat().toString().substring(0,10) + ',' + latLng.lng().toString().substring(0,10);      
//     //publish lat long in geolocation control in html page
//     $("#geolocation").val(latlong);
// }

// function addMarker(map, center)
// {
//     // create a marker
//     marker = new google.maps.Marker({
//         map         : map,
//         position    : center,
//         title       : "Drag and drop on your property!",
//         draggable   : true
//     });
//     marker.setMap(map);
// };

// function isMarkerInCircle()
// { 
//     const ccenter = circle.getCenter();
//     const mcenter = marker.getPosition();
//     const distance = google.maps.geometry.spherical.computeDistanceBetween(ccenter, mcenter);
//     const is_in_circle = distance <= circle.getRadius();
//     if(is_in_circle) 
//     {
//         $("#markerpos").val("inside");
//     }
//     else 
//     {
//         $("#markerpos").val("outside");
//     }
// };

google.maps.event.addDomListener(window, 'load', initialize);