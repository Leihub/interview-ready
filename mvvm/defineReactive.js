function defineReactive(obj,key,value){
    let _this = this
    let dep = new Dep()

    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get:function(){
            if(Dep.target){ // 如果存在watcher 的target 存在就加入订阅中
                dep.addSubs(Dep.target)
                return value
            }
        },
        set:function(newVal){
            if(newVal !== value){
                _this.observe(newVal) // 深度挟持
                value = newVal
                dep.notify() // 通知视图更新
            }
        }
    })
    
}