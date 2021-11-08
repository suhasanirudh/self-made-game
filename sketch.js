var astroid, astroidImg; 
var life,lifeImg; 
var restart, restartImg;
var rocket, rocketImg;
var space, spaceImg;  
var gameOver, gameOverImg; 
var astroidsGroup;
var GAMESTATE = "play" 
var score;
var totalLives = 3; 


function preload () {

  astroidImg = loadImage ('./IMAGES/asteroid.png');
  lifeImg  =  loadImage ('./IMAGES/life.png');
  //restartImg = loadImage ('./IMAGES/restart.png');
  rocketImg = loadImage ('./IMAGES/rocket2.png');
  spaceImg = loadImage ('./IMAGES/SPACE2.jpg');

}

function setup () {

  createCanvas (800,800);

  

  space = createSprite (400,400);
  space.addImage ("space", spaceImg);
  space.scale = 1.0
  space.velocityY = 1;

  

  //astroid = createSprite (200,200,50,50);
  //astroid.addImage("astroid",astroidImg);
  //astroid.scale = 1.0

  rocket = createSprite  (200,200,65,65);
  rocket.addImage  ("rocket", rocketImg); 
  rocket.scale = 0.4

  //life = createSprite (100,200,65,65);
  //life.addImage ("life",lifeImg); 
  //life.scale = 1.0
  

  astroidsGroup = new Group ();
  lifeGroup = new Group (); 




}

function draw () {

  //background (180);

    
  //text ("totalLives",500,70);
  text("Score: "+ score, 160,50);
  //textColor ("black");

  if (GAMESTATE === "play") {

    score = score + Math.round(getFrameRate()/100); 

    if (keyDown("w")) {
      rocket.y = rocket.y-10
    }

    if (keyDown("d")) {
      rocket.x = rocket.x +10
    }

    if (keyDown("a")) {
      rocket.x = rocket.x -10
    }

    if (keyDown("s")) {
      rocket.y = rocket.y+10
    }

    //rocket.velocityY = rocket.velocityY + 0.3;
  }

  if (space.y > 500) {
    space.y = 400;
  }


  if (astroidsGroup.isTouching(rocket) ) {
    totalLives -= 1;
  }

  if (lifeGroup.isTouching(rocket)) {
    totalLives +=1;
  }

  if (totalLives === 0) {
    GAMESTATE = "end"
    rocket.destroy ();
    astroidsGroup.destroyEach ();
    lifeGroup.destroyEach ();
  }




  rocket.setCollider ("rectangle",0,0,190,600);
  rocket.debug = true;
  
  
  spawnAstroids ();
  spawnLives (); 




  drawSprites ();

  if (GAMESTATE === "end") {
    background(0)
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text ("Game Over",200,300)
    astroidsGroup.destroyEach ();
  }
}

function spawnAstroids () {
  if (frameCount % 90 === 0) {
    astroid = createSprite (200,-50)
    astroid.addImage  (astroidImg); 
    astroid.scale = 0.1
    astroid.velocityY = 4;
    astroid.x = Math.round(random(120,400));
    astroidsGroup.add(astroid); 
  }
}

function spawnLives () {
  if (frameCount % 150 === 0) {
    life = createSprite (200,-50); 
    life.addImage (lifeImg);
    life.scale = 0.1
    life.velocityY = 7;
    life.x = Math.round(random(120,400));
    lifeGroup.add(life);
  }
}