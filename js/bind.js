//简单版本
Function.prototype.bindFn = function bind(thisArgs){
  if(typeof this !== 'function'){
    throw new TypeError(this + 'must be a function')
  }

  var self = this
  var args = [].slice.call(arguments,1)

  var bound = function(){
    var boundArgs = [].slice.call(arguments)

    return self.apply(this,args.concat(boundArgs))
  }

  return bound
}

// 有new 功能版本
Function.prototype.bindFn = function bind(thisArgs){
  if(typeof this !== 'function'){
    throw new TypeError(this + 'must be a function')
  }
  var self = this
  var args = [].slice.call(arguments,1)

  var bound = function(){
    var finalArgs = [].slice.call(arguments).concat(args)
    if(this instanceof bound){
      if(self.prototype){
        function Empty(){}
        Empty.prototype = self.prototype
        bound.prototype = new Empty()
      }

      var result = self.apply(this,finalArgs)

      var isObject = typeof result === 'object' && result !== null
      var isFunction = typeof result === 'function'

      if(isObject || isFunction){
        return result
      }

      return this
    }
    else{
      return self.apply(thisArgs,finalArgs)
    }
  }
  return bound
}

function Student(name){
  if(this instanceof Student){
    this.name = name
    console.log('name',name);
  }
  else {
    throw new Error('必须通过new关键字来调用Student')
  }
}
var student = new Student('若')
var notStudent = Student.call(student,'川')
console.log(student,'student',notStudent,'notStudent');

function Student2(name){
  if(typeof new.target !== 'undefined'){
    this.name = name
    console.log('name',name);
  }
  else{
    throw new Error('必须通过new关键字来调用Student2')
  }
}
try {
  var student2 = new Student2('若')
  var notStudent2 = Student2.call(student2,'川')
  console.log(student2,'student2',notStudent2,'notStudent2');
} catch (error) {}

// prototype
const lookupProperty = (object,propertyName) => {
  let current = object

  if(current == null){
    throw new Error(`cannot read property '${propertyName}' of ${object}`)
  }

  while(current){
    if(current.hasOwnProperty(propertyName)) {
      return current[propertyName]
    }
    current = Object.getPrototypeOf(current)
  }
  return undefined
}

console.log('equal',lookupProperty({},'toString') === Object.prototype.toString)

