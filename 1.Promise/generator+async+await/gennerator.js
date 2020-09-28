// generator 生成器 生成迭代器
// 普通函数执行时 没有停止功能 generator函数 可以暂停

// ---------------------------------------------------------
// function *read () {
//   yield 1 // 产出
//   yield 2 // 产出
//   yield 3 // 产出
//   yield 4 // 产出
// }

// ---------------------------------------------------------
// let it = read() // iterator 迭代器中 包含一个next方法

// ---------------------------------------------------------
// 迭代器接口 Symbol.iterator
// let done = false
// while(!done) {
//   let obj = it.next()
//   done = obj.done
//   console.log(obj.value)
// }

// console.log(it.next()) // 结果包含两个值 { value, done } 碰到yield关键字 就可以停止函数

// ---------------------------------------------------------
// function *read () {
//   let a = yield 1
//   console.log(a, '===>')
//   let b = yield 2
//   console.log(b)
//   let c = yield 3
//   console.log(c)
// }

// ---------------------------------------------------------
// let it = read()
// it.next('hello') // 第一次传递的参数 是无意义的
// it.next('world') // next传递的参数会给上一次yield的返回值

// ---------------------------------------------------------
// generator +promise

// const util = require('util')
// const fs = require('fs')
// const path = require('path')
// const read = util.promisify(fs.readFile)

// function *readName () { // 暂停的功能
//   let content = yield read(path.resolve(__dirname, 'name.txt'), 'utf8')
//   let name = yield {}
//   return name
// }

// let it = readName()
// let { value } = it.next()
// value.then(data => {
//   console.log(data)
//   let { value } = it.next(data)
  
// })

// tj
// function co (it) {
//   return new Promise((resolve, reject) => {
//     // 异步迭代 需要next函数
//     function next(r) {
//       let { value, done } = it.next(r)
//       if (done) {
//         resolve(value)
//       } else {
//         Promise.resolve(value).then(data => {
//           next(data)
//         }, reject)
//       }
//     }
//     next()
//   })
// }

// co库会帮我们依次去执行生成器 不停的调用next方法 最终将结果返回
// co(readName()).then(data => {
//   console.log(data)
// })

// ------------------------------------------------------------

// 他编译出来的结果就是generator + co
async function test () { // async 函数返回的就是一个promise
  try {
    let r = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello')
      }, 1000)
    })
    console.log(r)
  } catch (err) {
    console.log(err)
  }
}
test()
