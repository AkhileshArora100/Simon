var buttonColors = ["green", "red", "yellow", "blue"];
var buttonKeys = ["Q", "E", "A", "D"]
var randomChosenColor;
var gamePattern = [];
var userColor = [];
var index = 0;
var levelCount = 1;
var keyDetect = 0;

document.addEventListener("keydown", start);
document.addEventListener("click", start);

function start() {
  console.log("Welcome to the developer tools console by Akhilesh");
  console.log("You can cheat here if you want! 😉");
  keyDetect++;
  if (keyDetect == 1) {
    if (screen.width > screen.height){
      document.getElementById('gamebox').scrollIntoView();
    }
    addSequence();
    runSequence();
    getSequence();
    document.removeEventListener("keydown", start);
    document.removeEventListener("click", start);
  }
}

function soundPress(color){
  let t = 100; let p = "pressed";
  if(color == "wrong"){
    t = 300;
    p = "game-over";
    if (screen.width > screen.height){
      document.getElementById('level-title').scrollIntoView();
    }
  }
  let audio = new Audio('sounds/' + color + '.mp3');
  audio.play();
  document.getElementById(color).classList.add(p);
  setTimeout(function() {
    document.getElementById(color).classList.remove(p);
  }, t);
}

function addSequence() {
  document.querySelector("h1").textContent = "Level " + levelCount;
  let randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  userColor = [];
  console.log("Color: " + gamePattern[levelCount-1] +" | Key: "+ buttonKeys[randomNumber]);
}

function runSequence() {
  let time = 800; let t = 800;
  if(levelCount > 4){
    t = 500;
  }
  else if(levelCount > 8){
    t = 300;
  }
  else if(levelCount > 12){
    t = 200;
  }
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      soundPress(gamePattern[i]);
    }, time);
    time = time + t;
  }
}

function getSequence() {
  for (var i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
      userColor.push(this.getAttribute("id"));
      checkSequence();
    });
  }
  document.addEventListener("keydown", function(e){
    var k = e.key
    if(k == 'a' || k == 'A'){
      userColor.push("yellow");
      checkSequence();
    }
    else if(k == 'q' || k == 'Q'){
      userColor.push("green");
      checkSequence();
    }
    else if(k == 'e' || k == 'E'){
      userColor.push("red");
      checkSequence();
    }
    else if(k == 'd' || k == 'D'){
      userColor.push("blue");
      checkSequence();
    }
  });
}

function reload(){
  document.removeEventListener("keydown", reload);
  document.removeEventListener("click", reload);
  location.reload();
}

function checkSequence() {
  index = userColor.length-1;
  soundPress(userColor[index]);
  if (gamePattern[index] != userColor[index]) {
    soundPress("wrong");
    document.querySelector("h1").textContent = "Game Over, Your Level - "+ levelCount +" Press A Key/Click Anywhere to Play Again";
    gamePattern = [];
    userColor = [];
    setTimeout(function(){
      document.addEventListener("keydown", reload);
      document.addEventListener("click", reload);
    }, 1000);
  } else if (index == gamePattern.length - 1) {
    levelCount++;
    addSequence();
    runSequence();
  }
}