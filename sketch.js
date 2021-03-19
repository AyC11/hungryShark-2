const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var backgroundImg, backgroundImg2;
var sharko, sharkImg;
var ground, fish1, fish2, fish3;
var stonesGroup, foodGroup;
var SERVE = 0
var PLAY = 1;
var END = 2;
var gameState = SERVE;
var stoneImg;
var gameOver,
	gameOverImg;
var play, hint;
var buttonImg
var exit, restart;
var score = 0;
function preload() {
	backgroundImg = loadImage("images/sea.png");
	sharkImg = loadImage("images/shark.png");
	stoneImg = loadImage("images/iceStone.png")
	fish1 = loadImage("images/food1.png")
	fish2 = loadImage("images/food2.png")
	fish3 = loadImage("images/food3.png")
	gameOverImg = loadImage("images/gameOver.png")
	backgroundImg2 = loadImage("images/form.png");
}

function setup() {
	createCanvas(870, 700)


	ground = createSprite(780, 200, 870, 10);
	ground.addImage("background", backgroundImg2);
	ground.velocityX = 0;
	ground.scale = 2.5;

	gameOver = createSprite(430, 350, 30, 30);
	gameOver.addImage(gameOverImg)

	engine = Engine.create();
	world = engine.world;

	play = createButton("Play")
	play.position(400, 400);
	play.mousePressed(startplay)
	play.size(100)
	play.style("font-size", '24px')
	play.style("background", color(57, 193, 226))

	restart = createButton("Restart")
	restart.position(500, 505);
	restart.mousePressed(startplay)
	restart.size(100)
	restart.style("font-size", '24px')
	restart.style("background", color(118, 183, 22))

	exit = createButton("Exit")
	exit.position(300, 505);
	exit.mousePressed(left)
	exit.size(100)
	exit.style("font-size", '24px')
	exit.style("background", color(118, 183, 22))


	stonesGroup = createGroup();
	foodGroup = createGroup();
	Engine.run(engine);

}

function draw() {
	rectMode(CENTER);
	background(255);
	if (gameState === SERVE) {
		ground.addImage(backgroundImg2)
		gameOver.visible = false;
		play.show()
		exit.hide()
		restart.hide();
	}
	if (gameState === PLAY) {

		exit.hide()
		restart.hide();
		play.hide()
		gameOver.visible = false;
		stones();
		food();
		//	score=0;
		if (ground.x < 100) {
			ground.velocityX = -2.5;
			ground.x = ground.width / 2;
		}
		for (var i = 0; i < foodGroup.length; i++) {
			if (foodGroup.get(i).isTouching(sharko)) {
				foodGroup.get(i).destroy();
				score = score + 1;
			}
		}
		if (score != 0 && score % 10 == 0) {
			sharko.scale += 0.001
		}

		if (stonesGroup.isTouching(sharko)) {
			gameState = END
		}
	}
	if (gameState === END) {

		//	play.visible=false
		gameOver.visible = true;
		stonesGroup.setVelocityXEach(0)
		foodGroup.setVelocityXEach(0)

		sharko.velocityX = 0;
		ground.velocityX = 0;
		foodGroup.destroyEach()
		stonesGroup.destroyEach()
		sharko.destroy();


	}

	drawSprites();
	if (gameState == END) {
		gameOver.visible = true

		exit.show()
		restart.show();

		sharko.scale = 0.25;
		sharko.x = 150;
		sharko.y = 245;
	}
	if (gameState === SERVE) {

		textSize(60)
		fill("black")
		text("Hungry Shark Game", 50, 60)
		stonesGroup.setVelocityXEach(0)
		foodGroup.setVelocityXEach(0)

		textSize(25)
		fill("black")
		text("how to play", 150, 150)
		text("1) press 'UP ARROW' to move up", 150, 200)
		text("2) press 'DOWN ARROW' to move down", 150, 230)
		text("3) press 'RIGHT ARROW' to move right", 150, 260)
		text("4) press 'LEFT ARROW' to move left", 150, 290)
		text("5) eat the fish to increase the score", 150, 320)
		text("6) be careful from the stone it will kill sharko", 150, 350)
	} else {
		fill("white")
		textSize(30)
		text("Score :0" + score, 250, 30)
		play.hide()
	}

}
function keyPressed() {
	if (keyCode == 38) {
		sharko.y -= 7

	}
	if (keyCode == 40) {
		sharko.y += 7;

	}
	if (keyCode == 39) {
		sharko.y -= 7
		sharko.x += 7
	}
	if (keyCode == 37) {

		sharko.x -= 7
	}
}
function stones() {
	if (frameCount % 100 == 0) {
		var stone = createSprite(600, 600, 30, 15)
		stone.y = Math.round(random(110, 650))
		stone.addImage(stoneImg);
		stone.velocityX = -3;
		stone.scale = 0.2;

		stonesGroup.add(stone)
	}
}
function startplay() {
	gameState = PLAY
	ground.addImage("background", backgroundImg);
	ground.velocityX = - 2.5;
	sharko = createSprite(150, 245);
	sharko.addImage(sharkImg);
	sharko.scale = 0.25;
	score = 0;

}
function left() {
	gameState = SERVE;

	ground.addImage("background", backgroundImg2);
}
function food() {
	if (frameCount % 70 == 0) {
		var fish = createSprite(500, 600, 25, 17)
		fish.y = Math.round(random(95, 570))

		fish.velocityX = -3.2;
		var rand = Math.round(random(1, 3));
		switch (rand) {
			case 1: fish.addImage(fish1);
				fish.scale = 0.4;
				break;
			case 2: fish.addImage(fish2);
				fish.scale = 0.12;
				break;
			case 3: fish.addImage(fish3);
				fish.scale = 0.2;
				break;
		}
		foodGroup.add(fish)

	}
}
