var character, obstacle, money;
var characterIMG, obstacleIMG, moneyIMG, restartIMG;
var restart, ground, ceiling, back, bg, backgroundIMG, score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  characterIMG = loadImage("female.png");
  obstacleIMG = loadImage("obstac.png");
  moneyIMG = loadImage("cash.png");
  backgroundIMG = loadImage("snow.jpg");
  restartIMG = loadImage("therestart.png")

}

function setup() {
  createCanvas(1200, 600);

  score = 0;

  bg = createSprite(600, 400);
  bg.addImage("bacgr", backgroundIMG);
  bg.scale = 2;
  bg.velocityX = -3;

  character = createSprite(50, 350);
  character.scale = 0.145;
  character.addImage("charac", characterIMG);

  ground = createSprite(600, 600, 1200, 40);
  ground.shapeColor = "black"
  ground.x = ground.width / 2;

  moneyGroup = new Group();

  restart = createSprite(300, 300, 100, 100);
  restart.addImage("res", restartIMG)


}

function draw() {

  background("yellow");

  if (gameState === PLAY) {

     restart.visible = false
     ground.velocityX = -(4 + 3 * score / 100)

    if (keyDown("space") && character.y >= 100) {
      character.velocityY = -12;
    }

     character.velocityY = character.velocityY + 0.5


    if (ground.x < 600) {
      ground.x = ground.width / 2;
    }
    
    if (bg.x < 0) {
      bg.x = bg.width / 2;
    }

     spawnMoney();
     spawnObstacles();
  }

  else if (gameState === END) {
    restart.visible = true
  }

  character.collide(ground);
  drawSprites();
}

function spawnMoney() {
  if (frameCount % 200 === 0) {
    money = createSprite(1250, 620, 40, 10);
    money.y = Math.round(random(300, 400));
    money.addImage(moneyIMG);
    money.scale = 0.4;
    money.velocityX = -3;
    money.lifetime = 1000;
    money.depth = character.depth;
    character.depth = character.depth + 1;
    if (money.isTouching(character)) {
      score = score + 200
      moneyGroup.add(money);
    }
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    obstacle = createSprite(1250, 550, 50, 50);
    obstacle.addImage('obstacle', obstacleIMG);
    obstacle.scale = 0.3;
    obstacle.velocityX = -5;
    obstacle.lifetime = 1000;
    if (obstacle.isTouching(character)) {
      score = score - 100
      gameState = END
    }
  }
}