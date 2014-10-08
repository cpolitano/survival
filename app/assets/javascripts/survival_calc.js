var apiKey = "hequvx2dwyfntbhae7b769hr";
var googlePlacesKey = "AIzaSyDae3V_0lLmnd2awsbZFT55GMt7fgAaOBI";
var map;
var infowindow;
var count;
var query;
var population;
var returnObj = {};
var stores = 0;
var runCount = 0;
var survivalRating = 0;

$("#search").on('submit', function(event){
	event.preventDefault();
	city = $("#city").val();
	state = $("select option:selected").val();
	findCity(city, state);
	$("form").hide();
	$(".search-hidden").show();
});

function findCity(city, state){
	$.ajax({
		url: "http://api.usatoday.com/open/census/loc?keypat=" + city + "&keyname=placename&sumlevid=4,6&api_key=" + apiKey,
		method: "GET",
		dataType: "jsonp",
		success: function(data){
			if (data.response.length > 0){
				for (var i = 0; i < data.response.length; i ++){
					if (data.response[i].StatePostal === state){
						population = parseInt(data.response[i].Pop);
						initialize(data.response[i].Lat, data.response[i].Long, "guns");
						initialize(data.response[i].Lat, data.response[i].Long, "grocery");
					}
				}
			} else {
				$("#results").append("They didn't make it...");
			}
		}
	});
}

function initialize(lat,lng, search) {
  var currentLocation = new google.maps.LatLng(lat, lng);

  map = document.getElementById('asdf')

  var request = {
    location: currentLocation,
    radius: "16093.4",
    types: ["store"],
    keyword: search
  };
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    returnObj["value"] = results.length;
    stores += results.length;
    runCount++;
    if (runCount === 2){
    	$("#results").append("<p>Population: " + population + "</p>");
    	$("#results").append("<p>Useful Stores Nearby: " + stores + "</p>");
    	var score = algorithm(population, stores);
    	$("#results").append("<p>Chance Of Survival: " + score + "%</p>");
    }
  } else {
  	runCount++;
  	if (runCount === 2){
  		$("#results").append("They didn't make it...");
  	}
  }
}

function algorithm(population, stores){
	if ( population > 1000000 ) {
		survivalRating += 0 + (stores/6);
		console.log(survivalRating);
	}
	else if ( population > 250000 && population < 1000000 ) {
		survivalRating += 10 + (stores/5);
	}
	else if ( population > 50000 && population < 250000 ) {
		survivalRating += 15 + (stores/4);
	}
	else if ( population > 10000 && population < 50000 ) {
		survivalRating += 25 + (stores/2);
	}
	else if ( population < 10000 ) {
		survivalRating += 40 + (stores);
	}
	return survivalRating;
}
