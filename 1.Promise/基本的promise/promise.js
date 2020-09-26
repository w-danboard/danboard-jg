// 自己实现Promise

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

class Promise {
  constructor (executor) { // 宏变量
    this.status = PENDING  // 默认是等待态
    this.value = null      // 成功的原因
    this.reason = null     // 失败的原因
    // 保证只有状态是等待态的时候 才能更改状态
    let resolve = (value) => {
      // 官方文档 只有pending状态才能改变状态
      if (this.status === PENDING) {
        this.value = value
        this.status = RESOLVED
      }
    }
    // 保证只有状态是等待态的时候 才能更改状态
    let reject = (reason) => {
      // 官方文档 只有pending状态才能改变状态
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
      }
    }
    try {
      executor(resolve, reject) // 同步执行 立即执行
    } catch (e) {
      // 如果executor执行的时候，执行出错，比如内部throw new Error('错误')，就手动执行以下reject并把错误信息传过去
      console.log(e)
      reject(e)
    }
  }
  then (onfulfilled, onrejected) {
    if (this.status === RESOLVED) {
      onfulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onrejected(this.reason)
    }
  }
}

module.exports = Promise