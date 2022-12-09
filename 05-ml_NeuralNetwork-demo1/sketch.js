// 1. collectData
// 2. trainData
// 3. Prediction

let model ; // 神经网络对象模型
let cvs;  // canvas对象
let targetKey = 'A'; // 按键值

let keyStatus = 'collection' ; // 按键状态（处于数据采集 or 数据预测）
let files ;  // 文件
function preload(){
    createP("This Canvas is only supported by 'A/a','S/s','D/d','F/f' keys to mark")
    createP("You can press your keyborad to choose what should be marked on canvas")
}
function setup() {
    cvs = createCanvas(400 , 400 );
    cvs.elt.style.border = '1px solid black'
    

    // save data
    createButton('save Data').mousePressed(()=>{
        model.saveData()
    })

    // load data
    createButton('load data').mousePressed(()=>{
        model.loadData('model/2022-12-9_23-8-18.json',dataLoaded)
    })
    // save model
    createButton("save model").mousePressed(()=>{
        model.save()
    })
    
    // load model
    createButton("loadmodel").mousePressed(()=>{
        const modelInfo = {
            model: 'model/model.json',
            // metadata: 'path/to/model_meta.json',
            weights: 'model/model.weights.bin',
        };
        model.load(modelInfo , ()=>{
            console.log('model loaded')
        })
    })

    let options = {
        inputs : ['x' , 'y'], // 输入参数为两个，参数名为x,y
        outpus : ['label'], //输出参数为一个，参数名为label
        task: 'classification', //任务
        debug : true
    }

    model = ml5.neuralNetwork(options);
}

function keyPressed(){
    
    // the key of T/t start to train
    if(key == 't'){
        keyStatus = 'prediction'
        train()
        return
    }

    if(['A','S','D','F'].includes(key.toUpperCase())){
        targetKey = key.toUpperCase()
    }else{
        
    }
}

// collectData
function mousePressed(){

    let inputs = {
        x : mouseX,
        y : mouseY,
    }
    let outputs = {
        label : targetKey
    }


    if(keyStatus == 'collection'){
        // 添加数据构成数据集
        model.addData(inputs, outputs)
        stroke(0);
        noFill();
        ellipse(mouseX , mouseY , 24);

        fill(0);
        noStroke();
        textAlign(CENTER ,CENTER)
        text(targetKey , mouseX , mouseY)
    }else if(keyStatus == 'prediction'){
        model.classify(inputs ,prediction )
        
    }
    

    
}

// trainData
function train(){
    //格式化数据集
    model.normalizeData()

    let option = {
        epochs : 100, //一组数据训练50次
        batchSize : 64
    }

    model.train(option , 
        (epoch , loss)=>{
            console.log(epoch)
    },  ()=>{
        console.log("train finished")
    })
}

function prediction(error , results){
    if(error){
        console.log(error.message)
        return
    }else{
        let targetRs = results[0].label
        stroke(0);
        if(targetRs == 'A'){
            fill(0,0,255 ,100);
        }else if(targetRs == 'S'){
            fill(0,255,255 ,100);
        }else if(targetRs == 'D'){
            fill(255,0,255 ,100);
        }else{
            fill(255,0,0 ,100);
        }
        ellipse(mouseX , mouseY , 24);

        fill(0);
        noStroke();
        textAlign(CENTER ,CENTER)
        text(results[0].label , mouseX , mouseY)
    }
    
}


function dataLoaded(){
    console.log(model.data) 
    //  model.data :  The property that stores all of the training data after .train() is called
    // 这里更新之后，我们不能在为训练之前拿到data了
    // model.data.forEach(({xs ,ys})=>{
    //     stroke(0);
    //     noFill();
    //     ellipse(xs.x , xs.y , 24);

    //     fill(0);
    //     noStroke();
    //     textAlign(CENTER ,CENTER)
    //     text(ys.label , mouseX , mouseY)
    // })
}
function draw(){
    
}