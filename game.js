let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];

function nextSequence() {
    userClickedPattern = []
    level+=1;
    $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // alert(randomNumber);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  // console.log("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

let started = false;
let level = 0;
$(document).keypress(function (event) {
  if (!started) {
    nextSequence();
    started = true;
    $("h1").text("Level " + level);
  }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        console.log("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        
        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}
// console.log(randomChosenColour);
