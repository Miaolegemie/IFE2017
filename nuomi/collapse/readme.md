# 使用CSS实现折叠面板

## 任务要求

使用input的radio单选框特性结合CSS中的伪元素实现[bootstrap中折叠面板(点击查看样例)](http://v3.bootcss.com/javascript/#collapse-example-accordion)，要求样式一致。


[任务地址](http://ife.baidu.com/course/detail/id/27)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/collapse/index.html)

## 简单解析

1. 使用input的radio单选框特性完成
  1. 隐藏  `input` ，使用 `label` 来触发选中
  2. 使用 `:check` 即 `+` 选择器
  3. 动画：
    1. 需要使用 `visibility` 切换，不能使用 `display`
      - 切换时需注意：在隐藏时，需设置 `transition: visibility 0s .2s ease`，即将 隐藏 延迟到其余动画执行完时执行
    2. 切换时注意 `height` 与 `padding`
      - 任务中需同时切换 `height` 与 `padding`
      - `height .2s ease, padding-top .2s ease, padding-bottom .2s ease`
2. 使用锚点完成
  1. `:target` 会突出显示活动的 HTML 锚点，因此可以用 `:target` 来控制显式折叠面板中的哪一个
  缺点：
  2. 缺点：
    1. 会改变当前 url
    2. 即使有多个折叠面板，整个也页面最多只有一个被激活


## bug

动画的时候高度有微小波动，暂未发现原因
