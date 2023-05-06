// for(var i = 0; i< 5; i++){
//     setTimeout(function() {
//         console.log(new Date(),i);
//     }, 1000);
// }
// console.log(new Date(),i); // 表现为马上打印5，隔一秒后一次性打印5次5


// 如何让按照每次打印是5 -> 0,1,2,3,4， 马上打印5，隔一秒后一次性依次打印0，1，2，3，4
// 方法一：利用立即执行函数，将参数传递进去
// for(var i = 0;i<5;i++){
//     (function(j){
//         setTimeout(() => {
//             console.log(new Date(),j);
//         }, 1000);
//     }
//     )(i)
// }
// console.log(new Date(),i);

// 方法二：利用setTimeout的参数直接传给回调函数
// for(var i = 0;i<5;i++){
//     setTimeout(function(j){
//         console.log(new Date(),j);
//     },1000,i)
// }

// console.log(new Date(),i);
// 方法三：利用js基本类型是按值传递
// function output(i){
//     setTimeout(function(){
//         console.log(new Date(),i);
//     },1000)
// }
// for(var i = 0;i<5;i++){
//     output(i) // 这里传入的i被复制了
// }
// console.log(new Date(),i);


// 新需求，要求按照0 -> 1 -> 2 -> 3 -> 4 -> 5，即隔每秒打印012345
// 方法一：立即执行函数解法
// for(var i=0;i<5;i++){
//     (function(j){
//         setTimeout(() => {
//             console.log(new Date(),j);
//         }, j*1000);
//     })(i)
// }
// setTimeout(function(){
//     console.log(new Date(),i);
// },i*1000)

// 方法二：promise 方法
// var task = []  // 存放所有的promise
// var output = function(i){
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log(new Date(),i);
//             resolve()
//         }, 1000*i);
//     })
// }

// for(var i=0;i<5;i++){
//     task.push(output(i))
// }

// Promise.all(task).then(() =>{
//     setTimeout(() => {
//         console.log(new Date(),i);
//     },1000)
// })

// 方法三：await 方法


const sleep = (timeoutMs) => new Promise(resolve => {
    setTimeout(resolve, timeoutMs);
})

console.log('1221212');
(async () => {
    for(var i = 0;i < 5;i++){
        if(i > 0){
            await sleep(1000)
        }
        console.log(new Date(),i);
    }
    await sleep(1000)
    console.log(new Date(),i);
})()

