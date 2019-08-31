var testObject = require('./test')

console.log(testObject)
// 语法糖
class MathHandle{
    constructor(x,y){
        this.x = x
        this.y = y
    }

    add(){
        return this.x + this.y
    }
}

// es5 构造函数写法
function MathHandle2(x,y){
    this.x = x
    this.y = y
    this.walk = function(){  // 写在构造函数内部的方法每个实例都会拷贝这个方法，占用过多内存，当需要访问构造函数的内部私有属性的时候可以使用这种方法。
        console.log(this);
    }
}
MathHandle2.prototype.add = function(){ // 每个实例共享该方法，不会拷贝
    return this.x + this.y
}

var a = new MathHandle2(1,2)
var b = new MathHandle(1,2)
console.log(a.walk());
console.log(`b.__proto__ === MathHandle.prototype?${b.__proto__ === MathHandle.prototype}`);
console.log(`MathHandle.prototype.constructor === MathHandle?${MathHandle.prototype.constructor === MathHandle}`);
console.log(`${typeof MathHandle === 'function'}`);





