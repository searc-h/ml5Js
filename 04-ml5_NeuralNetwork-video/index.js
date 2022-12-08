const IMAGE_WIDTH = 120;
const IMAGE_HEIGH = 120;
const IMAGE_CHANNELS = 4;

let classifier;

let video;
let trainBtn;
let labelInput;
let resultLabel;

function setup(){
    createCanvas(400,400)

    video = createCapture(VIDEO)
    video.size(120,120)
}

function draw() {
    image(video, 0, 0, width, height);
}