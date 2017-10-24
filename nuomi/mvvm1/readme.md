# 动态数据绑定（一）

## 任务简介

请实现这样的一个 Observer，要求如下：

1. 传入参数只考虑对象，不考虑数组。
2. new Observer返回一个对象，其 data 属性要能够访问到传递进去的对象。
3. 通过 data 访问属性和设置属性的时候，均能打印出右侧对应的信息。

[任务地址](http://ife.baidu.com/course/detail/id/15)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/mvvm1/index.html)

## 要求

```javascript
let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science
```
