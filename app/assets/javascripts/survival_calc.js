var apiKey = "hequvx2dwyfntbhae7b769hr";
var googlePlacesKey = "AIzaSyDae3V_0lLmnd2awsbZFT55GMt7fgAaOBI";
var map;
var count;
var name;
var population = 0;
var stores = 0;
var score = 0;
var runCount = 0;
var survivalRating = 0;

$("#search").on('submit', function(event){
	event.preventDefault();
	city = $("#city").val();
	state = $("select option:selected").val();
	checkDB(city,state)
	$("form").hide();
	$("#clock").hide();
	$("#zombies").hide();
	$(".search-hidden").show();
});

$(".search-hidden").on('click', function(event){
	event.preventDefault();
	$(".search-hidden").hide();
	$("form").show();
	$("#clock").show();
	$("#zombies").show();
	$("#results").hide();
})

function checkDB(city, state){
	$.ajax({
		url: "/zombies",
		dataType: "json",
		method: "GET",
		success: function(data){
			var needAjax = true;
			for (var i = 0; i < data.length; i ++){
				if (data[i].name === city.toLowerCase() + ", " + state.toLowerCase()){
					needAjax = false;
					population = data[i].population;
					score = data[i].score;
					stores = data[i].stores;
				}
			}
			if (needAjax){
				findCity(city,state)
			} else {
				$("#results").append("<p>Your Chance Of Survival: " + score + "%</p>");
				$("#results").append("<p>Based on Population: " + population + "</p>");
    			$("#results").append("<p>+ Useful Stores Nearby: " + stores + "</p>");
			}
		}
	})
}

function findCity(city, state){
	$.ajax({
		url: "http://api.usatoday.com/open/census/loc?keypat=" + city + "&keyname=placename&sumlevid=4,6&api_key=" + apiKey,
		method: "GET",
		dataType: "jsonp",
		success: function(data){
			if (data.response.length > 0){
				for (var i = 0; i < data.response.length; i ++){
					if (data.response[i].StatePostal === state){
						name = city.toLowerCase() + ", " + state.toLowerCase();
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
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    stores += results.length;
    runCount++;
    if (runCount === 2){
    	$("#results").append("<p>Population: " + population + "</p>");
    	$("#results").append("<p>Useful Stores Nearby: " + stores + "</p>");
    	score = algorithm(population, stores);
    	$("#results").append("<p>Chance Of Survival: " + score + "%</p>");
    	$.ajax({
    		url: "/cities",
    		method: "POST",
    		dataType: "json",
    		data: {city: {population: population, stores: stores, name: name, score: score}},
    	})
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
	return survivalRating.toFixed(3);
}
