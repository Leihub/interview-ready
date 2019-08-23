(function(window,undefined){
    function _invoke(action,data,callback){
        // 拼接参数
        var schema = 'myapp://utils/' + action
        schema += '?a=a'
        for(let key in data){
            if(data.hasOwnProperty(key)){
                schema += '&' + key + '=' + data[key]
            }
        }
        // 处理回调函数
        var callbackName = ''
        if(typeof callback === 'string'){
            callbackName = callback
        }else{
            callbackName = action + Date.now()
            window[callbackName] = callback
        }
        //触发
        var iframe = document.createElement('iframe')
        iframe.src = schema
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        setTimeout(function(){
            document.body.removeChild(iframe)
            iframe = null
        },5000)
    }
    let invoke = {
        share:function(data,callback){
            _invoke('share',data,callback)
        },
        scan:function(data,callback){
            _invoke('share',data,callback)
        }
    }
    window.invoke = invoke
})(window)