var balls = []
var nB = 8;
var mx;
var my;
var win = false;
var tocchi = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 100)
  while(nB>0){
    var myBall = new Ball(random(0, width),random(0,height),random(15,45),random(15,20),random(0,1),random(0,1),random(0,1));
    balls.push(myBall);
    nB--;
  }
  frameRate = 30
  //myBalls = new Ball(20,20,20,10)
}

//CLICK
function mouseClicked() {
  tocchi++;
  var d = dist(mx,my,balls[0].x,balls[0].y)
  if ( d < 80) {win = true }
}

function draw() {
  mx = mouseX;
  my = mouseY;
// TOCCHI BETWEEN BALLS
  background(255,255,255,30);
  for(var i =1; i<balls.length; i++){
    if (balls[0].intersect(balls[i])) {
      background(255,0,0);}
    }
  for(var i =0; i<balls.length; i++){
    balls[i].move();
    balls[i].display();}

    //dov'è il mouse?
     // fill(10)
     // ellipse(mx,my,10)

//testo titolo e spiegazione
  if(frameCount<100)  {textSize(20);text('FIND & CLICK the BOMB!', 0, 25)}
  if(frameCount>100&&frameCount<900)  {
    text('HINT: ', 0, 25)
    textSize(20)
    text('the screen goes red when', 0, 52)
    text('the TRUE BOMB touches', 0, 84)
    text('the others FAKES BOMBS ', 0, 116)
  }
//tempo e tocchi
  var t = 6000-int(frameCount/30)
  text(t, width-100, height-25)
  text('tempo:', width-200, height-25)
  text(tocchi, width-100, 25)
  text('tocchi:', width-200, 25)
//WIN and LOSE
  if (win==true&&tocchi<=5){
      background(0,255,0)
      fill(255,255,255)
      textSize(80)
      text('YOU WIN', width-380, height-10)
    }

  if(frameCount>90000 || tocchi>5) {background(255,0,0)
  fill(255,255,255)
  textSize(80)
  text('YOU LOSE', width-440, height-10)}

}

//PALLE
function Ball(_x,_y,_raggio,_speed,_r,_g,_b){
  this.size = _raggio;
  this.x = _x;
  this.y = _y;
  this.colorr = _r;
  this.colorg= _g;
  this.colorb= _b;
  this.speed = _speed;
  this.obx = 1;
  this.oby = 1;

  this.intersect = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    return(d<this.size+other.size)
    }

this.move = function() {
  if(this.x>=width-this.size/2){this.obx=-noise(620+frameCount*3)}
  if(this.x<=0+this.size/2){this.obx=noise(840+frameCount*3)}
  this.x+=this.obx*this.speed;
  if(this.y>=height-this.size/2){this.oby=-noise(200+frameCount*3)}
  if(this.y<=0+this.size/2){this.oby=noise(400+frameCount*3)}
  this.y+=this.oby*this.speed;
  }
this.display = function() {
  noStroke();
  fill(this.colorr,this.colorg,this.colorb,100);
  ellipse(this.x,this.y,this.size*2)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
