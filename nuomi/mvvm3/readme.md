# 动态数据绑定（三）

## 任务简介

请实现这样的一个 Observer，要求如下：

1. 深层次数据变化如何逐层往上传播。

[任务地址](http://ife.baidu.com/course/detail/id/21)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/mvvm1/index.html)

## 要求

```javascript
let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
```
