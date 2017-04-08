# 自定义网页右键菜单

## 任务要求

1. 实现鼠标右击时，出现自定义菜单。
2. 点击自定义菜单条目时，弹出菜单条目名称。

[任务地址](http://ife.baidu.com/course/detail/id/26)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/contextmenu/index.html)

## 简单解析

1. 实现鼠标右击时，出现自定义菜单。
  1. 监听 `contextmenu` 事件，此事件由鼠标右键点击触发
  2. 阻止浏览器原生右键菜单
  3. 将 自定义右键菜单 展示出来 （`display:block;`），**然后获取其宽高**
  4. 计算应该在点击的 左上/左下/右上/右下 何处展示
    - 以左右为例，先判断左/右是否有足够宽度，有则直接在左/右展示。如果没有则判断左/右谁更宽，展示在更宽的一侧
  5. 绑定 点击别处 自定义菜单 消失事件
    - 如何判定 点击别处：**判定 `e.path` 中是否有 自定义右键菜单 元素**


2. 点击自定义菜单条目时，弹出菜单条目名称。
  使用 事件委托
  ```javascript
  let nodeName = e.target.nodeName.toLocaleLowerCase()
  if (nodeName === 'p') {
    let text = e.target.innerText
    alert(text)
  }
  ```
