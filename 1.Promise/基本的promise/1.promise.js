// promise https://promisesaplus.com/
// 目前低版本浏览器 ie不支持 需要polyfill es6-promise(这个包实现了promise)
// 高版本都支持了promise

// ------------------------------------------------------------------
const Promise = require('./promise')


// 1. Promise是一个类 天生的，类中需要传入一个executor执行器，默认会立即执行

// 2. Promise内部会提供两个方法，可以更改promise的状态 [3个状态：等待态，成功态，失败态]
// resolve 触发成功 reject触发失败
// 如果一旦promise成功了 就不能失败 失败的情况两种 1.reject 2.抛出异常
// 每个promise实例都要有有一个then方法，分别是成功的回调和失败的回调
let promise = new Promise((resolve, reject) => {
  // throw new Error('错误')
  setTimeout(() => {
    console.log(1)
  }, 3000)
  resolve([{a: 'a'}])
})

promise.then((data) => { // onfulfilled 成功
  console.log(data)
}, (err) => { // onrejected 失败
  console.log(err)
})