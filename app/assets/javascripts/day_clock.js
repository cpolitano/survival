$(document).ready(function(){

	var time = 0;
	var clock = window.setInterval(function(){
		time++; 
		$("#clock").html("<h3> " + time + " days in</h3>")
	}, 250 );

	var killClock = window.setTimeout(function(){
		window.clearInterval(clock);
	}, 25001);

})