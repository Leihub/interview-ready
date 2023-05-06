// 给对象使用for of 方法
// es5 本来对数组循环使用for，对对象使用for in 。es6中新增for of 迭代map set 等有iterator属性的。所以要对对象使用for of 方法需要在对象的原型对象上添加iterator
function objectIterator(){
    const keys = Object.keys(this)
    let index = 0
    return {
        next:() => {
            const done = index >= keys.length
            const value = done ? undefined : this[keys[index]]
            index++
            return{
                done,
                value
            }
        }
    }
}

Object.prototype[Symbol.iterator] = objectIterator
const obj = {
    key:'1',
    value:'2'
}

for(const iterator of obj){
    console.log(iterator);
}
console.log([...obj]);