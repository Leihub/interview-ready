let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
  promise2 = promise1.then('这里应该是个函数，但是现在不是')
  promise2.then(res => {
    console.log(res) //5秒后打印出：这里返回一个promise
  }).catch(e => {
    console.log('e',e);
  })