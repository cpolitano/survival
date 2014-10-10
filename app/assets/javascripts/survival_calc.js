var apiKey = "hequvx2dwyfntbhae7b769hr";
var googlePlacesKey = "AIzaSyDae3V_0lLmnd2awsbZFT55GMt7fgAaOBI";
var map;
var count;
var name;
var cityVar;
var stateVar;
var population = 0;
var stores = 0;
var score;
var runCount = 0;
var survivalRating = 0;
var url;
var htmlName;

$("#search").on('submit', function(event){
	event.preventDefault();
	score = 0;
	stores = 0;
	city = $("#city").val();
	state = $("select option:selected").val();
	if (city !== ""){
		checkDB(city,state)
	} else {
		$("#results").html("<h1>Your inability to follow directions is not promising...</h1>");
	}
	$("form").hide();
	$("#clock").hide();
	$("#zombies").hide();
	$(".search-hidden").show();
	$("#results").show();
	$("#Layer_1").css({"opacity": .3});
});

$(".search-hidden").on('click', function(event){
	event.preventDefault();
	$(".search-hidden").hide();
	$("form").show();
	$("#clock").show();
	$("#zombies").show();
	$("#results").hide();
	$("#Layer_1").css({"opacity": 1});
})

function checkDB(city, state){
	$.ajax({
		url: "/zombies",
		dataType: "json",
		method: "GET",
		success: function(data){
			var needAjax = true;
			for (var i = 0; i < data.length; i ++){
				if ( (data[i].city_name === city.toLowerCase()) && (data[i].state_name === state.toLowerCase())) {
					needAjax = false;
					population = data[i].population;
					score = data[i].score;
					stores = data[i].stores;
          url = city.toLowerCase() + "&" + data[i].id
				}
			}
			if (needAjax){
				findCity(city,state)
			} else {
				$("#results").html("<h1>" + city + ", " + state + "</h1>");
				$("#results").append("<div id='survival-chance'><h2>your chance of survival: <span>" + score + "%</span></h2></div>");
				$("#results").append("<div id='population'><h4>population: <span>" + population + " </span></h4></div>");
    			$("#results").append("<div id='useful-stores'><h4> useful stores: <span>" + stores + "</span></h4></div>");
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
			htmlName = city + ", " + state;
			if (data.response.length > 0){
				for (var i = 0; i < data.response.length; i ++){
					if (data.response[i].StatePostal === state){
						cityVar = city.toLowerCase();
						stateVar = state.toLowerCase();
						name = cityVar + ", " + stateVar;
						population = parseInt(data.response[i].Pop);
            url = city.toLowerCase() + "&";
						initialize(data.response[i].Lat, data.response[i].Long, "guns");
						initialize(data.response[i].Lat, data.response[i].Long, "grocery");
					}
				}
			} else {
				$("#results").html("<h1>" + htmlName + " didn't make it...</h1>");
			}
		},
		failure: function(data){
			$("#results").html("<h1>We have no reports on " + city + ", " + state + "</h1>");
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
    	runCount = 0;
    	score = algorithm(population, stores);
    	$("#results").html("<h1>" + htmlName + "</h1>");
    	$("#results").append("<div id='survival-chance'><h2>your chance of survival: <span>" + score + "%</span></h2></div>");
    	$("#results").append("<div id='population'><h4>population: <span>" + population + "</span></h4></div>");
    	$("#results").append("<div id='useful-stores'><h4> useful stores: <span>" + stores + "</span></h4></div>");

    	$.ajax({
    		url: "/cities",
    		method: "POST",
    		dataType: "json",
    		data: {city: {population: population, stores: stores, name: name, city_name: cityVar, state_name: stateVar, score: score}},
    		success: function(data){
    			url += "&" + data.id;
    		}
    	})
    }
  } else {
  	runCount++;
  	if (runCount === 2){
  		$("#results").html("<h1>" + htmlName + " didn't make it...</h1>");
  	}
  }
}

function algorithm(population, stores){
	survivalRating = 0;
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
