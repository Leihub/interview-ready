class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm

        if(this.el){
            let fragment = this.node2Fragment(this.el)

            this.compile(fragment) //编译生成的文档树

            this.el.appendChild(fragment) // 当插入fragment 会把原有节点全部替换掉
        }
    }
    isElementNode(node){
        return node.nodeType === 1 
    }
    isDirective(node){
        return node.includes('v-') 
    }
 
    node2Fragment(el){  
        let fragment = document.createDocumentFragment()

        let firstNode

        while(firstNode = el.firstNode){
            fragment.appendChild(firstNode)
        }
        return fragment
    }

    compile(fragment){
        let childNodes = fragment.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isElementNode(node)){
                this.compile(node)
                this.compileNode(node)
            }else{
                this.compileText(node)
            }
        })
    }
    // 编译元素节点
    compileNode(node){
        let attrs = node.attributes

        Array.from(attrs).forEach(attr => {
            let attrName = attr.name
            if(this.isDirective(attrName)){  // 指令
                let exp = attr.value
                let [, type] = attrName.split('-')
                CompileUtil[type](node,this.vm,exp) 
            }
        })
    }
    // 编译文本节点
    compileText(node){
        let exp = node.contentText

        let reg = /\{\{([^}+])\}\}/g

        if(reg.test(exp)){
            CompileUtil['text'](node,this.vm,exp) // 辅助编译{{}}
        }
    }
}