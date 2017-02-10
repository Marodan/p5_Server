var socket;
var Tslider, Cslider;

function setup() {
  createCanvas(500,500);
  socket = io.connect(location.host);
  socket.on("mouse",newDrawing);
  Tslider = createSlider(5,20,5);
  Cslider = createSlider(0,255,random(255));
  Tslider.position(width+20,20);
  Cslider.position(width+20,50);
  
  colorMode(HSB);
}

function newDrawing(data){
	//background(255)
	drawing(data);
}

function draw() {
}

function mouseDragged(){
	var data = {
		x: mouseX,
		y: mouseY,
		hue: Cslider.value(),
		thickness: Tslider.value()
	}
	
	socket.emit("mouse",data);
	
	//background(255);
	drawing(data);
}

function drawing(data){
	console.log(data.color);
	strokeWeight(data.thickness);
	stroke(color(data.hue,255,255));
	point(data.x,data.y);
}