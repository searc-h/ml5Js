## 用特征提取来实现回归
### 关键代码
```js
// 基于MobileNet的特征提取模型对象
featureExtractor = ml5.featureExtractor('MobileNet', ()=>{
    console.log("model loaded")
    // 基于video的识别对象
    classifier = featureExtractor.regression(video, ()=>{
        console.log("video loaded")
    });
});
```

### 关键思路
> 用video来获取video帧(图片)作为训练数据
```js
// 调用addImage时自动捕获图片
function addData(num  ,text){
    classifier.addImage(num , ()=>{
        console.log(`${text} added`)
    })
}
```

> 图片数值对应关系
```js
// 输入集：{图片，数值}
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
```
> 训练

> 预测

> 画图
```js
function draw(){
    if(!valueSize) return
    background(`rgba(0,0,0,0)`)
    let r = valueSize  * 150
    image(img , -r/2 ,-r/2 + r/5 , r ,r)
}

```

### 遗留问题
> 保存模型依旧失败
```js
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
```
