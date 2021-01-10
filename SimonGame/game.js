var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

// WHen the keyboard has been pressed for the first time, start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Listern for click event
$(".btn").click(function() {
  // Find out the colour of the button cliked and store the pattern
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play the sound and animation
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the answer is correct
  checkAnswer(userClickedPattern.length-1);
});

// Randomly generated sequence of buttons to be clicked
function nextSequence() {
  // Level up and empty the userClickedPattern array
  userClickedPattern = [];
  levelUp();

  // Pick a random number [0, 3] and assign colour
  var randonNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randonNumber];
  gamePattern.push(randomChosenColour);

  // Flash the chosen colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play audio for the chosen colour
  playSound(randomChosenColour);
}

// Play sound for each coloured button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  // Add class .pressed for the chosen colour
  $("#" + currentColor).addClass("pressed");

  // Remove class .pressed from the chosen colour after 100ms
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function levelUp() {
  level++;
  $("#level-title").text("Level " + level);
}

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

      // Play the wrong sound
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      // Make the screen go red, and back to normal after 200ms
      $(document.body).addClass("game-over");
      setTimeout(function () {
        $(document.body).removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
