// 更新视图
function updateView() {
    console.log('更新视图');
}

let oldArrayProperty = Array.prototype
// 创建新对象,原型指向指定对象,在上面拓展属性不会影响原来的原型
let arrProto = Object.create(oldArrayProperty);
['push','pop','shift','slice'].forEach(methodName => {
    arrProto[methodName] = function(){
        updateView()
        oldArrayPropertyp[methodName].call(this,...arguments)
    }
})

console.log('arrProto',arrProto);

 
// 重新定义属性，监听起来
function defineReactive(target, key, value) {
    // 对象属性是对象的需要监听，递归
    observe(target[key])

    Object.defineProperty(target,key,{
        get(){
            return value
        },
        set(newVal){
            if(newVal !== value){
                value = newVal

                updateView()
            }
        }
    })
}

// 监听对象属性
function observe(target) {
    if (typeof target !== 'object' || target === null) {
        return target
    }
    if(Array.isArray(target)){
        target.__proto__ = arrProto
    }

    for (let key in target) {
        defineReactive(target, key, target[key])
    }
}

let data = {
    age:21,
    name:'kelo',
    address:{
        first:'12212'
    },
    nums:[1,2,3,4]
}
observe(data)

data.age = 12
data.address.first = '2222'
data.x = 222

// object.defineProperty 缺点
// 1.对象属性过多需要一次性递归深层遍历
// 2.属性的删除新增不能监听 需要用vue.set,vue.delete
// 3.无法原生监听数组,需要特殊处理
