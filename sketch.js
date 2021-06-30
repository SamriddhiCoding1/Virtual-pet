var dog
var dogIMG,dogIMG1
var database
var foodS
var foodStock

function preload(){
  

dogIMG=loadImage("images/dogImg.png")
dogIMG1=loadImage("images/dogImg1.png")
	
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();

  dog=createSprite(250,300,150,150);
  dog.addImage(dogIMG)

  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
 

  dog.scale=0.15
}


function draw() {  
 background(46,139,87)
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogIMG1);
    dog.scale=0.15
  }
  drawSprites()
  fill (255,255,254)
  stroke ("black")
  text("food remaining: " +foodS,170,200)
  textSize(13)
  text("note press UP_ARROW KEY to feed the dog",130,10,300,20);
}
//function to read values from DB
function readStock(data){
  foodS=data.val();
}
//function to write values in DB
function writeStock(x){ 
  if(x<=0){
    x=0;
   }else{
     x=x-1;
  }
    
  database.ref('/').update({
    Food:x
})
}



