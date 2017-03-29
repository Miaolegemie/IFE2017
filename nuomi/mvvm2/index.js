class observer {
  constructor (data) {
    this.data = data
    this.walk(data)
    this.eventsBus = new event()
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
    let _this = this
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get () {
        console.log('你访问了' + key)
        return val
      },
      set (newVal) {
        console.log('你设置了' + key)
        console.log('新的' + key + ' = ' + newVal)
        // 触发 watch
        _this.eventsBus.emit(key, val, newVal)
        // 即使修改后是对象，也保持对其内部
        val = newVal
        if (typeof newVal === 'object') {
          new observer(val)
        }
      }
    })
  }

  watch (attr, callback) {
    this.eventsBus.on(attr, callback)
  }
}

class event {
  constructor () {
    this.events = {}
  }

  on (attr, callback ) {
    if (this.events[attr]) {
      this.events[attr].push(callback)
    } else {
      this.events[attr] = [callback]
    }
  }

  of (attr) {
    for (let key in this.events) {
      if (this.events.hasOwnProperty(key) && key === attr) {
        delete this.events[key]
      }
    }
  }

  emit (attr, ...arg) {
    this.events[attr] && this.events[attr].forEach(callback => {
      callback(...arg)
    })
  }
}
