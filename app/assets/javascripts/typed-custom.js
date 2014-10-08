
$(function(){
    $(".element").typed({
      strings: ["BREAKING NEWS:::^1000\n Zombies have attacked New York City and are spreading across the USA!\n Enter your city and state to determine your chance of survival \n and how long you have until the zomibes reach you! \n Prepare Yourself!"],
      typeSpeed: 0, // typing speed
      backSpeed: 0, // backspacing speed
      startDelay: 0, // time before typing starts
      backDelay: 500, // pause before backspacing
      loop: false, // loop on or off (true or false)
      loopCount: false, // number of loops, false = infinite
      showCursor: true,
      attr: null, // attribute to type, null = text for everything except inputs, which default to placeholder
      callback: function(){ } // call function after typing is done
    });
});
