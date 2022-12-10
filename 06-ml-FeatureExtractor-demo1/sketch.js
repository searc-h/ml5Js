let video  , canvas ; 
let size = {w : 500 , h : 400};

let classifier;
let files = [] ;
let featureExtractor ;
let img ; 
let valueSize  ;

function preload(){
    video = createCapture(VIDEO)
    video.size(size.w , size.h);
    video.style("transform : rotateY(180deg)")


    img = loadImage('image/test.png');

    createDiv("--")
    createButton("add Large").mousePressed(largeBack)
    createButton("add Middle").mousePressed(middleBack)
    createButton("add Small").mousePressed(smallBack)
    createButton("add Stop").mousePressed(stopPredicting)

    createDiv("--")
    createButton("train").mousePressed(train)
    createDiv('--')
    createButton("prediction").mousePressed(predictModel)

    createDiv("--")
    createButton("save model").mousePressed(saveModel)

    createButton("load model").mousePressed( loadAlreadyModel)

    createFileInput((fileObj)=>{
        files.push(fileObj.file)
    },"true");
}

function setup() {
    
    canvas = createCanvas(size.w , size.h , WEBGL)
    canvas.style("position: absolute; z-index: 10; left:10px ; top:0px")
    
    featureExtractor = ml5.featureExtractor('MobileNet', ()=>{
        console.log("model loaded")
        classifier = featureExtractor.regression(video, ()=>{
            console.log("video loaded")
        });
    });
    
}
function addData(num  ,text){
    classifier.addImage(num , ()=>{
        console.log(`${text} added`)
    })
}
function largeBack(){
    addData(3 , "large")
}
function middleBack(){
    addData(2 ,"middle")
}
function smallBack(){
    addData(1 ,"small")
}
function stopPredicting(){
    addData(0 ,"stop")
}
function train(){
    classifier.train((loss)=>{
        console.log(loss)
    })
}

function saveModel(){
    classifier.save()
}
function loadAlreadyModel(){
    console.log(files)
    if(files.length){
        classifier.load(files , ()=>{
            console.log("load model success")
        })
    }else{
        console.log("没有模型可以加载")
    }
}
// 预测模型
function predictModel(){
    classifier.predict(function(error , results){
        if(error){
            console.log(error.message)
            return
        }
        valueSize = results.value
        setTimeout(() => {
            if(results.value < 0.2) return null
            else predictModel()
        }, 100);
    })
}


function draw(){
    if(!valueSize) return
    background(`rgba(0,0,0,0)`)
    let r = valueSize  * 150
    image(img , -r/2 ,-r/2 + r/5 , r ,r)
}
