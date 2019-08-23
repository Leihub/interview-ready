with(this) {
    return _c('div', {
        attrs: {
            "id": "app"
        }
    }, [_c('input', {
        directives: [{
            name: "model",
            rawName: "v-model",
            value: (item),
            expression: "item"
        }],
        attrs: {
            "type": "text"
        },
        domProps: {
            "value": (item)
        },
        on: {
            "input": function ($event) {
                if ($event.target.composing) return;
                item = $event.target.value
            }
        }
    }), _v(" "), _c('button', {
        on: {
            "click": handleClick
        }
    }, [_v("submit")]), _v(" "), _c('ul', _l((list), function (item) {
        return _c('li', [_v(_s(item))])
    }))])
}

/**
 * vue2.0 开始支持预编译
 * 开发环境：写模板
 * 编译打包
 * 生成环境：JS
 *  
 * */