function newOperator(ctor) {
    let obj = Object.create(ctor.prototype)
    let args = [].slice.call(arguments,1)
    let ret = ctor.apply(obj,args)
    let isObject = typeof ret == 'object' && ret !== null
    let isFunc = typeof ret == 'function'
    if(isObject || isFunc){
        return ret
    } 
    return obj
}