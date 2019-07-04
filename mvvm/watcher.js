class Watcher{
    constructor(vm,exp,callback){
        this.vm = vm
        this.exp = exp
        this.callback = callback

        this.value = this.get() // 更改前的值
    }
    get(){
        // 将当前的 watcher 添加到 Dep 类的静态属性上
        Dep.target = this
        let value = compileUtil.getVal(this.vm,this.exp)
        // 清空 Dep 上的 Watcher，防止重复添加
        Dep.target = null
        return value
    }
    update(){
        let newVal = compileUtil.getVal(this.vm,this.exp) // 获取新值
        let oldVal = this.value
        
        if(newVal !== oldVal){
            this.callback && this.callback()
        }

    }
}