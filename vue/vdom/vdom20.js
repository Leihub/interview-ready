function vnode(type, key, data, children, text, elm) {
    const element = {
        __type: VNODE_TYPE,
        type, key, data, children, text, elm
    }
    return element
}

function h(type, config, ...children) {
    const props = {}
    let key = null
    if (config !== null) {
        if (hasValidKey(config)) {
            key = '' + config.key
        }

        for (let propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS[propName]) {
                props[propName] = config[propName]
            }
        }
    }

    return vnode(
        type,
        key,
        data,
        children,
        
    )
}