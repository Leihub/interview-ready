let arr = [2, 1, 3, 5, 0]
let arr2 = [1, 2, 5, 5, 0]

// 每轮从无序中选择最小的数作为第一项
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minidex = i, temp
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minidex] > arr[j]) {
        minidex = j
      }
    }
    // temp = arr[i]
    // arr[i] = arr[minidex]
    // arr[minidex] = temp
    [arr[i], arr[minidex]] = [arr[minidex], arr[i]]
  }
}

function selectSort2(arr) {
  // 最后一轮不用判断 
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      console.log(`selectSort2 ：i:${i},j:${j}`);
      if (arr[i] > arr[j]) { 
        [arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }
  }
}
selectSort(arr)
selectSort2(arr2)
console.log('after:', arr, arr2);