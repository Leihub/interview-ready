class Dep{
    constructor(){
        this.subs = []
    }
    addSub(watcher){
        this.subs.push(watcher)
    }
    notity(){
        this.subs.forEach(watcher => watcher.update())
    }
}