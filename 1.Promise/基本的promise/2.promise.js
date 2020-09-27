// promise可以解决链式调用问题 jquery .then.then
// 先通过原生看效果 -> 写原理


// const Promise = require("./promise");

let promise = new Promise((resolve, reject) => {
  reject('hello') // 普通值意味着不是一个promise
})

promise.then(data => {
  return data // then方法中可以返回一个值(不是promise)，会把这个结果放到下一次then的成功的回调中
}).then(data => {
  console.log(data)
  return new Promise((resolve, reject) => { // 如果返回的是一个promise 会采用这个 promise的结果
    setTimeout(() => {
      resolve('word')
    }, 2000)
  })
}, err => {
  console.log('err', err) // 如果在失败的函数中返回的是普通值或者是promise也会走到外层的promise的成功中
}).then(data => {
  console.log(data)
  throw new Error('失败了')
}).then(() => {}, (err) => {
  console.log(err)
})

/**
 * 什么时候走成功
 *  then中返回的是一个普通值 或者是一个promise的时候 [成功的promise]
 */