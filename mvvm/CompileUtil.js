let compileUtil = {}

compileUtil.update = {
    //更新文本
    textUpdater(node,value){
        node.contentText = value
    },
    //更新输入框
    modelUpdater(node,value){
        node.value = value
    }
}

compileUtil.getVal = function(vm,exp){
    let vals = exp.split('.')

    return vals.reduce((prev,next) => {
        return prex[next]
    },vm.$data)
}
compileUtil.getTextVal = function(vm,exp){
    let reg = /\{\{([^}+])\}\}/g
    return exp.replace(reg, (...arg) => {
        return this.getVal(vm,arg[1])
    })
}
compileUtil.setVal = function(vm,exp,newVal){
    exp = exp.split('.')
    exp.reduce((prev,next,currentIndex) =>{
        if(currentIndex === exp.length - 1){
            return prve[next] = newVal
        }
        return prev[next]
    },vm.$data)
}
compileUtil.model = function(node,vm,exp){
    let updateFn = this.update['modelUpdater']
    let value = this.getVal(vm,exp)
    new Watcher(vm,exp,newVal => {
        updateFn && updateFn(node,newVal)
    })
    node.addEventListener('input',(e)=>{
        let newVal = e.target.value
        this.setVal(vm,exp,newVal)
    })
    updateFn && updateFn(node,value)
}
compileUtil.text = function(node,vm,exp){
    let updateFn = this.update['textUpdater']
    let value = this.getVal(vm,exp)
    exp.replace(/\{\{([^{+])\}\}/g,(...args) => {
        new Watcher(vm,args[1],newVal => {
            updateFn && updateFn(node,newVal)
        }) 
    })
    updateFn && updateFn(node,value)

}