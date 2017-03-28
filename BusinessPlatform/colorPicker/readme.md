# 商业平台学院 -- UI组件之色彩选择器

## 简介

实现一个 色彩选择器 插件

[任务地址](http://ife.baidu.com/course/detail/id/16)

[实现效果](https://miaolegemie.github.io/IFE2017/BusinessPlatform/colorPicker/index.html)

## 色彩空间

![不同色彩空间对比](http://om0xsrqrl.bkt.clouddn.com/IFE2017/BusinessPlatform/task1-1.png)

色彩模型是描述使用一组值（通常使用三个、四个值或者颜色成分）表示颜色方法的抽象数学模型。例如 三原色光模式(RGB) 和印刷四分色模式(CMYK) 都是色彩模型。但是一个与绝对色彩空间没有函数映射关系的色彩模型或多或少地都是与特定应用要求几乎没有关系的任意色彩系统。

在色彩模型和一个特定的参照色彩空间之间加入一个特定的映射函数就在参照色彩空间中出现了一个明确的"footprint"。这个 "footprint" 称为色域，并且与色彩模型一起定义为一个新的色彩空间。例如 Adobe RGB 和 sRGB 是两个基于 RGB 模型的不同绝对色彩空间。

### 利用原色相混的比例表示的色彩空间 —— RGB和CMYK

- RGB采用加法混色法，因为它是描述各种“光”通过何种比例来产生颜色。光线从暗黑开始不断叠加 产生颜色。RGB描述的是红绿蓝三色光的数值。RGBA是在RGB上增加阿尔法通道实现透明效果。
  - 基于RGB模式的普通色彩空间有sRGB， Adobe RGB和Adobe Wide Gamut RGB。
- CMYK印刷过程中使用减法混色法，因为它描述的是需要使用何种油墨，通过光的反射显示出颜色。它是在一种白色介质（画板，页面等）上使用油墨来体现图像。CMYK描述的是青，品红，黄和黑四种油墨的数值。根据不同的油墨，介质，和印刷特性，存在多种CMYK色彩空间。（可以通过色点扩张或者转换各种油墨数值从而得到不同的外观）

### 利用不同的概念表示的色彩空间 —— HSL和HSV

![HSL和HSV](http://om0xsrqrl.bkt.clouddn.com/IFE2017/BusinessPlatform/task1-2.png)

HSL和HSV都是一种将RGB色彩模型中的点在圆柱坐标系中的表示法。这两种表示法试图做到比RGB基于笛卡尔坐标系的几何结构更加直观。

- 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。
- 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值。
- 明度（V），亮度（L），取0-100%。

W3C的CSS3规定声称“HSL的优点是它对称于亮与暗（HSV就不是这样）…”，这意味着：
- 在HSL中，饱和度分量总是从完全饱和色变化到等价的灰色（在HSV中，在极大值V的时候，饱和度从全饱和色变化到白色，这可以被认为是反直觉的）。
- 在HSL中，亮度跨越从黑色过选择的色相到白色的完整范围（在HSV中，V分量只走一半行程，从黑到选择的色相）。

#### HSL

HSL即色相、饱和度、亮度（Hue, Saturation, Lightness）

#### HSV

HSV即色相、饱和度、明度（Hue, Saturation, Value），又称HSB，其中B即：Brightness。

### 电视常用色彩空间 —— xvYCC

- xvYCC是一个新的国际数位视频颜色空间标准，基于孟塞尔颜色系统创造，并已被国际电子技术委员会接受。

## 实现思路

1. 通过上文对 HSL 的简单介绍，我们发现可以将其划分为三个独立的部分 —— H、S、L
2. Hue 的变化如下
  ![Hue变化](http://om0xsrqrl.bkt.clouddn.com/IFE2017/BusinessPlatform/task1-4.png)

  因此，可以直接使用 Hue 作为色柱来选择颜色

  ![色柱](http://om0xsrqrl.bkt.clouddn.com/IFE2017/BusinessPlatform/task1-5.png)

3. 至于 S、L 则在选色盘上来选择。为了方便，L 将随 Y 轴进行线性变化，S 随 X 轴进行线性变化
  ![选色盘](http://om0xsrqrl.bkt.clouddn.com/IFE2017/BusinessPlatform/task1-6.png)
4. RGB 与 HSL 的转换。这一点网上有很多代码及原理，这里就不再过多阐述

## 疑问

1. 任务要求如下所示，然而似乎这样丧失了 S(饱和度) 数据，有所怀疑

![要求](http://om0xsrqrl.bkt.clouddn.com/IFE2017/BusinessPlatform/task1-3.png)
