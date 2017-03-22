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
        return ele.trim()
      })
      this.hsl = hsl
      this.changeHSL()

      // this.hsl = color
      // const hsl = this.color.slice(4, -1).split(',');
      // [this.h, this.s ,this.l] = hsl.map(ele => {
      //   return Number(ele)
      // })
      // let hslDoms = Array.from(this.dom.querySelectorAll('.color-picker-hsl .color-picker-group input'))
      // hslDoms.forEach(dom => {
      //   let id = dom.id.slice(-1)
      //   dom.value = this[id]
      // })
    } else {

    }
    this.changeBodyColor()
    this.initBar()
    this.addListenerBody()
    this.addListenerBar()
  }
  /*
  修改 调色盘
  */
  changeBodyColor () {
    this.dom.querySelector('.color-picker-color').style.background = `hsl(${this.hsl[0]},100%,50%)`
    console.log(1);
  }
  /*
  修改颜色
  接受 hsl 参数颜色， 并修改其余表现
  */
  changeHSL () {
    let hslDoms = Array.from(this.dom.querySelectorAll('.color-picker-hsl .color-picker-group input'))
    hslDoms.forEach((dom, index) => {
      dom.value = Number(this.hsl[index])
    })
  }
  /*
  修改颜色
  接受 rgb 参数颜色
  */
  changeRGB (rgb) {

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
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
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
    return [h, s, l];
  }
  /*
  初始化 bar (色环)
  */
  initBar () {
    let barStyle = `linear-gradient(to bottom`
    for (let i = 0; i <= 360; i += 10) {
      barStyle += `, hsl(${i}, 100%, 50%)`
    }
    barStyle += ')'
    this.dom.querySelector('.color-picker-bar').style.background = barStyle
  }
  /*
  监听调色盘点击,并移动选色圆圈
  返回点击的颜色 (string)
  */
  addListenerBody () {
    // TODO: 不知道为什么点击圆圈的时候，e.offset 和 e.layer 等会突变
    let pickerBody = this.dom.querySelector('.color-picker-body')
    pickerBody.addEventListener('click', e => {
      const colorSelect = this.dom.querySelector('.color-picker-body-select')
      console.log(e);
      const x = Math.abs(e.clientX - pickerBody.offsetLeft - pickerBody.clientLeft)
      const y = Math.abs(e.clientY - pickerBody.offsetTop - pickerBody.clientTop)
      colorSelect.style.left = `${x - (colorSelect.clientWidth / 2)}px`
      colorSelect.style.top = `${y - (colorSelect.clientHeight / 2)}px`

      // 拿到百分比位置
      const standX = x / window.getComputedStyle(this.dom.querySelector('.color-picker-body')).width.slice(0, -2)
      const standY = 1 - (y / window.getComputedStyle(this.dom.querySelector('.color-picker-body')).height.slice(0, -2))
      const standDiagonal = Math.sqrt((Math.pow(standX, 2) + Math.pow(standY - 1, 2) - (Math.pow(standX + standY - 1, 2) / 2)) / 2)
      if (standDiagonal > 0.5) {

      } else {

      }

    }, false)
  }

  /*
  监听调色柱点击
  更改 Hue
  */
  addListenerBar () {
    let pickerBar = this.dom.querySelector('.color-picker-bar')
    pickerBar.addEventListener('click', e => {
      const colorSelect = this.dom.querySelector('.color-picker-bar-select')
      let y = e.clientY - pickerBar.offsetTop - pickerBar.clientTop > 0 ? (e.clientY - pickerBar.offsetTop - pickerBar.clientTop) : 0
      y = y > pickerBar.clientHeight ? pickerBar.clientHeight : y
      colorSelect.style.top = `${y - (colorSelect.clientHeight / 2)}px`

      // 更改Hue
      this.hsl[0] = Math.round((y / pickerBar.clientHeight) * 360)
      this.changeHSL()
      this.changeBodyColor()
    }, false)
  }
  /*
  监听 RGB 与 HSL 改变
  */
  addListenerChange () {

  }

}
