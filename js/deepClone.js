// 深拷贝
const deepClone = (obj) => {
  let cobj = Array.isArray(obj) ? [] : {}
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      if(obj[key] && typeof obj[key] == 'object'){
        cobj[key] = deepClone(obj[key])
      }else{
        cobj[key] = obj[key]
      }
    }
  }
  return cobj
}


var obj = {
  a:1,
  b:{
    c:2
  }
}
var cobj = deepClone(obj)
cobj.b.c = 3
console.log('deepClone',obj,cobj)


// 继承
