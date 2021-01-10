// Change Player1's Dice
var randomNumber1 = Math.floor((Math.random() * 6) + 1);
var image1 = "images/dice" + randomNumber1 + ".png";

document.getElementsByClassName("img1")[0].setAttribute("src", image1);

// Change Player2's Dice
var randomNumber2 = Math.floor((Math.random() * 6) + 1);
var image2 = "images/dice" + randomNumber2 + ".png";

document.getElementsByClassName("img2")[0].setAttribute("src", image2);

// Draw a winner
var player1 = "🎉Player 1 Wins!";
var player2 = "Player 2 Wins!🎉";
var draw = "Draw!";

if (randomNumber1 > randomNumber2) {
  document.querySelector(".container h1").innerText = player1;
} else if (randomNumber1 < randomNumber2) {
  document.querySelector(".container h1").innerText = player2;
} else {
  document.querySelector(".container h1").innerText = draw;
}
