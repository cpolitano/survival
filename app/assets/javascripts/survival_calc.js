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
				}
			}
		}
	});
}