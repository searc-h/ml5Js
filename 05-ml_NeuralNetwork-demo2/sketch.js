let canvas  ;
let canvasSize = {x : 600 , y : 500}
let dataRaw = []
let nn ; 
let outputData = []
function preload(){
    document.onkeydown = ({key})=>{
        if(key.toLowerCase() == 't'){
            outputData = []
            train()
        }
    }
}

function setup() {
    
    canvas = createCanvas(canvasSize.x , canvasSize.y)   
    canvas.style("margin:20px") 
    canvas.mouseClicked(function(evt){
        
        // let d = {x : evt.x-20, y : evt.y -20} //减去外边距
        let d = {x : evt.offsetX , y : evt.offsetY} //编译位置
        console.log(d)
        dataRaw.push(d)

        nn.addData([d.x],[d.y]) //添加训练数据
    })
    
    const options = {
        inputs: 1,
        outputs: 1,
        task: 'regression',
        learningRate : 0.1,
        debug: true
    }
    nn = ml5.neuralNetwork(options)

    
}

function train(){
    
    nn.normalizeData() //数据进行归一化
    let trainOption = {
        epochs : 80,
        batchSize : 64
    }

    nn.train(trainOption , (epochs , loss)=>{
        console.log(loss.loss)
    }, ()=>{
        console.log('train done!')
        console.log('begin prediction')
        prediction()
    })
}

function prediction(){
    
    for(let x = 0 ; x<canvasSize.x  ; x+=5){
        nn.predict([x] , (error , results)=>{
            if(error){
                console.log(error)
                return
            }

            outputData.push({
                x :x,
                y : results[0].value
            })
            
        })
        
    }
    setTimeout(() => {
        console.log(outputData)
    }, 100);

}


function draw(){
    background(200)
    
    
    stroke('black')
    line(0 , canvasSize.y/2 , canvasSize.x , canvasSize.y /2)
    line( canvasSize.x/2, 0  ,canvasSize.x/2, canvasSize.y)

    dataRaw.forEach((item)=>{
        circle(item.x , item.y,5)
    })

    stroke('white')
    outputData.forEach((item)=>{
        circle(item.x , item.y,2)
    })
    
}