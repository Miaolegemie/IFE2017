class Observer {
  constructor (data, path, eventsBus) {
    this.data = data
    this.path = path || ''
    this.eventsBus = eventsBus || new Event()
    this.walk(data)
  }

  walk (obj) {
    for (let key in obj) {
      // 只需要本身的的属性
      if (obj.hasOwnProperty(key)) {
        let val = obj[key]
        // 递归
        if (typeof val === 'object') {
          const path = this.path ? `${this.path}.${key}` : key
          new Observer(val, path, this.eventsBus)
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
        return val
      },
      set (newVal) {
        // 触发 watch
        const path = _this.path ? `${_this.path}.${key}` : key
        _this.eventsBus.emit(path, val, newVal)
        // 即使修改后是对象，也保持对其内部
        val = newVal
        if (typeof newVal === 'object') {
          new Observer(val, path, _this.eventsBus)
        }
      }
    })
  }

  watch (attr, callback) {
    this.eventsBus.on(attr, callback)
  }
}

class Event {
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

  off (attr) {
    for (let key in this.events) {
      if (this.events.hasOwnProperty(key) && key === attr) {
        delete this.events[key]
      }
    }
  }

  emit (attr, ...arg) {
    const paths = attr.split('.')
    paths.forEach((p, index) => {
      const path =  paths.slice(0, index + 1).join('.')
      this.events[path] && this.events[path].forEach(callback => {
        callback(...arg)
      })
    })
  }
}
