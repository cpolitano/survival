var apiKey = "hequvx2dwyfntbhae7b769hr";
var googlePlacesKey = "AIzaSyDae3V_0lLmnd2awsbZFT55GMt7fgAaOBI";

$("#search").on('submit', function(event){
	event.preventDefault();
	city = $("#city").val();
	state = $("select option:selected").val();
	findCity(city, state);
})

function findCity(city, state){
	$.ajax({
		url: "http://api.usatoday.com/open/census/loc?keypat=" + city + "&keyname=placename&sumlevid=4,6&api_key=" + apiKey,
		method: "GET",
		dataType: "jsonp",
		success: function(data){
			for (var i = 0; i < data.response.length; i ++){
				if (data.response[i].StatePostal === state){
					$("body").append("Population: " + data.response[i].Pop + "<br>Latitude: " + data.response[i].Lat + ", Longitude: " + data.response[i].Long)
					console.log(initialize(data.response[i].Lat, data.response[i].Long, "guns"));
				}
			}
		}
	});
}

var map;
var infowindow;

function initialize(lat,lng, search) {
  var currentLocation = new google.maps.LatLng(lat, lng);

  map = document.getElementById('asdf')

  var request = {
    location: currentLocation,
    radius: "1",
    types: ["store"],
    query: search
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i ++){
    	console.log(results[i]);
    }
  }
}

// google.maps.event.addDomListener(window, 'load', initialize(0,0,"guns"));
