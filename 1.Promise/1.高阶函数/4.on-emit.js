// // 发布订阅 所有库中都存在发布订阅 特点：订阅方和发布方没有任何关系
// // 观察者模式 观察者 被观察者

// const fs = require('fs')
// const path = require('path')

// // 订阅好一件事 当这件事发生的时候 触发对应的函数
// // 订阅 on 发布 emit promise内部也是基于发布订阅

// let e = {
//   _obj: {},
//   _callback: [],
//   on (callback) { // 订阅 就是将函数放入数组中
//     this._callback.push(callback)
//   },
//   emit (key, value) {
//     this._obj[key] = value
//     this._callback.forEach(method => {
//       method(this._obj)
//     })
//   }
// }

// e.on(function (obj) { // 每次发布都会触发此函数
//   console.log(obj)
// })

// fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function (error, data) {
//   e.emit('age', data)
// })

// fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (error, data) {
//   e.emit('name', data)
// })

const fs = require('fs')
const path = require('path')


class PublishSubscribe {
  constructor () {
    this.obj = {}
    this.callback = []
  }
  on (callback) {
    this.callback.push(callback)
  }
  emit (key, value) {
    this.obj[key] = value // 让订阅的数组中的方法 依次执行
    this.callback.forEach(method => {
      method(this.obj)
    })
  }
}

const publishSubscribe = new PublishSubscribe

// 只要发布了 就应该让订阅的事执行
publishSubscribe.on((obj) => {
  /**
   * Object.keys(obj)
   * Object.values(obj)
   * Object.entries(obj)
   */
  if (Object.keys(obj).length === 2) { // 用户根据结果自己决定输出
    console.log(obj)
  }
})

publishSubscribe.on(_ => {
  console.log('我就试试这样行不行')
})

// 多个类之间可以解除耦合关系
fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', (err, data) => {
  publishSubscribe.emit('name', data)
})

fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', (err, data) => {
  publishSubscribe.emit('age', data)
})