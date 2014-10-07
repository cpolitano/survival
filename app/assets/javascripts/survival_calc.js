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
})

function findCity(city, state){
	$.ajax({
		url: "http://api.usatoday.com/open/census/loc?keypat=" + city + "&keyname=placename&sumlevid=4,6&api_key=" + apiKey,
		method: "GET",
		dataType: "jsonp",
		success: function(data){
			for (var i = 0; i < data.response.length; i ++){
				if (data.response[i].StatePostal === state){
					population = parseInt(data.response[i].Pop);
					initialize(data.response[i].Lat, data.response[i].Long, "guns");
					initialize(data.response[i].Lat, data.response[i].Long, "grocery");
				}
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
    // $("#results").append("<li data='" + results.length + "'>" + query + " Stores Nearby: " + results.length + "</li>");
    returnObj["value"] = results.length;
    stores += results.length;
    runCount++;
    if (runCount === 2){
    	$("#results").append("<li>Population: " + population + "</li>")
    	$("#results").append("<li>Useful Stores Nearby: " + stores + "</li>");
    	var score = algorithm(population, stores)
    	$("#results").append("<li>Chance Of Survival: " + score + "%</li>");
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
