// proxy 的基本使用
// const data = {
//     a:'1',
//     b:'2'
// }
const data = ['a','b']

const proxyData = new Proxy(data, {
    get: function (target, key, receiver) {
        // 只对自身属性进行监听
        if(Reflect.ownKeys(target).includes(key)){    
            console.log('get',key); // 监听getter
        }   
        const result = Reflect.get(target,key,receiver)
        return result 
    },
    set: function (target, key, val, receiver) {
        // 不重复修改
        if(val === target[key]){
            return true
        } 
        console.log('set',key,val);
        const result = Reflect.set(target,key,val,receiver)
        console.log('result',result);
        return result // 设置结果
    },
    deleteProperty: function (target, key) {
        const result = Reflect.defineProperty(target,key)
        console.log('delete property',key);
        console.log('result',result);
        return result // 删除结果
    }
})