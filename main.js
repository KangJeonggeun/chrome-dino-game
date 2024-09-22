var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dinoImg = new Image();
dinoImg.src = "dino.png";

var cactusImg = new Image();
cactusImg.src = "cactus.png";

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    ctx.drawImage(dinoImg, this.x, this.y, 100, 100);
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

// dino.draw();

class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.drawImage(cactusImg, this.x, this.y, 100, 100);
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var catus = new Cactus();
catus.draw();

var timer = 0;
var catusArray = [];
var jumpTimer = 0;
var anim;
function animation() {
  anim = requestAnimationFrame(animation);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (timer % 240 === 0) {
    var cactus = new Cactus();
    catusArray.push(cactus);
  }
  catusArray.forEach((c, i, o) => {
    if (c.x < 0) {
      o.splice(i, 1);
    }
    c.x--;
    isCollide(dino, c);
    c.draw();
  });
  if (onJump) {
    dino.y--;
    jumpTimer++;
  }
  if (!onJump && dino.y !== 200) {
    dino.y++;
  }
  if (jumpTimer > 100) {
    onJump = false;
    jumpTimer = 0;
  }
  dino.draw();
}
animation();

//collision detection

function isCollide(dino, cactus) {
  var xDiff = cactus.x - dino.x - dino.width;
  var yDiff = cactus.y - dino.y - dino.height;
  if (xDiff < 0 && yDiff < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(anim);
  }
}

var onJump = false;
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    onJump = true;
  }
});
