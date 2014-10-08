var count = 0;

function Zombie(x,y){
	this.left = x;
	this.top = y;
	this.goalTop = 0;
	this.goalLeft = 0;
	this.rotation = 0;
}

Zombie.prototype = {

	findMouse: function(posX, posY){
		this.goalLeft = posX;
		this.goalTop = posY;
	},

	calculateRotation: function(){
		this.rotation = Math.atan(this.goalTop/this.goalLeft) * 180/Math.PI
	},

	animateZombie: function(){
		zombie = $("<div class='zombie'><embed src='assets/zombie_icon.svg'></div>")
		$("body").append(zombie)
		zombie.css({
			"transform": "rotate(" + (this.rotation + 90) + "deg)"
		});
		zombie.animate({
			"top": this.goalTop,
			"left": this.goalLeft
		}, 3000, function(){
			$(this).animate({"opacity": "0"}, 500, function(){
				$(this).remove();
			});
		});
	}
}

$("#building-div").on('mouseover', function(){
	window.addEventListener('mousemove', getMouseXY);
	function getMouseXY(e){
		if (count > 10){
			z = new Zombie(0,0);
		  z.findMouse(e.pageX, e.pageY);
		  z.calculateRotation();
		  z.animateZombie();
		  count = 0;
		} else {count++;}
	}
});