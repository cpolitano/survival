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
var url;
var htmlName;

$("#search").on('submit', function(event){
	event.preventDefault();
	city = $("#city").val();
	state = $("select option:selected").val();
	checkDB(city,state)
	$("form").hide();
	$("#clock").hide();
	$("#zombies").hide();
	$(".search-hidden").show();
	$("#results").show();
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
	console.log("in checkDB()")
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
          url = city.toLowerCase() + "&" + data[i].id
				}
			}
			if (needAjax){
				console.log("not in db")
				findCity(city,state)
			} else {
				console.log("in db")
				$("#results").html("<p>" + city + ", " + state + "</p>");
				$("#results").append("<p>Your Chance Of Survival: " + score + "%</p>");
				$("#results").append("<p>Based on Population: " + population + "</p>");
    			$("#results").append("<p>+ Useful Stores Nearby: " + stores + "</p>");
			}
		}
	})
}

function findCity(city, state){
	console.log("in findCity()")
	$.ajax({
		url: "http://api.usatoday.com/open/census/loc?keypat=" + city + "&keyname=placename&sumlevid=4,6&api_key=" + apiKey,
		method: "GET",
		dataType: "jsonp",
		success: function(data){
			htmlName = city + ", " + state;
			if (data.response.length > 0){
				console.log("usatoday returned data")
				for (var i = 0; i < data.response.length; i ++){
					if (data.response[i].StatePostal === state){
						name = city.toLowerCase() + ", " + state.toLowerCase();
						population = parseInt(data.response[i].Pop);
            url = city.toLowerCase() + "&";
						initialize(data.response[i].Lat, data.response[i].Long, "guns");
						initialize(data.response[i].Lat, data.response[i].Long, "grocery");
					}
				}
			} else {
				console.log("usatoday didn't return data")
				$("#results").html("<p>" + htmlName + " didn't make it...</p>");
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
  	console.log("google found a place")
    stores += results.length;
    runCount++;
    if (runCount === 2){
    	runCount = 0;
    	$("#results").html("<p>" + htmlName + "</p>");
    	$("#results").append("<p>Your Chance Of Survival: " + score + "%</p>");
    	$("#results").append("<p>Based on Population: " + population + "</p>");
    	score = algorithm(population, stores);
    	$("#results").append("<p>+ Useful Stores Nearby: " + stores + "</p>");
    	$.ajax({
    		url: "/cities",
    		method: "POST",
    		dataType: "json",
    		data: {city: {population: population, stores: stores, name: name, score: score}},
    		success: function(data){
    			url += "&" + data.id;
    		}
    	})
    	console.log("google stored the data")
    }
  } else {
  	console.log("google couldn't find the place")
  	runCount++;
  	if (runCount === 2){
  		$("#results").html("<p>" + htmlName + " didn't make it...</p>");
  	}
  }
}
