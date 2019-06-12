function debounce(fn,delay){
    let timer = null 
    return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,args)
        },delay)
    }
}
function loga(){
    console.log('aaa');
}


function throttle(fn,delay){
    let timer = null
    let start = new Date()
    return function(...args){
        let now = new Date()
        if(now - start >= delay){ // 一开始就执行
            fn.apply(this,args)
            start = now
        }
    }
}
function throttle2(fn,delay){
    let timer = null
    return function(...args){
        if(!timer){
            timer = setTimeout(()=>{ // 隔一段时间执行0
                fn.apply(this,args)
                timer = null
            },delay)
        }
    }
}

function throttle3(fn,delay){
    let timer = null
    let start = new Date()
    return function(...args){
        let now = new Date()
        clearTimeout(timer)
        if(now-start >= delay){
            fn.apply(this,args)
            start = now
        }else{
            timer = setTimeout(()=>{
                fn.apply(this,args)
            },50)
        }
    }
}

window.onmousemove = throttle(loga,1000)
