var sloth
var slothAni, treeImg;

function preload() {
  treeImg = loadImage("Images/treebark.jpg")
  slothAni = loadAnimation("Images/Sloth/sloth-1.png", "Images/Sloth/sloth-2.png", "Images/Sloth/sloth-3.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  sloth = createSprite(displayWidth/2, displayHeight/1.1, 100, 50);
  sloth.addAnimation("climbing", slothAni);
}

function draw() {
  background(treeImg); 

  drawSprites();
}