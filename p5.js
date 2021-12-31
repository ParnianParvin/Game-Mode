const serviceUuid = "19b10010-e8f2-537e-4f6c-d104768a1214";
let myCharacteristic;
let myValue = 0;
let myBLE;
let song;


function setup() {
  colorMode(HSB, 255);
  myBLE = new p5ble();
  song = loadSound('thes.mp3');

  createCanvas(windowWidth, windowHeight);
  textSize(200);
  textAlign(CENTER, CENTER);

  const connectButton = createButton('Connect')
  connectButton.mousePressed(connectToBle);
}

function connectToBle() {
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function gotCharacteristics(error, characteristics) {
  if (error) console.log('error: ', error);
  console.log('characteristics: ', characteristics);
  myCharacteristic = characteristics[0];
  myBLE.read(myCharacteristic, gotValue);
}

function gotValue(error, value) {
  if (error) console.log('error: ', error);
  console.log('value: ', value);
  myValue = value;
    if (song.isPlaying()) {

  } else {
    song.play();
  }
  myBLE.read(myCharacteristic, gotValue);
}

function draw() {

  if(myValue || myValue === 0){
    background(myValue, 255, 255);
    text('Find Edna!', windowWidth/2, windowHeight/2);
    song.setVolume(1-(myValue/112));

    }

}
function mousePressed() {
  if (song.isPlaying()) {

  } else {
    song.play();

  }
}
