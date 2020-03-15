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

function preload(){
   img = loadImage("uploads/images/a.jpg");

}

function setup() {

  var h = select('#h');
  img.resize(windowWidth/3,0);
  canvas = createCanvas(img.width,img.height);
  img.resize(canvas.width/scaler,canvas.height/scaler);
  canvas.position(windowWidth/2-width/2,h-10);

  // var upload = select('#upload');
  // upload.position(h.width,h.height);
  
  var sliderLabel = createP('Dot Size');
  sliderLabel.position(canvas.width*2+5,h.height+5+20);
  slider = createSlider(2,10,2);
  slider.position(canvas.width+canvas.width+5,h.height+5+60); 
  slider.changed(writeSize);

  var sliderLabel2 = createP('Light Intensity');
  sliderLabel2.position(canvas.width+canvas.width+5,h.height+5+90);
  slider2 = createSlider(70,500,0);
  slider2.position(canvas.width+canvas.width+5,h.height+5+slider.height+120); 
  slider2.changed(writeBright);
  bright = 255;

  var pickerLabel = createP('Foreground Color');
  var pickerLabel2 = createP('Background Color');
  pickerLabel.position(canvas.width+canvas.width+5,h.height+5+160);
  pickerLabel2.position(canvas.width+canvas.width+5,h.height+5+240)
  fgColor = createColorPicker('black');
  bgColor = createColorPicker('white');
  fgColor.position(canvas.width+canvas.width+5,h.height+5+200);
  bgColor.position(canvas.width+canvas.width+5,h.height+5+280);
  setStroke();
  setBackground();

  var button = createButton('Save');
  button.mouseClicked(saveIt);
  button.position(canvas.width+canvas.width+5,h.height+5+340)

  processPixels();
}

function saveIt(){
  saveCanvas("protoprint"+month()+"-"+day()+"-"+year()+"-"+hour()+":"+second());
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
  img.loadPixels();
  fgColor.input(setStroke);
  bgColor.input(setBackground);
  canvas.width=windowWidth/3;
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
    processPixels();
}

