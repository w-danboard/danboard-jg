// 观察者模式 观察者和被观察者是有关联的 观察者是要将自己放在被观察者之上
// 当被观察者发生变化 会通知所有的观察者

// 我家有个小宝宝 我要监控我家小宝宝的状态
// 开心 -> 不开心
 
// class Subject { // 被观察者
//   constructor (name) {
//     this.baby = name
//     this.state = '开心'
//     this.observers = []
//   }
//   attach (o) { // 需要将注册者放到自己的身上
//     this.observers.push(o)
//   }
//   setSate (state) {
//     this.state = state // 更新被观察者的状态
//     this.observers.forEach(o => {
//       o.update(state)
//     })
//   }
// }

// class Observer { // 观察者
//   constructor (name) {
//     this.me = name
//   }
//   update (val) { // 被观察者的状态发生变化 会调用这个方法
//     console.log('小宝宝', val)
//   }
// }

// let baby = new Subject('小宝宝')
// let me = new Observer('我')
// baby.attach(me)
// baby.setSate('不开心')

// 被观察者 豆芽
class Subject {
  constructor (name) {
    this.name = name
    this.state = '开心' // 豆芽初始时是开心的
    this.observers = []
  }
  // 豆芽允许谁观察它 注册到observers里
  attach (o) {
    this.observers.push(o)
  }
  // 豆芽的心情发生了变化
  setState (state) {
    this.state = state
    this.observers.forEach(o => {
      o.update(this)
    })
  }
}

// 观察者
class Observer {
  constructor (name) {
    this.name = name
  }
  update (state) {
    console.log(`${this.name}说: ${state.name} -> ${state.state}`)
  }
}

// 豆芽
let bean = new Subject('豆芽')
let pp = new Observer('pp')
let hh = new Observer('hh')
let cc = new Observer('cc')

bean.attach(pp)
bean.attach(hh)
bean.attach(cc)
bean.setState('不开心')