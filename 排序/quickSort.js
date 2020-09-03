let arr = [55, 66, 22, 11, 0]

function quickSort(arr) {
  if (arr.length <= 0) {
    return arr
  }

  let left = []
  let right = []
  let current = arr.splice(0, 1)

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] < current){
      left.push(arr[i])
    }else{
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(current,quickSort(right))
}

console.log(quickSort(arr));