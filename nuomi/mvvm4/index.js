class Vue {
  constructor ({ el, data }) {
    this.el = document.querySelector(el)
    this.data = data
    this.render()
  }
  render () {
    const html = this.el.innerHTML
    let newHtml = html
    const mustache = html.match(/{{.*?}}/g)
    mustache.forEach(str => {
      const path = str.slice(2, -2).trim().split('.')
      let val = this.data
      path.forEach(key => val = val[key])
      newHtml = newHtml.replace(str, val)
    })
    this.el.innerHTML = newHtml
  }
}
