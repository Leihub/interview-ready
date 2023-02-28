function getGlobalThis() {
    return this
}

Function.prototype.applyFn = function apply(thisArg, argArray) {
    // 如果使用者不是一个函数报错
    if (typeof this !== 'function') {
        throw Error()
    }
    // 如果没有传入参数则初始化为[]
    if (argArray == null || argArray == undefined) {
        argArray = []
    }

    //如果this 不是一个对象报错
    if (thisArg !== new Object(thisArg)) {
        throw Error
    }
    // 非严格模式下如果thisArg 传入null 或者undefined 则设置为全局this
    if (thisArg == null || thisArg == undefined) {
        thisArg = getGlobalThis()
    }
    thisArg = new Object(thisArg)
    // 新增私有方法名（缺点thisArg内的属性可能重名,在删除的时候会删除掉，）
    // (解决方案：先储存一份，然后判断thisArg 是否本来就包含该属性，最后删除掉之后再根据是否包含恢复原始属性)
    let _fn = '_fn'

    let _fn = '_' + new Date().getTime()
    let originalVal = thisArg[_fn]
    let hasOriginalVal = thisArg.hasOwnProperty(_fn)

    // 在thisArg 上新增绑定的方法
    thisArg[_fn] = this
    // 传入参数调用该方法
    let result = thisArg[_fn](...argArray)
    // 调用后删除该方法
    delete thisArg[_fn]

    if (hasOriginalVal) {
        thisArg[_fn] = originalVal
    }
    // 返回执行的结果
    return result
}

Function.prototype.callFn = function call(thisArg) {
    let argArray = []
    let argumentsLen = arguments.length

    for (let i = 0; i < argumentsLen - 1; i++) { 
        argArray[i] = arguments[i + 1]
    }

    return this.applyFn(thisArg,argArray)
}