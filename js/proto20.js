const lookupProperty = (object,propertyName) => {
    let current = object

    if(current == null){
        throw new Error(`cannot read property '${propertyName}' of ${object}`)
    }
    while(current){
        if(current.hasOwnProperty(propertyName)){
            return current[propertyName]
        }
        current = Object.getPrototypeOf(current)
    }
    return undefined
}

console.log('equal',lookupProperty({},'toString') === Object.prototype.toString)
// 显式继承
const obj_a = {a:1}
const obj_b = {b:1}
// 第一种方法显示继承
Object.setPrototypeOf(obj_b,obj_a)
var dir
dir = console.log.bind(dir)
console.log(dir);

dir(obj_b)
// 第二种方法显示继承
const obj_a2 = {a:1}
obj_b2 = Object.create(obj_a2)

dir(obj_b2)
// setPrototypeOf 跟 Object.create 区别：
// setPrototypeOf 是存在两个对象，把一个对象设置成另外一个对象的原型
// Object.create 是有一个对象，把这个对象设置成新对象的原型

// 隐式继承
// 创建普通js对象
const obj = {}
Object.setPrototypeOf(obj,Object.prototype)
obj.firstName = '1'
obj.lastName = '2'

dir(obj)


function User(firstname,lastname){
    this.firstname = firstname
    this.lastname = lastname
}

// User.prototype = Object.create(Object.prototype)

const user = new User('jade','gu')

dir(user)

const create = (proto) => {
    let Noop = function(){}
    Noop.prototype = proto
    return new Noop()
}


const createInstance = (Constructor,...args) => {
    let instance = Object.create(Constructor.prototype)
    Constructor.call(instance,...args)
    return instance
}

const user2 = createInstance(User,'jAde','Gu')
dir('user2',user2)


const inherit = (SuperConstructor,properties) => {
    let { constructor } = properties
    let SubConstructor = function(...args) {
        SuperConstructor.call(this,...args)
        constructor.call(this,...args)
    }

    SubConstructor.prototype = {
        ...properties,
        constructor:SubConstructor
    }

    Object.setPrototypeOf(
        SubConstructor.prototype,
        SuperConstructor.prototype
    )

    return SubConstructor
}


const Humen = inherit(Object,{
    constructor({age}){
        this.age = age
    },
    showAge(){
        console.log('age',this.age);
    }
})

const Userq = inherit(Humen,{
    constructor({name}){
        this.name = name
    },
    showName(){
        console.log('name',this.name)
    }
})

const user3 = new Userq({
    age:18,
    name:'lei'
})

console.log('user3',user3);
