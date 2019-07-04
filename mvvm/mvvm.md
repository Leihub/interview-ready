### mvvm 的关键点
compile 编译模板
observe 数据挟持
watcher 模板和数据之间的纽带
dep 数据挟持中订阅和派发之间的纽带 
### observe 
把data的每个属性变为响应式对象，通过defineReactive  -> 通过设置defineProperty 设置setter 和getter ，getter 做依赖收集 dep.addSub()，setter 做派发任务，通知所有订阅者更新，dep.notify() ->
Dep 就是一个订阅者数组，内部有静态属性target 是当前的watcher ，addsub 就是把watcher 加入数组中，notify 则是把订阅数组中的每个watcher 执行update 方法。 -> watcher