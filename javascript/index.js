var buttonColours = ["red", "blue", "yellow", "green"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var k = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern=[];
  $("h1").text("Level " + level);
  var ran = Math.random();
  ran = ran * 4;
  ran = Math.floor(ran);
  gamePattern.push(buttonColours[ran]);
  $("." + buttonColours[ran]).fadeOut(125).fadeIn(125);
  playSound(buttonColours[ran]);
  level++;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function check() {
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] === userClickedPattern[i]) {
      continue;
    } else {
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("h1").text("Game Over, press any key to restart.You have reached level "+(level-1) +".");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000);
      level=0;
      gamePattern=[];
      return false;
    }
  }
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }

  return true;
}

$(document).keypress(function() {
  userClickedPattern=[];
  nextSequence();
})


$(".btn").click(function() {
  var x = $(this);
  animatePress(x.attr("id"));
  playSound($(this).attr("id"));
  userClickedPattern.push($(this).attr("id"));
  check();
})
