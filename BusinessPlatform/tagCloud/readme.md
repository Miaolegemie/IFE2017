# 商业平台学院 -- 标签云

## 简介

实现一个 3D标签云 插件

[任务地址](http://ife.baidu.com/course/detail/id/17)

[实现效果](https://miaolegemie.github.io/IFE2017/BusinessPlatform/tagCloud/index.html)

## 使用方法

```javascript
new tagCloud({
  // 需要挂载的dom
  dom: dom,
  // 要显示的内容
  tags: [{
    'name': str, // 文字（字符串）
    'data': number, // 影响文字的大小，根据最小的和最大的 data 来动态决定（数字）
    'color': srt // 颜色，如 #000000（字符串）
  }],
  // 默认 50, 调节 标签云 与 挂载dom 的 padding
  padding : number,
  // 默认 1，调节 标签云 转速
  baseSpeed :number
})
```
