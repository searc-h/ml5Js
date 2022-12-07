// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;
let imgf = document.querySelector('.first img')
let spanf = document.querySelector('.first #result')

let fileImg = document.querySelector('.second input')
let imgS = document.querySelector('.second img')
let spanS = document.querySelector('.second #result')

//文件改变事件
fileImg.addEventListener('change',(e)=>{
  let fr = new FileReader() 
  fr.readAsDataURL(fileImg.files[0])
  fr.onloadend = ()=>{
    imgS.src = fr.result
    
    classifier.classify(imgS, getImg);
  }
})


function preload() {
  classifier = ml5.imageClassifier('MobileNet');
  console.log(classifier)
  img = loadImage('images/bird.png' , (img)=>{
    img.width = img.width / 3
    img.height = img.height /3
  });
}

function setup() {
  createCanvas(img.width, img.height);

  classifier.classify(img, gotResult);
  classifier.classify(imgf, getResult);
  image(img, 0, 0);
}

function getImg(error , results){
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    let stringArr = results.map((item)=>{
      return `Label: ${item.label} ;Confidence: ${nf(item.confidence, 0, 2)} \n`
    })
    spanS.innerHTML = JSON.stringify(stringArr)
  }
}

function getResult(error , results){
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    spanf.innerHTML = `Label: ${results[0].label} ;Confidence: ${nf(results[0].confidence, 0, 2)}`
  }
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  } else {
    // The results are in an array ordered by confidence.
    console.log(results);
    createDiv(`Label: ${results[0].label}`);
    createDiv(`Confidence: ${nf(results[0].confidence, 0, 2)}`);
  }
}
