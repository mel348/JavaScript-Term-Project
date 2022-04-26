var myGamePiece;
var myObstacles = [];
var myFun;
var gameOverSound;
var gameOverText;


function startGame() { 
  document.getElementById("start").style.visibility = "hidden";
    document.getElementById("playAgain").style.visibility = "hidden";
    myGamePiece = new component(60, 60, "./media/gary.png", 10, 120, "image");
    myFun = new sound("./media/funSong.mp3");
    gameOverSound = new sound("./media/laughing.mp3");
    gameOverText = new component("80px", "Verdana", "yellow", 300,300,"text");
   myFun.play();
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 650;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 5);                                    //interval to run the updateGameArea() function every 20th millisecond
        this.frameNo = 0;       
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){                                                                   //clears canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval);
  }
}
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "autoplay");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }
}
function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
function component(width, height, color, x, y, type) {
    this.type = type;
    if(type == "image") {
      this.image = new Image();
      this.image.src = color;
    }

    this.width = width;
    this.height = height;
    this.speedX = 0;                                                                        // x-axis speed indicator
    this.speedY = 0;                                                                        //y-axis speed indicator
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image"){
          ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height);
          }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.type == "text") {
          ctx.font = this.width + " " + this.height;
          ctx.fillStyle = color;
          ctx.fillRect(this.x, this.y, this.width, this.height);        
        }

    }
    this.newPos = function() {                                                            // this function uses the speedX and speedY properties to change the comoponent's position.
        this.x += this.speedX;                                                        
        this.y += this.speedY;   
    }
  
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
        crash = false;
      }
      return crash;
    }
}

function updateGameArea() {                                                               // calls the clear() and update() method
    var x, y;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myFun.stop();
      gameOverSound.play();
      myGameArea.stop();
      myGameArea.clear();
      document.getElementById("playAgain").style.visibility = "visible";
      return;
    }
  }
  myGameArea.clear();

  myGameArea.frameNo += 1;                                                            //this section includes options to update and change the obstacles colors, size, images, etc.
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    minHeight = 20;
    maxHeight = 280;
    height = Math.floor(Math.random()*(maxHeight - minHeight + 1) +minHeight);
        minGap = 150;
        maxGap = 300;
        gap = Math.floor(Math.random()*(maxGap - minGap +1) +minGap);
    x = myGameArea.canvas.width;
    y = myGameArea.canvas.height - 200;
    myObstacles.push(new component(10, height, "yellow", x, 0));
    myObstacles.push(new component(10, x - height - gap, "pink", x, height + gap));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  
    myGamePiece.speedX = 0;                                                             //this is how Gary is able to move with the arrow keys on the keypad
    myGamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
    myGamePiece.newPos();                                                                 // newPos function is called from the updateGameArea function before drawing the component,
    myGamePiece.update();
}
