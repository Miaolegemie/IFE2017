WebGL No. 5 - 动画

## 简介

键盘 WASD 控制小车的前进、后退、转弯

[任务地址](http://ife.baidu.com/course/detail/id/34)

[实现效果--简单版](https://miaolegemie.github.io/IFE2017/WebGL/task05/task05_1.html)

## 实现思路

### 简化版

1. 将汽车作为一个整体 `THREE.Group()`
2. 监听键盘 WASD 按下
3. 前进/后退
  1. 通过 `ratation.y` 拿到车车在平面上的旋转角（rad）
  2. 通过 `Math.cos()` 与 `Math.sin()` 拿到 x, y 轴上的分量后，更新小车的 `position`
4. 旋转
  1. 直接更新 `rotation.y`

## 注意事项

1. 动画中需要手动触发 `render()` ，否则会有卡顿
