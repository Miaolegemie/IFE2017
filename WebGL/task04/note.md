# canvas 的 像素大小 和 展示大小

## 背景

当 canvas 元素的 `width` 和 `height` 或 `style="width: xx;height: xx;"` 设置的是百分比或者 vh/vw等的时候（即不是用 px 为单位的时候），会发现画面虽然全屏了，但却十分模糊

<img src="http://om0xsrqrl.bkt.clouddn.com/IFE2017/webGL/webGL-task04-1.png" alt="模糊" width="100%">


## 解决方案

这是由于 canvas 像素过不匹配（过低）引起的，因此需要重新设置 canvas 像素数量

```javascript
renderer.setSize(window.innerWidth, window.innerHeight)
```

## 发现问题

这里我们可以通过打印 `renderer.getSize()` 来看一下，结果发现，canvas 元素自身的大小如图

![canvas大小](http://om0xsrqrl.bkt.clouddn.com/IFE2017/webGL/webGL-task04-2.png)

这个 300 * 150 的大小是 canvas 元素默认的大小

[默认 height](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/height)，
[默认 width](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/width)。

但是我们刚刚设置了 canvas 元素的大小，为什么仍然是默认大小呢？

## 一探究竟

通过阅读 [WebGL Resizing the Canvas](https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html) 发现，canvas 元素含有两个不同的 size —— 一个决定 canvas 拥有多少个像素，即 size of its drawingbuffer，另外一个决定 canvas 展示出来有多大。

体现在代码中的话，即 css 中 `style="width: xx;height: xx;"` 决定 canvas 展示出来有多大；canvas 的 `width` 和 `height` 属性决定了 canvas 拥有多少像素。


下面这段代码比较 传神 地描述了两者的关系
```javascript
function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
      canvas.height != displayHeight) {

    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}
```

通常情况下，如果只设置了 canvas 的 width 和 height ，而没有设置 css 的 width 和 height 的话， canvas 会被 “撑大”，即 canvas 展示出来的大小等于 canvas 像素数量

![canvas 展示出来的大小等于 canvas 像素数量](http://om0xsrqrl.bkt.clouddn.com/IFE2017/webGL/webGL-task04-3.png)

反过来，如果设置了 css 的 width 和 height ，而没有设置 canvas 的 width 和 height 的话, 则 canvas 自身的大小(像素数量)为默认的 300 * 150

![默认的 300 * 150](http://om0xsrqrl.bkt.clouddn.com/IFE2017/webGL/webGL-task04-4.png)

因此可以得出，只设置了 canvas 自身的 width 和 height 的话，相当于 canvas 展示出来的大小（css 中的 width 和 heght）也默认设置为了其 自身大小(像素数量)。而反过来则不行

那么同时设置又是什么情况呢？

![同时设置](http://om0xsrqrl.bkt.clouddn.com/IFE2017/webGL/webGL-task04-5.png)

![同时设置](http://om0xsrqrl.bkt.clouddn.com/IFE2017/webGL/webGL-task04-6.png)

## 结论

1. 如果没有在 three.js 中手动设置 canvas 像素数量，即`renderer.setSize(window.innerWidth, window.innerHeight)`，那么 three.js 会使用 canvas 自身的大小（像素数量）
2. canvas 有两个大小，一个决定 像素的数量，一个决定 在页面中的大小
3. 最好都显式设置
