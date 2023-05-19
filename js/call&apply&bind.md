### call 跟 apply 方法
1.每个函数都有两个非继承的方法call和apply
2.用途相同，都是在指定作用域执行函数
3.接收的参数不同，apply 的第一个参数是函数执行是的作用域（this），第二个是参数数组
4.call 的第一个参数相同，只是需要要函数的参数列举出来


### 基本原理
```
f.apply(o) =>  
o.m = f  // 将f 存储为o的临时方法
o.m()  // 调用它不传入参数
delete o.m  // 删除临时方法
```

### 实现apply 方法
模拟实现的第一步,不传入参数的apply方法
```
Function.prototype.applyOne = function(context){
    context.fn = this
    context.fn()
    delete context.fn
}
```

模拟实现的第二步，传入指定参数执行函数
```
Function.prototype.applyTwo = funtion(context){
    context.fn = this
    var args = arguments[1]
    context.fn(args.join(','))   // 错误示范，args.join(',')返回的是字符串
    delete context.fn
}
```
第二版修改为下：
```
Function.prototype.applyTwo = function(context){
    var args = arguments[1] // 获取传入的数组参数
    context.fn = this // 假想context 对象预先不存在名为fn 的属性
    var fnStr = 'context.fn('
    for(var i = 0;i<args.length;i++){
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'  // 得到"context.fn(arg1,arg2,arg3)"
    eval(fnStr) 
    delete context.fn  // 执行完毕删除临时方法
}
```

模拟第三步
1.this 可以传入null，或者不传 指向全局对象
2.函数可以有返回值

```
Function.prototype.applyThree = function(context){
    var context = context || window
    var args = arguments[1] // 获取传入的数组参数
    context.fn = this // 假想context 对象预先不存在名为fn 的属性

    if(args == undefined){  // 如果没传入参数 直接执行
        return context.fn()  
    }

    var fnStr = 'context.fn('
    for(var i = 0;i<args.length;i++){
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'  // 得到"context.fn(arg1,arg2,arg3)"
    var returnValue = eval(fnStr)  // 获得函数执行结果
    delete context.fn  // 执行完毕删除临时方法
    return returnValue // 返回函数执行结果
}
```
模拟第四步
假想context 对象预先不存在名为fn的属性不能保证。需要用symbol 来确定为唯一性.
symbol 是普通类型不是对象所以不能用new，对象的属性为symbol类型的不能用逗号表示。
js 基本数据类型有：undefined,null,number,string,boolean,symbol,object
```
Function.prototype.applyFour = function(context){
    var context = context || window
    var args = arguments[1] // 获取传入的数组参数
    var fn = Symbol()
    context[fn] = this // 假想context 对象预先不存在名为fn 的属性

    if(args == undefined){  // 如果没传入参数 直接执行
        return context[fn]()  
    }

    var fnStr = 'context[fn]('
    for(var i = 0;i<args.length;i++){
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'  // 得到"context[fn](arg1,arg2,arg3)"
    var returnValue = eval(fnStr)  // 获得函数执行结果
    delete context[fn]  // 执行完毕删除临时方法
    return returnValue // 返回函数执行结果
}
```
模拟第五步
如果不让symbol保证唯一性，使用随机数保证context不存在相同属性。
```
funtion randomSymbol(obj){
    var unique_proper = '00' + Math.random()
    if(obj.hasOwnProperty(unique_proper)){
        arguments.callee(obj)  // 如果存在此属性，递归调用，直到没有这个属性为止
    }else{
        return unique_proper
    }
}


Function.prototype.applyFive = function(context){
    var context = context || window
    var args = arguments[1] // 获取传入的数组参数
    var fn = Symbol()
    context[fn] = this // 假想context 对象预先不存在名为fn 的属性

    if(args == undefined){  // 如果没传入参数 直接执行
        return context[fn]()  
    }

    var fnStr = 'context[fn]('
    for(var i = 0;i<args.length;i++){
        fnStr += i == args.length - 1 ? args[i] : args[i] + ','
    }
    fnStr += ')'  // 得到"context[fn](arg1,arg2,arg3)"
    var returnValue = eval(fnStr)  // 获得函数执行结果
    delete context[fn]  // 执行完毕删除临时方法
    return returnValue // 返回函数执行结果
}
```


### 实现call 方法
call 方法唯一的不同就是参数不是一个数组。
```
Function.prototype.callOne = function(context){
    return this.applyFive(([].shift.call(arguments)),arguments) 
    call 的方法的arguments是[this,arg1,arg2....],所以直接用apply方法把this取出出来，剩下的数组就是传入apply的参数数组。
}
```


### 实现bind 方法


