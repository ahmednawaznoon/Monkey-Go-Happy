
var monkey , monkey_running;
var fruit ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var play = 1;
var end = 0;
var gameState = play;
var gameoverImage,gameover,restart,restartImage;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameoverImage = loadImage("gameover1.png");
  
}



function setup() {
  createCanvas(400,400);
  
  score = 0;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
  ground = createSprite(200,350,1000,20);
  ground.velocityX = -4;
  ground.setCollider("rectangle",0,0,800,29);
  
  monkey = createSprite(60,313)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1; 
  monkey.debug = false;
  monkey.setCollider("circle",0,4,220);
  
  gameover = createSprite(200,150);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.150;
  gameover.visible = false;
  
}


function draw() {
  background("lightgreen");
 // console.log(getFrameRate());
  
  if(gameState === play){
     if(ground.x < 0){
      ground.x = ground.width/4;
     } 
    
     monkey.play();
    
     gameover.visible = false;
     
    
     score = score + Math.round(getFrameRate()/60);
    
     if(keyDown("space") && monkey.y > 300){
      SpaceButton();
     }
     if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
       score = score + 50;
     }
     monkey.velocityY = monkey.velocityY+0.5;

     Fruit();
     Enemy();
  }
  else if(gameState === end){
     monkey.pause();
     monkey.setVelocity(0,0);
     
     gameover.visible = true;
     
    
     ground.velocityX = 0;

     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);

     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     
     if(mousePressedOver(gameover)){
       gameState = play;
       score = 0;
       
       obstacleGroup.destroyEach();
       foodGroup.destroyEach();
     }
    }
    if(monkey.isTouching(obstacleGroup)){
     gameState = end;
  }
  monkey.collide(ground);
  drawSprites();
 
  fill("yellow");
  textSize(20);
  text("SURVIVAL TIME: "+score,112,30);
}
function SpaceButton(){
    monkey.velocityY = -12;
}
function Enemy(){
  if(frameCount%300 === 0){
    obstacle = createSprite(700,322);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
    obstacle.debug = false;
    obstacle.setCollider("circle",-2,2,200)
  }
}
function Fruit(){
  if(frameCount%100 === 0){
   fruit = createSprite(500,Math.round(random(120,200)));
   fruit.addImage(bananaImage);
   fruit.scale = 0.08;
   fruit.velocityX = -5;
   fruit.lifetime = 100;
   foodGroup.add(fruit); 
 }
}

// by malik ahmed nawaz noon




