// 原理从未排序队列中第一项插入到已经排序的位置中
let arr = [5, 44, 0, 3, 1]
let arr2 = [5, 44, 0, 3, 1]

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }else{
        break
      }
    }
  }
}

function insertSort2(arr){
  var preindex,current
  for(var i = 1; i<arr.length;i++){
    preindex = i - 1
    current = arr[i]
    //
    while(preindex >= 0 && current < arr[preindex]){
      arr[preindex + 1] = arr[preindex]
      preindex --
    }
    arr[preindex+1] = current
  }
  return arr
}
insertSort(arr)
insertSort2(arr2)
console.log(arr,insertSort2(arr2));