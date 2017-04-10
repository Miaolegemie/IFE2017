# CSS3饼状loading效果

## 任务目标

[要求效果](https://ww2.sinaimg.cn/large/006tNbRwly1fcr4ycdb9cg30d80dm0tf.gif)

[任务地址](http://ife.baidu.com/course/detail/id/36)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/loading/index.html)

## 简单解析

- 3/4 半圆

  ```css
  border: 3px solid #FF298C;
  border-radius: 50%;
  border-top-color: transparent;
  ```

- 圆形 loading
  1. 背景为 左红右粉
  2. 两片半圆先均在左侧，粉在红上
  3. 粉色先开始顺时针转动108°，露出底下红色，变为红在粉上
  4. 然后红色开始转动108°，至此整个圆为红色
  5. 粉色再开始转动180°，使得左半边为粉色，变回粉在红上
  6. 红色开始转动180°，露出底下粉色，至此整个院为粉色
  7. 从1开始
## bug

- 1px 问题
