var sword, swordimg, swords;
var PLAY = 1;
var END = 0;
var gamestate =1;
var Fruit;
var bomb,bombImage;
var f1,f2,f3,f4;
var score;
var gameover, gameOverSound;
function preload(){
  swordimg = loadImage ("sword.png");
 f1 = loadImage ("fruit1.png");
  f2 = loadImage ("fruit2.png");
  f3 = loadImage ("fruit3.png");
  f4 = loadImage ("fruit4.png");
  bombImage = loadImage ("alien1.png");
gameover = loadImage ("gameover.png");
  gameOverSound = loadSound ("gameover.mp3")
  swords = loadSound ("swords.mp3");
}

function setup(){
createCanvas(550,500); 
  sword = createSprite (200,200,10,10)
sword.addImage (swordimg);
  sword.scale = 0.8;
  fruitGroup = new Group();
  bombGroup = new Group();
  score = 0;
}

function draw(){
background ("lightblue");
  
  textSize(20);
  fill("black");
  text ("Score: "+score,10,75);
  
  textSize(20);
  fill("black");
  text("~ Cut the fruits and Don't touch the monsters or obstacles.", 20, 30);
  
  textSize(20);
  fill("black");
  text("~ After every +2 score the speed of the fruit will increases.", 20, 55);
  
  if(gamestate === PLAY){
     sword.y = World.mouseY;
  sword.x = World.mouseX;
  Fruit(); 
    bomb();
    sword.visible = true;
   
    if(bombGroup.isTouching(sword)){
      gameOverSound.play(); 
      gamestate = END;
       }
     } 
  

  if (fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    swords.play();
    score = score+2
  }
if (gamestate===END){
  sword.x = 200;
  sword.y = 200;
  sword.addImage (gameover);
  fruitGroup.velocityX = 0;
  bombGroup.velocityX = 0;
  fruitGroup.destroyEach();
  bombGroup.destroyEach();
  
}
    
  

drawSprites();
}
function Fruit(){
  
  if(World.frameCount%80===0){
    position = Math.round(random(1,2))
     fruit = createSprite (580,300,20,20);
    fruit.scale = 0.2;
    r=Math.round(random(1,4));
    if(r == 1){
       fruit.addImage (f1);
       } else if(r == 2){
       fruit.addImage (f2);
     }if(r == 3){
       fruit.addImage (f3);
       } else if(r == 4){
       fruit.addImage (f4);
     }
    if(position==1){
       fruit.x=590;
      fruit.velocityX =-(7+(score/4))
       }else if(position==2){
                fruit.x=0;
         fruit.velocityX = (7+(score/4))
                }
    
      
    fruit.y = Math.round(random(50,340));
 
    fruit.setLifetime = 100;
    fruitGroup.add(fruit);
}
}

function bomb(){
  if(World.frameCount%200===0){
  b = createSprite (580,300,20,20);
    b.addAnimation("moving", bombImage);
    b.y=Math.round(random(100,300))
    b.velocityX = -(8+(score/10));
    b.setLifetime = 50;
    b.scale = 0.9
    
    bombGroup.add(b);
  }
}

