
$(function(){
    $(".element").typed({
      strings: ["BREAKING NEWS:::^1500 Zombies have attacked New York City and are spreading across the USA!"],
      typeSpeed: 3, // typing speed
      backSpeed: 0, // backspacing speed
      startDelay: 2, // time before typing starts
      backDelay: 500, // pause before backspacing
      loop: false, // loop on or off (true or false)
      loopCount: false, // number of loops, false = infinite
      showCursor: false,
      attr: null, // attribute to type, null = text for everything except inputs, which default to placeholder
      callback: function(){ 
        $(".element").animate({"opacity":"0"}, 2000, function(){
          $(".element").remove();
        });
      } // call function after typing is done
    });
});
