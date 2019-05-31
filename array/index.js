//合并数组中相邻且重复的元素说明：请实现一个函数 merge，传入一个数组，合并数组中【相邻且重复】的元素。
//示例：merge([3,2,2,4,5,5,6,2,1]); // 输出[3,2,4,5,6,2,1]
//merge([3,2,3]); // 输出[3,2,3]
//merge([2,2,3]); // 输出[2,3]
function merge(arr){
    if(!Array.isArray(arr) || arr.length === 0) return []
    var ret = [arr[0]]
    arr.reduce((n,p) => {
        if(n === p){
            
        }else{
            ret.push(p)
        }
        return p
    })
    return ret
}
console.log(merge([3,2,3]));
console.log(merge([2,2,3]));
console.log(merge([3,2,2,4,5,5,6,2,1]));

function product(arr){
    return arr.reduce(function (x, y){
        return x*y
    })
}
console.log(product([1, 2, 3, 4]));
console.log(product([0, 1, 2]));
console.log(product([99, 88, 77, 66]))

function normalize(arr) {  
    return arr.map(function(item){
        var words = item.split('');
        let ret = []
        words.map(function(word,index){
            if(index === 0){
            word = word.toUpperCase()
            }else{
            word = word.toLowerCase()
            }
            ret.push(word)
        })
        return ret.join('')
    })
}
function normalize2(arr) {  
    return arr.map(function(item){
        return item[0].toUpperCase()+item.slice(1).toLowerCase()
    })
}
console.log(normalize(['adam', 'LISA', 'barT']));
console.log(normalize2(['adam', 'LISA', 'barT']));

// 将数字转换成罗马数字
function transform(num){
    var chars = ['I','V','X','L','C','D','M'].reverse()

    var vals = [1,5,10,50,100,500,1000].reverse()
    var str = ''
    for(var i=0;i<7;i+=2){
        var x = num/vals[i]
        if(x<4){
            for(var j=0;j<x;++j) str += chars[i]
        } else if(x === 4){
            str = str + chars[i] + chars[i]
        } else if(x>4 && x<9){
            str += chars[i+1]
            for(var j=0;j<x;++j) str += chars[i]
        }else if(x === 9){
            str = str + chars[i] + chars[i+2]
        }
        num = num % vals[i]
    }
  
    return str;
}
console.log(transform(36))