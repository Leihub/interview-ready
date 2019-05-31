function Promise(fn){
    var self = this

    this.state = 'pengding'
    this.value = null
    this.callbacks = [] //回调函数数组
    this.then = function(onFulfilled){
        return new Promise(function(resolve){
            handleCallback({
                onFulfilled:onFulfilled || null,
                resolve: resolve
            })
        })
    }
    function handleCallback(callback){
        if(self.state === 'pending'){
            self.callbacks.push(callback); return;
        }

        var res = callback.onFulfilled(self.value)
        callback.resolve(res)
    }
    function resolve(value){
        self.value = value
        self.state = 'fulfilled'
        setTimeout(function(){
            self.callbacks.forEach(function(callback){
                handleCallback(callback)
            })
        },0)
    }

    fn(resolve)
}
function getUserId(){
    return new Promise(function(resolve){
        setTimeout(()=>{
            resolve(223)
        },10)
    })
}
var a = new Promise(function(resolve) {
    setTimeout(()=>{
        resolve(1)
    },10)
})

a.then(x => {
    console.log(x);
    return x+1;
}).then(x => console.log(x))

// setTimeout(function(){
//     a.then(x => console.log(x+1))
// }, 1000);

// getUserId().then(x => console.log(x))
// setTimeout(function(){
//     getUserId().then(x => console.log(x+1))
// }, 1000);

