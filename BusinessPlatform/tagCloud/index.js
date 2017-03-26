class tagCloud {
  constructor ({
    dom,
    tags = [],
    padding = 50,
    baseSpeed= 1
  }) {
    this.dom = dom
    this.tags = tags
    this.options = {
      padding: padding,
      baseSpeed: baseSpeed
    }
    this.rotate = {
      needRotate: false,
      speedX: 0,
      speedY: 0
    }
    this.init()
    this.updatePosition()
    this.addListenerMouse()
  }

  init () {
    const RADIUS = this.getRadius()
    // 找出最大最小项
    let data = this.tags.map(tag => {
      return tag.data
    })
    let maxData = Math.max(...data)
    let minData = Math.min(...data)
    // 准备数据
    let html = ''
    this.tags.forEach((tag, index, tags) => {
      // 计算角度
      let i = Math.acos(- 1 + (2 * (index + 1) - 1) / tags.length)
      let j = i * Math.sqrt(tags.length * Math.PI)
      // 设置位置 x, y, z
      let x = RADIUS * Math.sin(i) * Math.cos(j)
      let y = RADIUS * Math.sin(i) * Math.sin(j)
      let z = RADIUS * Math.cos(i)
      tag.position = [x, y, z]
      // let scale = (tag.position[2] / RADIUS + 1) / 4 + 0.5 // 范围 0.5 - 1
      let scale = ((tag.data - minData) / (maxData - minData)) + 0.5
      tag.fontSize = scale * 20
      tag.opacity = (tag.position[2] / RADIUS + 1) * 4 / 10 + 0.2 // 范围 0.2 - 1
      tag.zIndex = parseInt(scale * 100)

      html += `<span class="tag" style="font-size: ${tag.fontSize}px;display: inline-block">${tag.name}</span>`
    })
    this.dom.innerHTML = html
  }

  updatePosition () {
    setInterval(() => {
      const RADIUS = this.getRadius()
      this.dom.querySelectorAll('#tag-cloud .tag').forEach((tag, index) => {
        tag.style.left = `${RADIUS + this.options.padding + this.tags[index].position[0] - tag.clientWidth / 2}px`
        tag.style.top = `${RADIUS + this.options.padding+ this.tags[index].position[1] - tag.clientHeight / 2}px`
        tag.style.opacity = this.tags[index].opacity
        tag.style.zIndex = this.tags[index].zIndex
      })
      this.rotateX()
      this.rotateY()
    }, 17)
  }

  addListenerMouse () {
    this.dom.addEventListener('mousemove', e => {
      this.rotate.needRotate = true
      const RADIUS = this.getRadius()
      let y = e.clientX - this.dom.offsetLeft - this.dom.clientLeft - (RADIUS + this.options.padding)
      let x = e.clientY - this.dom.offsetTop - this.dom.clientTop - (RADIUS + this.options.padding)
      this.rotate.speedX = x * 0.0001 * this.options.baseSpeed
      this.rotate.speedY = y * 0.0001 * this.options.baseSpeed
    })
    this.dom.addEventListener('mouseleave',e => {
      this.rotate.needRotate = false
      console.log(1);
    })
  }

  rotateX () {
    let cos, sin
    const RADIUS = this.getRadius()
    if (this.rotate.needRotate) {
      cos = Math.cos(this.rotate.speedX)
      sin = Math.sin(this.rotate.speedX)
    } else {
      if (this.rotate.speedX >= 0){
        this.rotate.speedX = this.rotate.speedX >= (0.0002  * this.options.baseSpeed) ? this.rotate.speedX - (0.0002  * this.options.baseSpeed) : 0
      } else {
        this.rotate.speedX = this.rotate.speedX <= (0.0002  * this.options.baseSpeed) ? this.rotate.speedX + (0.0002  * this.options.baseSpeed) : 0
      }
      cos = Math.cos(this.rotate.speedX)
      sin = Math.sin(this.rotate.speedX)
    }
    this.tags.forEach(tag => {
      let newY = tag.position[1] * cos - tag.position[2] * sin
      let newZ = tag.position[2] * cos + tag.position[1] * sin
      tag.position = [tag.position[0], newY, newZ]
      tag.opacity = (tag.position[2] / RADIUS + 1) * 4 / 10 + 0.2 // 范围 0.2 - 1
    })
  }

  rotateY () {
    let cos, sin
    const RADIUS = this.getRadius()
    if (this.rotate.needRotate) {
      cos = Math.cos(this.rotate.speedY)
      sin = Math.sin(this.rotate.speedY)
    } else {
      if (this.rotate.speedY >= 0){
        this.rotate.speedY = this.rotate.speedY >= (0.0002  * this.options.baseSpeed) ? this.rotate.speedY - (0.0002  * this.options.baseSpeed) : 0
      } else {
        this.rotate.speedY = this.rotate.speedY <= (0.0002  * this.options.baseSpeed) ? this.rotate.speedY + (0.0002  * this.options.baseSpeed) : 0
      }
      cos = Math.cos(this.rotate.speedY)
      sin = Math.sin(this.rotate.speedY)
    }
    // console.log(this.rotate.speedY);
    this.tags.forEach(tag => {
      let newX = tag.position[0] * cos - tag.position[2] * sin
      let newZ = tag.position[2] * cos + tag.position[0] * sin
      tag.position = [newX, tag.position[1], newZ]
      tag.opacity = (tag.position[2] / RADIUS + 1) * 4 / 10 + 0.2 // 范围 0.2 - 1
    })
  }

  getRadius () {
    return (this.dom.clientWidth > this.dom.clientHeight ? this.dom.clientHeight / 2 - this.options.padding : this.dom.clientWidth / 2 - this.options.padding)
  }
}
