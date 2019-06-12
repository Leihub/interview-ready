### dom事件的级别：
DOM0：element.onclick = fn
DOM2:element.addEventListener('click',fn,false) 使用addEventListener 注册事件
DOM3:element.addEventListener('keyup',fn,false) 增加事件类型
### dom事件模型：
捕获，冒泡
### dom事件流：
捕获 -> 目标阶段 -> 冒泡

### 描述dom事件捕获的具体流程：
window -> document -> html -> body -> ... -> 目标元素
冒泡反方向往上回传
### event 对象的常见应用：
event.preventDefault() 阻止默认事件
event.stopPropagation() 阻止冒泡
event.stopImmediatePropagation() 
event.currentTarget()：当前所绑定的事件对象
event.target()：当前被点击的元素
事件委托：通过事件代理把事件绑定在父级元素上，通过event.target 获取当前点击的元素，event.currentTarget  此时就是父级元素。常见操作，给一百个li节点绑定事件，新增li标签无法绑定事件。可通过事件委托解决。
### 自定义事件：
1. 使用new Event('custom') 或者 new CustomEvent('custom',obj)
2. 通过addEventListener('custom',fn) 绑定事件
3. 通过dispatchEvent 执行事件。

