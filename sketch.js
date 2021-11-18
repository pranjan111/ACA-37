//global variable declaration
var score= 0;
var bg, backgroundImg;
var gamestate ="PLAY";
//preload function is used to load all the game assets
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  Ironmanimages = loadImage("images/iron.png");
  platformImage = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  var diamondScore = 0;
  spikesImage = loadImage("images/spikes.png");
  restartImage = loadImage("images/restart.png");
}

function setup() {
  //declaation of canvas size 
  createCanvas(1000, 600);
  //create background sprite
  bg = createSprite(580,300);
 bg.addImage(backgroundImg);
 bg.scale =2;
 
 //create Ironman sprite
 Ironman = createSprite(100,500,40,40);
 Ironman.addImage(Ironmanimages);
 Ironman.scale = 0.3;
 //create ground sprite
 ground = createSprite(200,585,400,10);
 ground.visible = false;
 //create groups
 platformGroup = new Group();
 diamondGroup = new Group();
 spikesGroup = new Group();
 restart = createSprite(500,300);
 restart.addImage(restartImage);
 restart.visible = false;
}

function draw() {
  
  if (gamestate === "PLAY"){
    bg.velocityY = -10;
    Ironman.setCollider("rectangle",0,0,200,500);
  //scroll background
  if (bg.y<200){
    bg.y=bg.width/4;}
    //keyboard controls
  if (keyDown("up")) {
    Ironman.velocityY = -10;
  }
  if (keyDown("left")) {
    Ironman.x = Ironman.x - 5;
  }
  if (keyDown("right")) {
    Ironman.x = Ironman.x + 5;
  }
  Ironman.velocityY = Ironman.velocityY + 0.5;
  //colliding Ironman with ground
  Ironman.collide(ground);
  //call the function to generate stones
  generatePlatforms();
  for (var i = 0; i < platformGroup.length; i++){
    var temp = platformGroup.get(i);
    if (temp.isTouching(Ironman)) {
      Ironman.collide(temp);
    }

  }
  //call the function to generate diamonds
  generatediamonds();
  for (var i = 0; i< diamondGroup.length; i ++){
    var temp = diamondGroup.get(i);
    if (temp.isTouching(Ironman)) {
      //increase the score when the Ironman catches the diamonds
      score= score+1;
      temp.destroy();
    }
  }

  //call the function to generate spikes

 
    generatespikes();
    for (var i = 0; i< spikesGroup.length; i ++){
      var temp = spikesGroup.get(i);
      if (temp.isTouching(Ironman)) {
        //once Ironman touches the spikes decrease thw score by 5
        score= score-5;
        temp.destroy();
      }
    }
    if(score<=-10 || Ironman.y>610){
      gamestate = "END";
    }
  }
  else if (gamestate ==="END"){
    bg.velocityY=0;
    Ironman.velocityY=0;
    diamondGroup.setVelocityYEach(0);
    spikesGroup.setVelocityYEach(0);
    platformGroup.setVelocityYEach(0);
    diamondGroup.setLifetimeEach(-1);
    spikesGroup.setLifetimeEach(-1);
    platformGroup.setLifetimeEach(-1);
    restart.visible=true;
    if(mousePressedOver(restart)){
      restartGame();
    }
  }
    drawSprites();
    textSize(20);
    fill("brown");
    //display score
    text("Diamonds Collected: "+ score, 500,50);
}
    function generatespikes() {
      if (frameCount % 70 === 0) {
        var spikes = createSprite(1200,120,40,10);
        spikes.x = random(50,450);
        spikes.addImage(spikesImage);
        spikes.scale = 0.5;
        spikes.velocityY = 5;
        
        spikes.lifetime =250;
        spikesGroup.add(spikes);
      }
    }
   
    
   

function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.scale = 0.5;
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}
function generatediamonds () {
  if (frameCount % 40 === 0) {
    var diamond = createSprite(1000,20,30,10);
    diamond.x = random(50,500);
    diamond.scale = 0.5;
    diamond.addImage(diamondImage);
    diamond.velocityY = 5;
    diamond.lifetime =  250;
    diamondGroup.add(diamond);
  }
}
function restartGame(){
  gamestate = "PLAY";
  platformGroup.destroyEach();
  diamondGroup.destroyEach();
  spikesGroup.destroyEach();
  score=0;

  Ironman.y = 50;
  restart.visible=false;
}
