var value;
var img;
var fgColor;
var bgColor;
var slider;
var slider2;
var scaler=4;
var c1;
var c2;
var bright;

function setup() {
  img = createImage(600,600);
  var a = select('#submit');
  img.resize(img.width/3,img.height/3);
  createCanvas(img.width,img.height);
  img.resize(width/scaler,height/scaler);
  a.position(width+2,0);
  a.mouseClicked(handleFile);
  
  slider = createSlider(2,10,2);
  slider.position(width+2,20); 
  slider.changed(writeSize);

  slider2 = createSlider(70,500,0);
  slider2.position(width+2,slider.height+20); 
  slider2.changed(writeBright);
  bright = 255;

  fgColor = createColorPicker('black');
  bgColor = createColorPicker('white');
  setStroke();
  setBackground();

  processPixels();
}

function writeSize(){
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
  c1 = fgColor.color();
  fill(c1);
  stroke(c1);
  processPixels();
  
}

function setBackground(){
  c2 = bgColor.color();
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
  //img.resize(img.width/4,img.height/4);
  for (var i = 0; i < img.height;i++) {
      for (var j = 0; j < img.width;j++){
        var index = ((img.width-j)+(i*img.width))*4;
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

function handleFile() {
    img = loadImage("uploads/photos/" + "a.filename");
    processPixels;
}

