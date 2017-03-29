class observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }

  walk (obj) {
    let val
    for (let key in obj) {
      // 只需要本身的的属性
      if (obj.hasOwnProperty(key)) {
        val = obj[key]
        // 递归
        if (typeof val === 'object') {
          new observer(val)
        }

        this.convert(key, val)
      }
    }
  }

  convert (key, val) {
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log('你访问了' + key)
        return val
      },
      set: function (newVal) {
        console.log('你设置了' + key)
        console.log('新的' + key + ' = ' + newVal)
        if (newVal === val) return
        val = newVal
      }
    })
  }
}
