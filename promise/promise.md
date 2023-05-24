#### promise 基本概念：
promise 三种状态：
1.pending 等待态
2.fulfiled 成功态
3.rejected 失败态
#### promise 解决的问题：
1.回调地狱，代码更好维护
2.promise 可以支持多个并发请求，获取并发请求中的数据。
promise 用解决异步问题本身不是异步的。

#### all
promise all() 用于多个并发请求，接受一个数组，等所有的请求完成后才执行最后的回调
```
function promise1(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('2s')
        }, 2000);
    })
}
function promise2(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('5s')
        }, 5000);
    })
}

Promise.all([promise1(),promise2()]).then(res => {
    console.log(res) // 5s后打印【2s,5s】
})
```

#### race方法
race 接受一个数组，谁先执行完 回调就的数据就是谁的。
```
function promise1(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('2s')
        }, 2000);
    })
}
function promise2(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('5s')
        }, 5000);
    })
}

Promise.race([promise1(),promise2()]).then(res => {
    console.log('res',res);  // 2s打印2s
})
```

race 常用场景：给某个异步请求设置超时时间，并在超时后执行相应的操作。
```
function requestImg(){
    return new Promise((resolve,reject) => {
        var img = new Image()
        img.onload = function(){
            resolve(img)
        }
        img.src = '路径'
    })
}

function timeout(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            reject('图片请求超时')
        },5000)
    })
}

Promise.race([requestImg(),timeout()]).then(data => {
    console.log(data)  // 5s如果拿不到图片 则进入timeout 回调 走入catch 
}).catch(err => {
    console.log(err)
})

```

#### 构建promise
步骤一：实现成功和失败的回调方法
```
class Promise{
    constructor(excutor){
        this.status = 'pending'
        this.value = undefined
        this.reason = undefined

        // 存放成功的回调
        this.onResolvedCallbacks = []

        // 存放失败的回调
        this.onRejectedCallbacks = []

        let resolve = (data) => {
            if(this.status === 'pending'){
                this.value = data
                this.status = 'resolved'
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        let reject = (reason) => {
            if(this.status === 'pending'){
                this.reason = reason
                this.status = 'rejected'
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }


        try{
            excutor(resolve,reject)
        }catch{
            reject(e)
        }
    }
}
```

步骤二：then 方法链式调用
then方法接受两个参数，成功回调跟失败回调。
```
then(onFulFilled,onRejected){
    if(this.status === 'resolved'){
        this.onFulFilled(this.value)
    }
    if(this.status === 'rejected'){
        onRejected(this.reason)
    }
}
```

如果在pending 状态可以把 成功的回调结果或者失败的回调结果放入数组中,多次调用then 的异步函数需要放在数组里面然后执行。
```
then(onFulFilled,onRejected){
    if(this.status === 'resolved'){
        onFulFilled(this.value)
    }
    if(this.status === 'rejected'){
        onRejected(this.reason)
    }

    if(this.status === 'pending'){
        this.onFulFilledCallbacks.push(() => {
            onFulFilled(this.value)
        })

        this.onRejectedCallbacks.push(() => {
            onRejected(this.reason)
        })
    }
}

```

