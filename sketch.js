var balloon ;
var hypBalloon, database;
var position ;
var backgroundImg,spriteImg ;

function preload()
{
  backgroundImg = loadImage("sprites/bg.png");
  spriteImg = loadImage("sprites/fugga.png");
 
}

function setup() {
  database = firebase.database();                     
  createCanvas(800,400);
  hypBalloon = createSprite(250,650,10,10);
  hypBalloon.addImage("sprites/fugga.png");
  var hypballoonposition = database.ref('balloon/position');
  hypballoonposition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImg); 
 
  if(position != undefined){

      if(keyDown(LEFT_ARROW)){
      writePosition(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
      writePosition(10,0);
  }
  else if(keyDown(UP_ARROW)){
      writePosition(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
      writePosition(0,+10);
  } 
  drawSprites();
}
}

function readPosition(data){
  position = data.val();
  hypBalloon.x = position.x;
  hypBalloon.y = position.y;
}
function writePosition(x,y){
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })

}
function showError(){
  console.log("error")
}