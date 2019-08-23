var mv = {}
var data = {
    name:'lei',
    age:25
}

for(let key in data){
    (function(key){
        Object.defineProperty(mv,key,{
            set:function(newVal){
                console.log(newVal);
                data[key] = newVal
            },
            get:function(){
                console.log('get',data[key]);
                return data[key]
            }
        })
    })(key)
}