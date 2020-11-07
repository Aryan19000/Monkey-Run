var PLAY=1;
var END=0;
var gameState;
var monkey , monkey_running, monkey_standing, ground;
var bananaImage, obstacleImage;
var foodGroup, obstacleGroup;
var score, time;
localStorage["score"]=0;
localStorage["time"]=0;

function preload(){
  monkey_running = loadAnimation ("sprite_0.png",    
  "sprite_1.png", "sprite_2.png", "sprite_3.png",    
  "sprite_4.png", "sprite_5.png", "sprite_6.png", 
  "sprite_7.png","sprite_8.png");
  monkey_standing=loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
createCanvas(600, 300);
ground=createSprite(300, 287.5, 1200, 25);
monkey=createSprite(50, 250);
monkey.addAnimation("run", monkey_running);
monkey.addAnimation("stand", monkey_standing);
monkey.scale=0.1;
  
obstacleGroup=createGroup();
foodGroup=createGroup();
  
score=0;
time=0;

gameState=PLAY;
}


function draw() {
background("white");

monkey.collide(ground);
  
if(gameState===PLAY){
time=time+Math.round(getFrameRate()/60);

if(localStorage["time"]<time){
  localStorage["time"]=time;
} 
  
monkey.changeAnimation("run", monkey_running);
  
if(keyDown("space")&&monkey.y>=240){
  monkey.velocityY=-12.5;
}
monkey.velocityY=monkey.velocityY+0.5;
  
spawnObstacles();
spawnBanana();
  
if(monkey.isTouching(foodGroup)){
  foodGroup.destroyEach();
  score=score+1;
  if(localStorage["score"]<score){
  localStorage["score"]=score;
}
}
if(monkey.isTouching(obstacleGroup)){
  gameState=END;
}
}
  
drawSprites(); 
  
if(gameState===END){
  monkey.changeAnimation("stand", monkey_standing);
  monkey.velocityY=0;
  foodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  fill("black");
  stroke("red");
  strokeWeight(5);
  textSize(30);
  text("Highest score: "+localStorage["score"], 150, 200);
  text("Highest time: "+localStorage["time"], 150, 150);
  text("press 'r' to restart", 150, 250);
  
  if(keyDown("r")){
    gameState=PLAY;
    foodGroup.setLifetimeEach(0);
    obstacleGroup.setLifetimeEach(0);
    time=0;
    score=0;
  }
}
  
fill("black");
stroke("red");
strokeWeight(5);
textSize(30);
text("Score: "+score, 400, 50);
text("Survival time: "+time, 25, 50);
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacles=createSprite(650, 260);
    obstacles.addImage(obstacleImage);
    obstacles.velocityX=-(5+time/100);
    obstacles.scale=0.2;
    obstacles.setCollider("rectangle", -25, 0, 200,       400);
    obstacles.lifetime=300;
    obstacleGroup.add(obstacles);
    
  }
}

function spawnBanana(){
  if(frameCount%80===0){
    var banana=createSprite(650, random(100, 200));
    banana.addImage(bananaImage);
    banana.velocityX=-(5+time/100);
    banana.scale=0.1;
    banana.setCollider("rectangle", 0, 0, 500, 250);
    banana.lifetime=300;
    foodGroup.add(banana);
  }
}