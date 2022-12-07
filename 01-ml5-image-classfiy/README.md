##  ml5.imageClassifier('MobileNet');
> ml5.imageClassifier指明使用图像分类
> "MobileNet"：MobileNet网络专注于移动端或者嵌入式设备中的轻量级CNN，相比于传统卷积神经网络，在准确率小幅度降低的前提下大大减少模型参数与运算量
### 在线包资源
```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js"></script>
```

### 总结 ：classifier.classify(img, gotResult);
- img可以是canvas，img-label-object；
- goResult是回调函数
- 回到函数的参数(error , results)
- results是数组
