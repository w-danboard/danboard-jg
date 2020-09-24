// 什么叫高阶函数 ’异步‘ 中
// 什么叫异步 1）执行后的返回结果不能立马获取 ajax 等待同步代码执行后 才会获取结果

// node中 文件操作都是异步的
const fs = require('fs') // 读写文件
const path = require('path')

// 异步的解决方案 最早就是基于回调函数的 不能使用try catch 来解决异步
// node中的回调函数的第一个参数 永远是error [node中 99%都是error first 错误第一]

// 需求读取age和name 用他们的结果 作为一个对象
let renderObj = {}
// 基于回调的方式来获取最终结果
function after (times, callback) { // lodash
  // times 会保存在当前的执行上下文中
  return function (key, value) { // out
    renderObj[key] = value
    if (--times === 0) {
      callback()
    }
  }
}
let out = after(2, function () {
  console.log(renderObj)
})
fs.readFile(path.resolve(__dirname, 'age.txt'), 'utf8', function (error, data) {
  out('age', data)
})

fs.readFile(path.resolve(__dirname, 'name.txt'), 'utf8', function (error, data) {
  out('name', data)
})

console.log(renderObj)