class MVVM{
    constructor(options){
        this.$el = options.el
        this.$data = options.data
        if(this.$el){
            new Observe(this.$data) // 数据挟持
            this.proxyData(this.$data) //代理$data在实例上
            new Compile(this.$el) //编译模板
        }
    }

    proxyData(data){ // 代理data 属性
        Object.keys(data).forEach(key => {
            Object.defineProperty(this,key,{
                get:function(){
                    return data[key]
                },
                set:function(newVal){
                    data[key] = newVal
                }
            })
        })
    }
}