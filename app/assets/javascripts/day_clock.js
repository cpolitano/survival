$(document).ready(function(){

	var time = 0;
	var clock = window.setInterval(function(){
		time++; 
		$("#clock").html("<h3> Days: <span>" + time + "</span></h3>")
	}, 250 );

	var killClock = window.setTimeout(function(){
		window.clearInterval(clock);
	}, 25001);
    
    var zombie = 0;
    var clock2 = window.setInterval(function(){
        if (zombie < 1000){
            zombie++
        } else if (zombie < 1000000) {
            zombie += 11234;
        } else {
            zombie += 123456;
        }           
        $("#zombies").html("<h3>Zombie Count: <span>" + zombie + "</span>, </h3>")
    }, 5 );
    
    var killZombie = window.setTimeout(function(){
        window.clearInterval(clock2);
    }, 25001);

})