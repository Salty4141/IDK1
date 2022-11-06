var table,tableImg;
var bkImg,bk;
var net;
var ball,ballImg;
var gamestate = 0;
var player,playerImg;
var npc,npcImg;
var gamestate = 0;
var line;
var edges;
var score = 0;
var a;
var b;

function preload(){
  bkImg = loadImage('assets/floor_pingpong.jpeg');
  tableImg = loadImage('assets/table.png');
  ballImg = loadImage('assets/pingpongBall.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  edges = createEdgeSprites();

  bk = createSprite(windowWidth/2,windowHeight/2);
  bk.addImage(bkImg);
  bk.scale = 5.0329;

  line = createSprite(windowWidth,windowHeight,100,10);

  table = createSprite(windowWidth/2,windowHeight/2);
  table.addImage(tableImg);
  table.scale = 2.3;
  table.setCollider("rectangle",0,2,428,240,0)

  net = createSprite(table.x,table.y+5,5,648);
  net.shapeColor = "white";

  player = createSprite(table.x-600,windowHeight/2);
  player.debug = true;
  player.setCollider("rectangle",0,0,120,120,0);
  

  ball = createSprite(table.x-480,player.y);
  ball.addImage(ballImg);
  ball.scale = 0.14;
  ball.setCollider("circle",0,40,85);

  npc = createSprite(table.x+550,windowHeight/2);
  npc.debug = true;
  npc.setCollider("rectangle",0,0,120,120,0);
  npc.depth = player.depth;
  npc.depth = ball.depth-1;
}

function draw() {
  background(255);

  player.collide(table);
  npc.collide(table);
  ball.collide(edges);
  keyPressed();

  ball.bounceOff(npc);
  player.collide(edges);
  npc.collide(edges);

  if(gamestate === 0)
  {
    if(ball.bounceOff(player))
    {
      ball.velocityX=20;
      if(player.y === table.y)
      {
        ball.velocityY=random(-8,8);
      }
      score+=1;
      gamestate = 1;
    }
    ball.y=player.y;
    npc.y=player.y;
  
  }
  if(gamestate === 1)
  {
    npc.friction = 0.9;
    npc.y=ball.y;
    if(ball.bounceOff(player) || ball.bounceOff(npc))
    {
      score+=1;
    }

  }

  drawSprites();

  textSize(20)
  text("score "+score,20,20);
}

function keyPressed()
{
  if(player.y>windowHeight)
  {
    player.y=windowHeight-1;
  }
  if(keyDown(DOWN_ARROW))
  {
    player.y+=15;
  }
  if(keyDown(UP_ARROW))
  {
    player.y-=15;
  }
  if(keyDown(RIGHT_ARROW))
  {
    player.x+=15;
  }
  if(keyDown(LEFT_ARROW))
  {
    player.x-=15;
  }
} 
