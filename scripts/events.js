// events.js | self-explanatory

module.exports = tS => {

  tS.on = function (key, cb) {
    if (!this.events[key]) this.events[key] = []
    this.events[key].push(cb.bind(this))
  }

  tS.emit = function (key, arg1, arg2) {
    let list = this.events[key]
    if (list) for (let cb of list) cb(arg1, arg2)
  }

  tS.handle = function (e) {
    if (e.command) this.emit(e.command, e)
  }

  tS.events = {}

}