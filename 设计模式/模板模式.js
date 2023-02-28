// 茶 or tea
//抽象类
var Beverage = function(){
}

Beverage.prototype.bolidWater = function(){
    console.log('把水煮沸');
}
Beverage.prototype.brew = function(){}
Beverage.prototype.pourInCup = function(){}
Beverage.prototype.addCondiments = function(){}
Beverage.prototype.init = function(){
    this.bolidWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
}

var Coffee = function(){}
Coffee.prototype = new Beverage()
Coffee.prototype.brew = function(){
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function(){
    console.log('把咖啡倒入杯子');
}
Coffee.prototype.addCondiments = function(){
    console.log('加糖和牛奶');
}
var Coffee = new Coffee()
Coffee.init()

// 钩子方法 子类规避父类必须的使用的抽象方法
Beverage.prototype.customerWantsCondiments = function(){
    return true
}

Beverage.prototype.init = function(){
    this.bolidWater()
    this.brew()
    this.pourInCup()
    if(this.customerWantsCondiments()){
        this.addCondiments()
    }
}

var CoffeeWithHook = function(){}
CoffeeWithHook.prototype = new Beverage()
CoffeeWithHook.prototype.brew = function(){
    console.log('用沸水冲泡咖啡');
}
CoffeeWithHook.prototype.pourInCup = function(){
    console.log('把咖啡倒入杯子');
}
CoffeeWithHook.prototype.customerWantsCondiments = function(){
    return window.confirm('请问需要调料嘛？')
}
CoffeeWithHook.prototype.addCondiments = function(){
    console.log('加入糖和牛奶');
}
var coffeewithhook = new CoffeeWithHook()
coffeewithhook.init()