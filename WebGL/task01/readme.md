# WebGL No.1 - Three.js 入门

## 简介

[任务地址](http://ife.baidu.com/course/detail/id/18)

[实现效果](https://miaolegemie.github.io/IFE2017/WebGL/task01/task01.html)

实现一个简单的小车模型

## [《Three.js 入门指南》](http://www.ituring.com.cn/article/47975) 中一些注意事项

一个典型的 Three.js 程序至少要包括渲染器（Renderer）、场景（Scene）、照相机（Camera），以及你在场景中创建的物体

### 照相机

照相机定义了三维空间到二维屏幕的投影方式

同时又分为 正交投影 和 透视投影。一般说来，对于制图、建模软件通常使用正交投影，这样不会因为投影而改变物体比例；而对于其他大多数应用，通常使用透视投影，因为这更接近人眼的观察效果。

在 正交投影照相机（Orthographic Camera）中

**为了保持照相机的横竖比例，需要保证(right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致**

而在 透视投影照相机（Perspective Camera）中

**aspect等于width / height，通常设为Canvas的横纵比例。**

### 几何形状

69版本废掉了CubeGeometry，改用BoxGeometry

### 材质

官网文档上 材质的颜色(color)默认为 0xffffff 而不是随机

### 光与影

MeshLambertMaterial的ambient属性似乎被弃用，文档中已经没有此属性。

## 任务分析

1. 创建 渲染器，设置渲染器背景颜色
2. 设置 照相机
  - 采用了移动照相机方位后，改变观察点的方式实现任务要求的观察角度
3. 添加车体和车轮
4. 添加光源

##奇怪的问题

车轮的阴影和示例上的不一样啊不一样。。。
