// 常见闭包+定时器问题
/*
    for(var i=0; i<5;i++){
        setTimeout(()=>{
            console.log(new Date(),i);
        },1000)
    }
    console.log(new Date(),i);
 */

//结果：先执行到i=5 然后执行外部的log 然后内部定时器同时执行
//打印5,0,1,2,3,4 方法 
/*
function timeLog(i){
    setTimeout(() =>{
        console.log(new Date(),i);
    },1000)
}
for(var i=0;i<5;i++){
    timeLog(i)
}
console.log(new Date(),i);
*/

//结果：先执行到i=5 然后执行外部的log 然后内部定时器同时执行但是i 是每次传入进函数的i 值 分别为0,1,2,3,4,

// 每一秒打印0,1,2,3,4,5 方法
// 版本1 定时器方法
/*
function timeLog(i){
    setTimeout(() =>{
        console.log(new Date(),i);
    },1000*i)
}
for(var i=0;i<5;i++){
    timeLog(i)
}
setTimeout(() =>{
    console.log(new Date(),i);
},1000*i)
*/

// 版本2 promise 版本
/*
var task = []
function timeLog(j){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log(new Date(),j);
            resolve()
        },j*1000)
    })
}
for(var i=0;i<5;i++){
    task.push(timeLog(i))
}
Promise.all(task).then(()=>{
    setTimeout(() => {
        console.log(new Date(),i);
    },1000)
})
*/

//版本3 async 版本
/*
async function timeLog(j){
    await setTimeout(() => {
        console.log(new Date(),j);
    },j*1000)
}

for(var i=0;i<5;i++){
    timeLog(i)
}
timeLog(i)
*/
// 改良写法 
const sleep = (msTime) => {
    return new Promise((resolve,reject) => {
        setTimeout(()=>{resolve()},msTime)
    })
}
(async () => {
    for(var i=0;i<5;i++){
        await sleep(1000)
        console.log(new Date(),i);
    }

    await sleep(1000)
    console.log(new Date(),i);
})()

// 事件循环机制
// 浏览器事件循环机制 异步任务执行机制：（主线程执行完同步任务后不断check在调读取消息队列里面的任务，如果有等待任务就执行）
//1.分为主线程（执行栈）和任务队列 2.异步任务执行结束会往任务队列上push回调，只有等执行栈上的同步任务执行完了才会去读取任务队列 
// node 事件循环机制：  （v8 引擎解析js，调用node api 把事件队列给不同的执行栈）
//node 里面有主线程（v8引擎），事件队列、执行栈（事件队列和执行站是libv库里面的）。event loop 主要是事件队列和执行栈之间 事件队列解析不同的事件到执行栈里面去，然后执行结束后
//返回 结果给事件队列 ，事件队列返回给主线程







