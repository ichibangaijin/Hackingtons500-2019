//create game variables

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext('2d');
var activeGame = false
var score = 0


var goodGuyImage = new Image()
goodGuyImage.src = "images/spaceship1.png"

var goodGuy = {
	width: 100,
	height: 80,
	x: 200,
	y: 200
}

var badGuyImage = new Image()
badGuyImage.src = "images/bomb.png"

var badGuy = {
	width: 100,
	height: 100,
	x: 400,
	y: 200

}


// MAIN GAME LOOP- startGame() will begin the loop
function gameLoop() {
	goodGuyUpdate()
	badGuyUpdate()
	drawScreen()
	drawScore()
}


// Starts the gameLoop and hides buttons & directions
function startGame() {
	activeGame = window.setInterval(gameLoop, 30)
}

//  Stops the game
function gameOver() {
	//capture the finalScore to use on the GameOver Screen
	localStorage.setItem("finalScore", score);
	//show the player "Game Over" text
	score = "Game Over"
	//stop the setInterval
	window.clearInterval(activeGame)
	//wait 1000 milliseconds then go to gameOver screen
	setTimeout(function(){window.location = "game-over.html"}, 1000)
}

function restartGame() {
	//remember to reset all variables here
	badGuy.x = Math.random() * 600
	score = 0
	startGame()
}

function goodGuyUpdate() {
	if (keyPressRight) {
		goodGuy.x += 10
	}
	if (keyPressLeft) {
		goodGuy.x -= 10
	}
	if (checkCollisions(goodGuy, badGuy)) {
		gameOver()
	}
}

function badGuyUpdate() {

}

function drawScore() {
	ctx.fillStyle="black"
	ctx.font = "20px Arial"
	ctx.fillText(score, 20, 20)
}


// Draw our game to the canvas
function drawScreen() {
	// clear screen first
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//draw goodGuy
	ctx.drawImage(goodGuyImage, goodGuy.x, goodGuy.y, goodGuy.width, goodGuy.height)
	//draw badGuy
	ctx.drawImage(badGuyImage, badGuy.x, badGuy.y, badGuy.width, badGuy.height, )
}

//Movement Key Controls	
//ArrowRight, ArrowLeft, ArrowUp, ArrowDown  
//Spacebar is " " blank space
								
var keyPressRight = false
var keyPressLeft = false

window.onkeydown = function (event) {
	if (event.key == "ArrowRight") {
		keyPressRight = true;
	}
	if (event.key == "ArrowLeft") {
		keyPressLeft = true;
	}
}

window.onkeyup = function (event) {
	if (event.key == "ArrowRight") {
		keyPressRight = false;
	}
	if (event.key == "ArrowLeft") {
		keyPressLeft = false;
	}
}


//WARNING DO NOT ALTER CHECKCOLLISIONS FUNCTION BELOW!!!
//use it by calling the function and changing the params
//for example--  if(checkCollisions(myBox1, myBox2)) {alert()} 

function checkCollisions(param1, param2) {
	if (param1.x < param2.x + param2.width &&
		param1.x + param1.width > param2.x &&
		param1.y < param2.y + param2.height &&
		param1.height + param1.y > param2.y) {
		return true;
	} else {
		return false
	}
}

//END of WARNING
