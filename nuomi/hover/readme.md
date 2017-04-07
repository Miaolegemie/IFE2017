# 有趣的鼠标悬浮模糊效果

# 任务目标

- 实现文字的流光渐变动画
- 背景图需要进行模糊处理
- 实现按钮边框的从中间到两边扩展开

[任务地址](http://ife.baidu.com/course/detail/id/14)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/hover/index.html)

# 简单解析

1. 实现文字的流光渐变动画

使用背景图裁剪至文字大小后及动画实现

```css
.text {
  background-image: linear-gradient(to right, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
  color: transparent;
  /*两个 webkit 前缀必须加*/
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-size: 200% 100%;
  animation: masked 4s infinite linear;
}
@keyframes masked {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
```

2. 背景图需要进行模糊处理

```css
filter: blur(5px);
```

3. 实现按钮边框的从中间到两边扩展开

先让 border 在中间，长度为0，触发 hover 时，将其 top/left 设置为 0（即移动到开始位置），并将长度设置为 100%。这样遍可实现从中间到两边扩展开的效果

```css
.text::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  width: 0;
  height: 100%;
  border: 3px solid white;
  border-width: 3px 0;
  transition: all .5s;
  box-sizing: border-box;
}
.blur img:hover+.text::before {
  width: 100%;
  left: 0;
}
.text::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 0;
  border: 3px solid white;
  border-width: 0 3px;
  transition: all .5s;
  box-sizing: border-box;
}
.blur img:hover+.text::after {
  height: 100%;
  top: 0;
}
```
