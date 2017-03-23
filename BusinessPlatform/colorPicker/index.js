class colorPicker {
  constructor ({
    dom,
    type = 'hsl',
    color = 'hsl(0, 1, 0.5)'
  }) {
    this.dom = dom
    this.type = type
    this.hsl = []
    this.rgb = []
    this.init(color)
  }

  init (color) {
    if (this.type === 'hsl') {
      const hsl = color.slice(4, -1).split(',').map(ele => {
        return Number(ele.trim())
      })
      this.hsl = hsl
      this.hslToRgb(...this.hsl)
    } else {
      const rgb = color.slice(4, -1).split(',').map(ele => {
        return Number(ele.trim())
      })
      this.rgb = rgb
      this.rgbToHsl(...this.rgb)
    }
    this.changeHSL()
    this.changeRGB()

    this.changeBodyColor()
    this.initBar()
    this.changeSelectPos()
    this.addListenerBody()
    this.addListenerBar()
    this.addListenerRgbChange()
    this.addListenerHSLChange()
  }

  // 初始化 bar (色环)
  initBar () {
    let barStyle = `linear-gradient(to bottom`
      for (let i = 0; i <= 360; i += 10) {
        barStyle += `, hsl(${i}, 100%, 50%)`
      }
    barStyle += ')'
    this.dom.querySelector('.color-picker-bar').style.background = barStyle

    this.changeHSL()
    this.changeRGB()
    this.changeBodyColor()
    this.changeLabelColor()
    }

  // 修改 调色盘 背景色
  changeBodyColor () {
    this.dom.querySelector('.color-picker-color').style.background = `linear-gradient(to left, hsla(${this.hsl[0] * 360}, 100%, 50%, 1), hsla(${this.hsl[0] * 360}, 0%, 50%, 1))`
  }
  // 修改 label 背景色
  changeLabelColor () {
    Array.from(this.dom.querySelectorAll('label')).forEach(node => {
      node.style.color = `hsla(${this.hsl[0] * 360}, ${this.hsl[1] * 100}%, ${this.hsl[2] * 100}%, 1)`
    })
  }
  // 修改输入框 hsl 颜色
  changeHSL () {
    let hslDoms = Array.from(this.dom.querySelectorAll('.color-picker-hsl .color-picker-group input'))
    hslDoms.forEach((dom, index) => {
      dom.value = Number(this.hsl[index])
    })
  }
  // 修改输入框 rgb 颜色
  changeRGB () {
    let rgbDoms = Array.from(this.dom.querySelectorAll('.color-picker-rgb .color-picker-group input'))
    rgbDoms.forEach((dom, index) => {
      dom.value = Number(this.rgb[index])
    })
  }

  /**
   * HSL颜色值转换为RGB.
   * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
   * h, s, 和 l 设定在 [0, 1] 之间
   * 返回的 r, g, 和 b 在 [0, 255]之间
   *
   * @param   Number  h       色相
   * @param   Number  s       饱和度
   * @param   Number  l       亮度
   * @return  Array           RGB色值数值
   */
  hslToRgb (h, s, l) {
    var r, g, b;
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      var hue2rgb = function hue2rgb(p, q, t){
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    this.rgb =  [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  /**
  * RGB 颜色值转换为 HSL.
  * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
  * r, g, 和 b 需要在 [0, 255] 范围内
  * 返回的 h, s, 和 l 在 [0, 1] 之间
  *
  * @param   Number  r       红色色值
  * @param   Number  g       绿色色值
  * @param   Number  b       蓝色色值
  * @return  Array           HSL各值数组
  */
  rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    console.log(h, s, l);
    this.hsl = [Number(h.toFixed(2)), Number(s.toFixed(2)), Number(l.toFixed(2))];
  }

  // 监听调色盘点击,并移动选色圆圈，修改两个输入框颜色
  addListenerBody () {
    // TODO: 不知道为什么点击圆圈的时候，e.offset 和 e.layer 等会突变
    let pickerBody = this.dom.querySelector('.color-picker-body')
    pickerBody.addEventListener('click', e => {
      const colorSelect = this.dom.querySelector('.color-picker-body-select')
      const x = Math.abs(e.clientX - pickerBody.offsetLeft - pickerBody.clientLeft)
      const y = Math.abs(e.clientY - pickerBody.offsetTop - pickerBody.clientTop)
      colorSelect.style.left = `${x - (colorSelect.clientWidth / 2)}px`
      colorSelect.style.top = `${y - (colorSelect.clientHeight / 2)}px`

      // const standDiagonal = Math.sqrt((Math.pow(standX, 2) + Math.pow(standY - 1, 2) - (Math.pow(standX + standY - 1, 2) / 2)) / 2)
      // 更新 亮度l
      const standX = x / window.getComputedStyle(this.dom.querySelector('.color-picker-body')).width.slice(0, -2)
      this.hsl[1] = Number(standX.toFixed(2))
      // 更新 饱和度s
      const standY = 1 - (y / window.getComputedStyle(this.dom.querySelector('.color-picker-body')).height.slice(0, -2))
      this.hsl[2] = Number(standY.toFixed(2))

      this.hslToRgb(...this.hsl)
      this.changeHSL()
      this.changeRGB()
      this.changeLabelColor()
    }, false)
  }

  // 监听调色柱点击，并移动选色圆圈，修改输入框颜色
  addListenerBar () {
    let pickerBar = this.dom.querySelector('.color-picker-bar')
    pickerBar.addEventListener('click', e => {
      const colorSelect = this.dom.querySelector('.color-picker-bar-select')
      let y = e.clientY - pickerBar.offsetTop - pickerBar.clientTop > 0 ? (e.clientY - pickerBar.offsetTop - pickerBar.clientTop) : 0
      y = y > pickerBar.clientHeight ? pickerBar.clientHeight : y
      colorSelect.style.top = `${y - (colorSelect.clientHeight / 2)}px`

      // 更改Hue
      this.hsl[0] = Number((y / pickerBar.clientHeight).toFixed(2))
      // 修改信息
      this.hslToRgb(...this.hsl)
      this.changeHSL()
      this.changeRGB()
      this.changeBodyColor()
      this.changeLabelColor()
    }, false)
  }
  // 监听 RGB 改变
  addListenerRgbChange () {
    let rgbInputs = Array.from(this.dom.querySelectorAll('.color-picker-rgb .color-picker-group input'))
    rgbInputs.forEach((node, index) => {
      node.addEventListener('change', e => {
        this.rgb[index] = Number(node.value)
        this.rgbToHsl(...this.rgb)
        console.log(this.rgb, this.hsl);
        this.changeHSL()
        this.changeRGB()
        this.changeBodyColor()
        this.changeLabelColor()
        this.changeSelectPos()
      })
    })
  }
  // 监听 HSL 改变
  addListenerHSLChange () {
    let rgbInputs = Array.from(this.dom.querySelectorAll('.color-picker-hsl .color-picker-group input'))
    rgbInputs.forEach((node, index) => {
      node.addEventListener('change', e => {
        this.hsl[index] = Number(node.value)
        this.hslToRgb(...this.hsl)
        this.changeHSL()
        this.changeRGB()
        this.changeBodyColor()
        this.changeLabelColor()
        this.changeSelectPos()
      })
    })
  }
  // 改变 选色圈位置
  changeSelectPos () {
    let bodySelect = this.dom.querySelector('.color-picker-body-select')
    let barSelect = this.dom.querySelector('.color-picker-bar-select')
    let body = this.dom.querySelector('.color-picker-body')
    let bar = this.dom.querySelector('.color-picker-bar')

    barSelect.style.top = `${(this.hsl[0] * bar.clientHeight) - (barSelect.clientHeight / 2)}px`
    bodySelect.style.left = `${(this.hsl[1] * body.clientWidth) - (bodySelect.clientWidth / 2)}px`
    bodySelect.style.top = `${((1 - this.hsl[2]) * body.clientHeight) - (bodySelect.clientHeight / 2)}px`
  }
}
