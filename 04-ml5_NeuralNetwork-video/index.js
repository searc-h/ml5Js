const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 120;
const IMAGE_CHANNELS = 4;

let classifier;

let video;
let trainBtn;
let labelInput;
let resultLabel;

function setup(){
    // 添加画布
    createCanvas(500,400)

    // video对象
    video = createCapture(VIDEO)
    video.size(120,120)


    trainBtn = createButton('train');
    trainBtn.mousePressed(train);
    addDataBtn = createButton('addData');
    addDataBtn.mousePressed(addData);
    resultLabel = createDiv('');
    labelInput = createInput('label');


    const options = {
        task: 'imageClassification',
        debug: true,
        inputs: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    };

    classifier = ml5.neuralNetwork(options);

}

function draw() {
    image(video, 0, 0, width, height);
}

// 添加训练数据
function addData(){
    console.log("addData is: ",labelInput.value())
    classifier.addData({image : video} , {label:labelInput.value()})
}

// 训练
function train(){
    // epochs：每组数据训练多次伦
    // batchSize ： 每组多少个数据单元
    const TRAINING_OPTION = {
        batchSize : 16,
        epochs : 4,
    }

    // 格式化数据
    try {
        classifier.normalizeData();
        classifier.train(TRAINING_OPTION , finishedTraining);
    } catch (error) {
        alert(error.message)
    }
}


function finishedTraining(){
    console.log("finished training");
    classifier.classify([video] , gotResults);
}

function gotResults(err, result){
    if (err) {
        console.log(err);
        return;
    }
    console.log(result)
    resultLabel.html(`${result[0].label}`);

    // 循环识别
    classifier.classify([video], gotResults);
}