/**
 * 防抖函数
 */

function debounce(fn,delay){
    let timer = null
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}

/** 
 * 节流函数时间戳版本
*/
function throthe(fn,delay){
    let start = new Date()
    return function(...args){
        let now = new Date()
        if(now - start >= delay){
            fn.apply(this,args)
            start = now
        }
    }
}

/** 
 * 节流函数定时器版本
*/
function throthe(fn,delay){
    let timer = null
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }else{
            timer = setTimeout(()=>{
                fn.apply(this,args)
            },delay)
        }
    }
}

/**
 * 节流函数结合版本
 */
function throthe(fn,delay){
    let 
        timer = null
        start = new Date()
    return function(){}
}