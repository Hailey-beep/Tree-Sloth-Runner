var score=0;
var sloth, tree;
var branch1, branch2, branchGro;
var slothAni, treeImg, branch1Img, branch2Img;
//Variables for the background
var dayBg, nightBg, spaceBg;

function preload() {
  slothAni = loadAnimation("Images/Sloth/sloth-1.png", "Images/Sloth/sloth-2.png", "Images/Sloth/sloth-3.png")
  slothIdle = loadImage("Images/Sloth/sloth-1.png")
  treeImg = loadImage("Images/treebark.jpg")

  //Loads branchs
  branch1Img = loadImage("Images/tree branch1.jpg")
  branch2Img = loadImage("Images/tree branch2.png")

  //loads backgrounds
  dayBg = loadImage("Images/day background.jpg");
  nightBg = loadImage("Images/night background.jpg")
  spaceBg = loadImage("Images/space background.jpg")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  tree = createSprite(displayWidth/2, displayHeight/2, displayWidth/1.8, displayHeight);
  tree.addImage(treeImg)
  tree.scale = 2;
  tree.velocityY= 5;
  sloth = createSprite(displayWidth/2, displayHeight/1.1, 100, 50);
  sloth.addAnimation("climbing", slothAni);

 branchGro = new Group();
}

function draw() {
  background(0);

  if(tree.y > height){
    tree.y = height/2;
  }

  Branches();


  if(keyDown("right")){
    sloth.x += 6;
  }
    if(keyDown("left")){
    sloth.x -= 6;
  }
  
 drawSprites();
 fill('white')
  text(mouseX+","+mouseY,mouseX,mouseY);
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
    branch2.velocityY = 8;
    branch2.lifeTime = 200;
    branchGro.add(branch2);

    sloth.depth = branch1.depth;
    sloth.depth = branch2.depth;
    sloth.depth+= 1;
  }
} 

function Fruits() {

}