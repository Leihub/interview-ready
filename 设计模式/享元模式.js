//享元模式
// 模特穿内衣
var Model = function(sex){
    this.sex = sex
}
Model.prototype.takePhoto = function(){
    console.log('sex =' + this.sex + 'underwear=' + this.underwear);
}
var maleModel = new Model('male'),
    femaleModel = new Model('female')

for(var i = 0;i<50;i++){ 
    maleModel.underwear = 'underwear' + i
    maleModel.takePhoto()
}
for(var j = 0;j<50;j++){
    femaleModel.underwear = 'underwear' + j 
    femaleModel.takePhoto()
}

// 上传文件的例子
var id = 0
window.startUpload = function(uploadType,files){
    for(var i = 0,file;file = files[i++]){
        var uploadObj = new Upload(uploadType,file.fileName,file.fileSize)
        uploadObj.init(id++)
    }
}
// uploadtype 是内部状态，fileName,fileSize 是外部状态
var Upload = function(uploadType,fileName,fileSize){
    this.uploadType = uploadType 
    this.fileName = fileName
    this.fileSize = fileSize
    this.dom = null
}

Upload.prototype.init = function(id){
    var that = this
    this.id = id
    this.dom = document.createElement('div')
    this.dom.innerHTML =  
    '<span>文件名称:'+ this.fileName +', 文件大小: '+ this.fileSize +'</span>' + 
    '<button class="delFile">删除</button>'; 
    this.dom.querySelector('.delFile').onclick = function(){
        that.delFile()
    }
    document.body.appendChild(this.dom)
}

Upload.prototype.delFile = function(){
    if(this.fileSize < 3000){
        return this.dom.parentNode.removeChild()
    }
    if(window.confirm('确定要删除该文件吗？' + this.fileName)){
        return this.dom.parentNode.removeChild()
    }
}
// 内部状态，外部状态
// 内部状态：1.内部状态储存于对象内部;2.内部状态可以被一些对象共享;3.内部状态独立于具体场景，通常不会改变;4.外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享


// 享元模式的上传文件
//剥离外部状态
var Upload = function(uploadType){
    this.uploadType = uploadType
}

Upload.prototype.delFile = function(id){
    uploadManager.setExternalState(id,this) // 组装外部状态
    if(this.fileSize < 3000){
        this.dom.parentNode.removeChild(this.dom)
    }

    if(window.confirm('确定要删除该文件吗？' + this.fileName)){
        return this.dom.parentNode.removeChild(this.dom)
    }
}
// 工厂对象实例化
var UploadFactory = (function(){
    var createFlyWeightObjs = {}

    return{
        create:function(uploadType){
            if(createFlyWeightObjs[uploadType]){
                return createFlyWeightObjs[uploadType]
            }
            return createFlyWeightObjs[uploadType] = new Upload(uploadType)
        }
    }
})()

// 管理器封装外部状态
var uploadManager = (function(){
    var uploadDatabase = {}
    
    return{
        add:function(id,uploadType,fileName,fileSize){
            var flyWeightObj = new UploadFactory.create(uploadType)

            var dom = document.createElement('div')
            dom.innerHTML = '<span>文件名称:'+ fileName +', 文件大小: '+ fileSize +'</span>' + 
            '<button class="delFile">删除</button>';
            
            dom.querySelector('.delFile').onclick = function(){
                flyWeightObj.delFile(id)
            }

            document.body.appendChild(dom)

            uploadDatabase[id] = {
                fileName:fileName,
                fileSize:fileSize,
                dom:dom
            }

            return flyWeightObj
        },

        setExternalState:function(id,flyWeightObj){
            var uploadData = uploadDatabase[id]
            for(var in uploadData){
                flyWeightObj[i] = uploadData[i]
            }
        }
    }
})()


//享元模式使用场景：1.一个程序中大量使用相似对象；2.由于使用了大量对象内存开销很大；3.对象的大多数状态都可以变为外部状态；4.剥离出对象的外部状态后可以用相对少的共享对象取代大量对象

// 地图对象池
var toolTipFactory = (function(){
    var toolTipFool = []

    return {
        create:function(){
            if(toolTipFool.length == 0){
                var div = document.createElement('div')
                document.body.appendChild(div)
                return div
            }else{
                return toolTipFool.shift()
            }
        },
        recover:function(toolTipDom){
            return toolTipFool.push(toolTipDom)
        }
    }
})()

// 通用的对象池
var objectPoolFactory = (function(createObjFn){
    var objectPool = []
    return {
        create:function(){
            var obj = objectPool.length === 0 ? 
            createObjFn.apply(this,arguments) : objectPool.shift()
        },
        recover:function(obj){
            objectPool.push(obj)
        }
    }
})()