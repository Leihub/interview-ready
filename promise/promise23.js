class Promise2{
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
        }catch(err){
            reject(err)
        }
    }

    then(onFulFilled,onRejected){
        // console.log('onFulFilled',onFulFilled,this.value);
        if(this.status === 'resolved'){
            onFulFilled(this.value)
        }
        if(this.status === 'rejected'){
            onRejected(this.reason)
        }

        if(this.status == 'pending'){
            this.onResolvedCallbacks.push(() => {
                onFulFilled(this.value)
            })

            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
            
        }
        
    }
    
}


let p = new Promise2(function(resolve){
    resolve('我是成功')
})

p.then(data => {console.log(data)},err => {}).then(data => {console.log(data)},err => {})
// p.then(data => {console.log(data)},err => {})
// p.then(data => {console.log(data)},err => {})
