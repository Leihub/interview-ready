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
  initComputed.call(this)

  new Compile(options.el, this)

  options.mounted && options.mounted.call(this)
}

function Observe(data) {
  let dep = new Dep()
  for (let key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperty(data, key, {
      configurable: true,
      get() {
        Dep.target && dep.addSub(Dep.target)  //将watcher 添加到订阅事件中【watcher】
        return val
      },
      set(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        observe(newVal)
        dep.notify() // 通知视图更新
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

  function replace(frag) {
    Array.from(frag.childNodes).forEach(node => {
      console.log('node',node);
      
      let txt = node.textContent
      let reg = /\{\{(.*?)\}\}/g

      if (node.nodeType === 3 && reg.test(txt)) {
        console.log(RegExp.$1)

        let arr = RegExp.$1.split('.')

        console.log(arr,vm);
        
        let val = vm
        arr.forEach(key => {
          val = val[key]
          console.log('val',val,key);
        })
        console.log('arr',arr);
        node.textContent = txt.replace(reg, val).trim()
        // 监听变化
        new Watcher(vm, RegExp.$1, newVal => {
          node.textContent = txt.replace(reg, newVal).trim()
        })
      }
      node.addEventListener('input', (e) => {
        let val = e.target.value
        vm[exp] = val
      })
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }
  console.log('before fragment', fragment);
  replace(fragment)
  console.log('after fragment', fragment);
  vm.$el.appendChild(fragment)
}


function Dep() {
  this.subs = []
}
Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

function Watcher(vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  Dep.target = this
  console.log(exp);
  
  let arr = exp.split('.')
  let val = vm
  arr.forEach(key => {
    val = val[key]
  })
  Dep.target = null
}
Watcher.prototype.update = function () {
  this.fn()
  let arr = this.exp.split('.')
  let val = this.vm
  arr.forEach(key => {
    val = val[key]
  })
  this.fn(val)
}

// let watcher = new Watcher(() => { console.log(1111) })
// let dep = new Dep()
// dep.addSub(watcher)
// dep.addSub(watcher)
// dep.notify()


function initComputed() {
  let vm = this
  let computed = this.$options.computed
  if(!computed) return
  Object.keys(computed).forEach(key => {
    Object.defineProperty(vm, key, {
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set() { }
    })
  })
}