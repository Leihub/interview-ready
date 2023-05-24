function reactive(target = {}) {
    //只有对象跟数组才能响应式
    if (typeof target !== 'object' || target == null) {
        return target
    }

    const proxyConfig = {
        get: function (target, key, receiver) {
            // 只对自身属性进行监听
            if (Reflect.ownKeys(target).includes(key)) {
                console.log('get', key); // 监听getter
            }
            const result = Reflect.get(target, key, receiver)
            console.log('resutl',result);
            // 深度监听
            // 性能如何优化？
            // 只有在访问属性的时候才做响应式，object definedProperty 是在初始化的时候一次性递归。
            return reactive(result)
        },
        set: function (target, key, val, receiver) {
            // 不重复修改
            if (val === target[key]) {
                return true
            }
            // 判断是新增属性还是原有属性
            if(Reflect.ownKeys(target).includes(key)){
                console.log('已有属性',key);
            }else{
                console.log('新增属性',key);
            }
            console.log('set', key, val);
            const result = Reflect.set(target, key, val, receiver)
            console.log('result', result);
            return result // 设置结果
        },
        deleteProperty: function (target, key) {
            const result = Reflect.defineProperty(target, key)
            console.log('delete property', key);
            console.log('result', result);
            return result // 删除结果
        }
    }

    const observed = new Proxy(target, proxyConfig)
    return observed
}


const data = {
    age: 20,
    name: 'xiao',
    info:{
        ad:'1212'
    }
}
// 如何进行深度监听
// 如果判断是新增属性删除属性
// 性能如何优化

const proxyData = reactive(data)