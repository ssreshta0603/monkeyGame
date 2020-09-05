//Global variables.
var ground,groundImage;
var monkey,monkey_running;
var pround;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacleImage;
var score=0;


function preload(){
  //loading the images.
  groundImage=loadImage("images/jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("images/Banana.png");
  
  obstacleImage = loadImage("images/stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  //creating ground and loading image.
  ground=createSprite(0,0,800,400);
  ground.addImage(groundImage);
  ground.scale=1.5;
  ground.x=ground.width/2;
  ground.velocityX=-4;
  
  //creating monkey and adding animation.
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.10;
 
  pround = createSprite(400,350,800,5);
  pround.visible=false;
  
  //creating FoodGroup & obstaclesGroup.
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  //giving the initial value to the score '0'.
  score = 0;
}

function draw() {
  // giving white background.
  background(255);
  
  //for scrolling ground.
  if(ground.x<100){
    ground.x=ground.width/2;
  }
  
  //if monkey touches the bananas, banana gets destroyed      and score increases by 2.
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
     score = score + 2;
   }
  
  // increasing the money's size according to increasing      of score. 
   switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
  //if space is pressed mokey will jump.
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
  //gravity for monkey.
    monkey.velocityY = monkey.velocityY + 0.8;
  
  //stops monkey from falling down.
    monkey.collide(pround);
  
  //calling the functions.
    spawnFood();
    spawnObstacles();
 
  //if mokey touches the stones monkey's size decreases to    0.08.
    if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
    }
  
  drawSprites();
  
  stroke("white");
  //sizing the text.
  textSize(20);
  //giving the colour to the text.
  fill("white");
  text("Score : "+ score, 500,50);
}

function spawnFood() {
  //creating the bananas after every 80 frames.   
  if (frameCount % 80 === 0) {
    var banana = createSprite(displayWidth/4,displayHeight/4,40,10);
    //giving the random y positions.
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //lifetime for bananas to stop memory leakage.
    banana.lifetime = 300;
    
    //adding bananas to foodgroup.
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //creating stones after every 300 frames.
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(displayWidth/2,displayHeight/2-50,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
     //adding stones  to foodgroup.
    obstaclesGroup.add(obstacle); 
  }
}


  
