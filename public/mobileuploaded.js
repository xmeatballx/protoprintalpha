var value;
var img;
var fgColor;
var bgColor;
var slider;
var slider2;
var scaler=3;
var c1;
var c2;
var bright;

function preload()  {
  img = loadImage("uploads/images/a.jpg")
}

function setup() {
rectMode(CENTER);
  img.resize(windowWidth,0);
  canvas = createCanvas(img.height,img.width);
  img.resize(width/scaler,height/scaler);

  var h = select('#h');

  canvas.position(windowWidth/2-width/2,h.y+20);
  
  slider = select("#slider");
  slider.changed(writeSize);

  slider2 = select('#slider2');
  slider2.changed(writeBright);
  bright = 255;

  fgColor = select('#fgcolor');
  bgColor = select("#bgcolor")

  //fgColor.position(canvas.x+width+2,canvas.y-20);
  //bgColor.position(canvas.x+width+2,canvas.y-20);

  setStroke();
  setBackground();

  processPixels();
}

function writeSize(){
  img.loadPixels();
  scaler = slider.value();
  img.resize(width/scaler,height/scaler); 
  setBackground();
  processPixels();
}

function writeBright(){
  bright = slider2.value();
  img.resize(width/scaler,height/scaler); 
  setBackground();
  processPixels();
}

function setStroke(){
  c1 = fgColor.value();
  fill(c1);
  stroke(c1);
  processPixels();
  
}

function setBackground(){
  c2 = bgColor.value();
  background(c2);
  processPixels();
}

function draw(){
  fgColor.input(setStroke);
  bgColor.input(setBackground);
}

function processPixels(){
  //background(255);
  img.loadPixels();
  //rotate(PI);
  //img.resize(img.width/4,img.height/4);
  for (var i = 0; i < img.height;i++) {
      for (var j = 0; j < img.width;j++){
        var index = ((img.width-i)+((img.height-j)*img.width))*4;
        //var index = (width-j+i*width)*8;
        var r = img.pixels[index];
        var b = img.pixels[index+1];
        var g = img.pixels[index+2];
        var br = (r+b+g)/3;
        var sz = map(br,bright,0,0,scaler);
        //strokeWeight(sz);
        noStroke();
        ellipse(j*scaler,i*scaler,sz,sz);
      }
    }
  //updatePixels();
}

// function handleFile() {
//     //img = loadImage("uploads/photos/" + "a.filename");
//     //processPixels();
// }

