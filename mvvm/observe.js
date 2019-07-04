class Observe{
    constructor(data){
        this.observe(data)
    }
    observe(data){
        if(!data || typeof data !== 'object'){
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data,key,data[key]) // 给data 的每个属性添加响应式
            this.observe(data[key]) // 深度挟持
        })
    } 
    defineReactive(object,key,value){
        let _this = this
        let dep = new Dep() //实例化一个订阅对象
        Object.defineProperty(object,key,{
            enumerable:true,
            configurable:true,
            get:function(){
                if(Dep.target){
                    dep.addSub() // 添加订阅
                }
                return value
            },
            set:function(newVal){
                _this.observe(newVal) // 深度挟持
                value = newVal
                dep.notify() // 通知订阅者
            }
        })
    }
}