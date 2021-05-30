var score=0, gameState=0;
var button, restart, sloth, tree;
var branch1, branch2, branchGro;
var fruit, fruitGro;
//variables for images
var buttonImg, restartImg, slothAni, slothIdle, treeImg, branch1Img, branch2Img, appleImg, bananaImg, orangeImg;
//Variables for the background
var dayBg, nightBg, spaceBg;

function preload() {
  //Loads buttons
  buttonImg = loadImage("Images/play button.png")
  restartImg = loadImage("Images/reset button.png")

  //Loads sloth and tree
  slothAni = loadAnimation("Images/Sloth/sloth-1.png", "Images/Sloth/sloth-2.png", "Images/Sloth/sloth-3.png")
  slothIdle = loadImage("Images/Sloth/sloth-1.png")
  treeImg = loadImage("Images/treebark.jpg")

  //Loads branchs
  branch1Img = loadImage("Images/tree branch1.jpg")
  branch2Img = loadImage("Images/tree branch2.png")

  //loads fruits
  appleImg = loadImage("Images/apple.png")
  bananaImg = loadImage("Images/banana.png")
  orangeImg = loadImage("Images/orange.png")

  //loads backgrounds
  dayBg = loadImage("Images/day background.jpg");
  nightBg = loadImage("Images/night background.jpg")
  spaceBg = loadImage("Images/space background.jpg")
}

function setup() {
  //Makes Canvas
  createCanvas(displayWidth,displayHeight);
  //Makes Branch Group
  branchGro = new Group();
  fruitGro = new Group();
  //Makes Tree
  tree = createSprite(displayWidth/2, displayHeight/2, displayWidth/1.8, displayHeight);
  tree.addImage(treeImg)
  tree.scale = 2;
  tree.velocityY= 0;
  //Makes Sloth
  sloth = createSprite(displayWidth/2, displayHeight/1.5, 100, 50);
  sloth.addAnimation("idle", slothIdle);
  sloth.addAnimation("climbing", slothAni);
  sloth.scale = 0.8;
  //Makes play button
  button = createSprite(displayWidth/2,displayHeight/2,50,50)
  button.addImage(buttonImg)
  button.scale = 0.2;
  
  //Makes reset button
  restart = createSprite(displayWidth/2,displayHeight/2-300,50,50);
  restart.addImage(restartImg)
  restart.visible = false;
}

function draw() {
  background(0);

  //Start
  if(gameState === 0) {
    sloth.changeAnimation("idle", slothIdle);

    button.visible = true;
    if(mousePressedOver(button) && gameState === 0) {
      gameState=1;
      button.visible = false;
    }
  }

  //Play
  if(gameState === 1) {
    tree.velocityY= 5;

    
    sloth.changeAnimation("climbing", slothAni);

    //Makes the tree reset to make it look like its moving
    if(tree.y > height){
      tree.y = height/2;
    }

    //Makes the sloth move with arrow key
    if(keyDown("right") && sloth.x < 1280){
      sloth.x += 6;
    }
      if(keyDown("left") && sloth.x > 252){
      sloth.x -= 6;
    }

    //
    if(sloth.isTouching(fruitGro)) {
      score += 5;
      fruitGro.destroyEach();
    }

    //Ends game if sloth touches branches
    if(sloth.isTouching(branchGro)) {
      gameState=3;
    }
    Branches();
    Fruits();
  }
  
  //End
  if(gameState === 3) {
    sloth.changeAnimation("idle", slothIdle);
    tree.velocityY = 0;
    branchGro.setVelocityYEach(0);
    fruitGro.setVelocityYEach(0);

    restart.visible = true;
    if(mousePressedOver(restart) && gameState===3) {
      restart.visible = false;
      branchGro.destroyEach();
      fruitGro.destroyEach();
      gameState=0;
      score = 0;
    }
  }

 drawSprites();

 fill('white')
  text(mouseX+","+mouseY,mouseX,mouseY);

  //Makes text for score
  textSize(30)
  text("Score: "+score, 50,50)
}

function Branches() {
  if(frameCount % 200 === 0) {
    
    var leftLocation = Math.round(random(252,717));

    var rightLocation = Math.round(random(750,1280));

    branch1 = createSprite(leftLocation,-30,20,20);
    branch1.addImage(branch1Img);
    branch1.scale = 0.15;
    branch1.velocityY = 4;
    branch1.lifeTime = 200;
    branchGro.add(branch1);

    branch2 = createSprite(rightLocation,-30,20,20);
    branch2.addImage(branch2Img);
    branch2.scale = 0.15;
    branch2.velocityY = 4;
    branch2.lifeTime = 200;
    branchGro.add(branch2);

    sloth.depth = branch1.depth;
    sloth.depth = branch2.depth;
    sloth.depth+= 1;
  }
} 

function Fruits() {
  if(frameCount % 230 === 0) {
    fruit = createSprite(Math.round(random(252,1280)),-30,20,20)
    fruit.velocityY = 4;
    //fruit.debug = true;

    var rand = Math.round(random(1,3))
    switch(rand) {
      case 1: fruit.addImage(appleImg);
      break;
      case 2: fruit.addImage(bananaImg);
      break;
      case 3: fruit.addImage(orangeImg);
      break;
    }

    fruitGro.add(fruit);
    fruit.depth = sloth.depth + 1;
    fruit.lifeTime = 200;
    
  }
}