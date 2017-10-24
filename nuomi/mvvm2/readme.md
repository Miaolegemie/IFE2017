# 动态数据绑定（二）

## 任务简介

请实现这样的一个 Observer，要求如下：

1. 传入的对象中嵌套对象
2. 如果设置新的值是一个对象的话，新设置的对象的属性能继续响应 getter 和 setter。
3. 考虑传递回调函数。

[任务地址](http://ife.baidu.com/course/detail/id/20)

[完成效果](https://miaolegemie.github.io/IFE2017/nuomi/mvvm2/index.html)

## 要求

```javascript
let app1 = new Observer({
        name: 'youngwind',
        age: 25
});

app1.data.name = {
        lastName: 'liang',
        firstName: 'shaofeng'
};

app1.data.name.lastName;
// 这里还需要输出 '你访问了 lastName '
app1.data.name.firstName = 'lalala';
// 这里还需要输出 '你设置了firstName, 新的值为 lalala'
```

```javascript
let app1 = new Observer({
         name: 'youngwind',
         age: 25
 });

 // 你需要实现 $watch 这个 API
 app1.$watch('age', function(age) {
         console.log(`我的年纪变了，现在已经是：${age}岁了`)
 });

 app1.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'
```
