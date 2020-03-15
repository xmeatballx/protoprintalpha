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
var c;
var y;
var m;
var k;

function preload()  {
  img = loadImage("WELCOME.JPG")
}

function setup() {
rectMode(CENTER);
  img.resize(windowWidth/3,0);
  canvas = createCanvas(img.width,img.height);
  img.resize(width/scaler,height/scaler);
  canvas.position(windowWidth/2-width/2,windowHeight/2-height/2);

  c = createGraphics(img.width,img.height);
  m = createGraphics(img.width,img.height);
  y = createGraphics(img.width,img.height);
  k = createGraphics(img.width,img.height);
  // var h = select('#h');

  // var upload = select('#upload');
  // upload.position(h.width,h.height);
  
  var sliderLabel = createP('Dot Size');
  sliderLabel.position(canvas.x+width+2,canvas.y+20);
  slider = createSlider(2,10,2);
  slider.position(canvas.x+width+2,canvas.y+60); 
  slider.changed(writeSize);

  var sliderLabel2 = createP('Light Intensity');
  sliderLabel2.position(canvas.x+width+2,canvas.y+90);
  slider2 = createSlider(70,500,0);
  slider2.position(canvas.x+width+2,canvas.y+slider.height+120); 
  slider2.changed(writeBright);
  bright = 255;

  var pickerLabel = createP('Foreground Color');
  var pickerLabel2 = createP('Background Color');
  pickerLabel.position(canvas.x+width+2,canvas.y+160);
  pickerLabel2.position(canvas.x+width+2,canvas.y+240)
  fgColor = createColorPicker('black');
  bgColor = createColorPicker('white');
  fgColor.position(canvas.x+width+2,canvas.y+200);
  bgColor.position(canvas.x+width+2,canvas.y+280);


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

function processC(){
  //background(255);
  img = extractCMYKChannel(img,"cyan");
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
        c.noStroke();
        c.ellipse(j*scaler,i*scaler,sz,sz);
      }
    }
}

function processM(){
  //background(255);

  img.loadPixels();
 img = extractCMYKChannel(img,"magenta");  //img.resize(img.width/4,img.height/4);
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
        m.noStroke();
        m.ellipse(j*scaler,i*scaler,sz,sz);
      }
    }
}

function processY(){
  //background(255);
  img = extractCMYKChannel(img,"yellow");
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
}

function processK(){
  //background(255);
  img = extractCMYKChannel(img,"black");
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
        k.noStroke();
        k.ellipse(j*scaler,i*scaler,sz,sz);
      }
    }
}

function processPixels(){
  processC();
  processM();
  processY();
  processK();
  image(c,img.width,img.height);
  image(y,img.width,img.height);
  image(m, img.width,img.height);
  image(k,img.width,img.height);
}

// function handleFile() {
//     //img = loadImage("uploads/photos/" + "a.filename");
//     //processPixels();
// }

