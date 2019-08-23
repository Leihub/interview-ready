function updateChildren(vnode,newVnode){
    var children = vnode.children || []
    var newChildren = newVnode.children || []
    children.forEach(function(childVnode,index){
        var newChildVnode = newChildren[index]

        if(childVnode.tag === newChildVnode.tag){
            updateChildren(childVnode,newChildVnode)
        }else{
            replaceNode(childVnode,newChildVnode)
        }
    })
}

function replaceNode(vnode,newVnode){
    var elem = vnode.elem // 真实的dom节点
    var newElem = createElement(newVnode)


}\