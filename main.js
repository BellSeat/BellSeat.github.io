
let lat, att
let mylat = 0, myatt =0
let floatRegex = /[+-]?([0-9]*[.])?[0-9]+/;
let intRegex = /^-?[0-9]+$/;



function initialize()
{
  getLocation();
  lat = 47.266030;
  att = -120.433013;
  var myCenter = new google.maps.LatLng(47.266030,-120.433013);
  var mapProp = {
    center: myCenter,
    zoom:6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker = new google.maps.Marker({position: myCenter,});
  marker.addListener("click",()=>
  {
    getLocation();
    window.open("https://www.google.com/maps/dir/" + mylat + ","+myatt+"/" + lat + "," + att);
  });
  marker.setMap(map);

} 

function loadScript()
{
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC-3X0-5SLtcXzq3ZE5LK7bQrqLAEea0Lw&sensor=false&callback=initialize&sensor=true";
  document.body.appendChild(script);
  // var script = document.createElement("script");
  // script.src = "/socket.io/socket.io.js";
  // document.body.appendChild(script);
}
function showLocation(position)
{
  mylat = position.coords.latitude;
  myatt = position.coords.longitude;
}

function errorHandler(err) {
  if(err.code == 1) {
     alert("Error: Access is denied!");
  } else if( err.code == 2) {
     alert("Error: Position is unavailable!");
  }
}

function getLocation()
{
  if(navigator.geolocation)
  {
    var options = {timeout:3000};
    navigator.geolocation.getCurrentPosition(showLocation,errorHandler,options)

  }else
  {
    alert("Sorry, browser does not support geolocation");
  }
}


function reloadMap(gpsmessage)
{
var position = gpsmessage.split(',');
var item = document.getElementById('gpsmessage');
// item.append(gpsmessage[0]);
// item.append(gpsmessage[1]);

let result = (floatRegex.test(position[0]) && floatRegex.test(position[1]));
 if(result){
    lat1 = position[0];
    att1 = position[1];

    var myCenter = new google.maps.LatLng(lat1,att1);
    var mapProp = {
      center: myCenter,
      zoom:6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position: myCenter,});
    marker.addListener("click",()=>
    {
      getLocation();
      window.open("https://www.google.com/maps/dir/" + mylat + ","+myatt+"/" + lat + "," + att);
    });
    marker.setMap(map);
 }
 
}

// google.maps.event.addDomListener(window, 'load', initialize)
window.onload = loadScript;

// var socket = io();

// socket.on('chat message', function(msg)
// {
//   var item = document.getElementById('gpsmessage');
//   item.append(msg);
//   console.log("client message: "+msg);
// });
