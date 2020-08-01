function Mvvm(options = {}) {
  this.$options = options

  let data = this._data = this.$options.data
  // 数据挟持
  observe(data)
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get() {
        return this._data[key]
      },
      set(newVal) {
        this._data[key] = newVal
      }
    })
  }
}

function Observe(data) {
  for (let key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperty(val, key, {
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        observe(newVal)
      }
    })
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return
  return new Observe(data)
}

function Compile(el, vm) {
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()

  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }

  function replace(frag){
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent
      let reg = /\{\{(.*?)\}\}/g

      if(node.nodeType === 3 && reg.test(txt)){
        console.log(RegExp.$1)

        let arr = RegExp.$1.split('.')
        let val = vm
        arr.forEach(key => {
          val = val[key]
        })

        node.textContent = txt.replace(reg,val).trim()
      }

      if(node.childNodes && node.childNodes.length){
        replace(node)
      }
    })
  }

}