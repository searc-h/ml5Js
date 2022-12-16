let video;
let poseNet ; 
let pose; 
let skeleton ; 
function setup(){
    createCanvas(640 , 480);

    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video , modelReady)

    poseNet.on('pose' , (result)=>{
        try {
            pose = result[0].pose
            skeleton = result[0].skeleton
            console.log(skeleton)
        } catch (error) {
            console.log(error.message)
            alert("You leave your site")
        }
        /**
         *  keypoints: (17) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
            leftAnkle: {x: 426.7733337164853, y: 552.3365908374119, confidence: 0.0037451402749866247}
            leftEar: {x: 396.0184597505206, y: 350.6530595475134, confidence: 0.9280024766921997}
            leftElbow: {x: 569.982650103736, y: 589.2053887630715, confidence: 0.0075750770047307014}
            leftEye: {x: 356.33989623548456, y: 339.18357403825695, confidence: 0.9996323585510254}
            leftHip: {x: 403.7175516210178, y: 574.8747853082442, confidence: 0.017436422407627106}
            leftKnee: {x: 448.51875631725744, y: 544.6269588247811, confidence: 0.0034116844180971384}
            leftShoulder: {x: 475.5702084789944, y: 515.1076178049763, confidence: 0.6228451132774353}
            leftWrist: {x: 515.5949005542562, y: 554.1176712095505, confidence: 0.0058570378459990025}
            nose: {x: 317.57537411344657, y: 372.7148081263679, confidence: 0.9995924830436707}
            rightAnkle: {x: 154.50176610093172, y: 559.5413208007812, confidence: 0.002324213506653905}
            rightEar: {x: 234.55987893189902, y: 338.98114987384486, confidence: 0.8792892098426819}
            rightElbow: {x: 107.67542263877067, y: 568.8154346748084, confidence: 0.19486744701862335}
            rightEye: {x: 283.8411549371504, y: 328.60834737696075, confidence: 0.999751627445221}
            rightHip: {x: 196.37791496306542, y: 582.6733778422908, confidence: 0.003998567815870047}
            rightKnee: {x: 156.66272204209858, y: 548.3129704694339, confidence: 0.005541243590414524}
            rightShoulder: {x: 158.6048073527414, y: 454.25026503982247, confidence: 0.9723420739173889}
            rightWrist: {x: 121.24120036915582, y: 557.8286184318334, confidence: 0.012686674483120441}
            score: 0.39169993241974976
         */
    })

}

function modelReady(){
    console.log("modelReady")
}

function draw(){
    image(video , 0, 0)

    fill(255 , 0 , 0)
    if(pose){
        for (const item in pose) {
            ellipse(pose[item].x ,pose[item].y , 10)
        }
    }

    
    if(skeleton){
        strokeWeight(2)
        stroke(0,0,255)
        for (const item of skeleton) {
            line(item[0].position.x , item[0].position.y , item[1].position.x , item[1].position.y)
        }
    }
}