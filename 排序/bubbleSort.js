let arr = [2, 3, 1, 2, 5]
let arr2 = [2, 3, 1, 2, 5]
function bubbleSort(arr){
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      console.log(`i:${i},j:${j}`);
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

function bubbleSort2(arr){
  for (let i = arr.length; i>=2; i--) {
    for (let j = 0; j <= i -1; j++) {
      console.log(`bubble2 ：i:${i},j:${j}`);
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}
bubbleSort(arr)
bubbleSort2(arr2)
console.log(arr,arr2)