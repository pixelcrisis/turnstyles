// events.js | self-explanatory

module.exports = tS => {

  // bind functions to the event object
  tS.on = function tsOnEvent (key, cb) {
    if (!this.events) this.events = {}
    if (!this.events[key]) this.events[key] = []
    this.events[key].push(cb.bind(this))
  }

  // loop through event functions and fire
  tS.emit = function tsEmitEvent (key, arg1, arg2) {
    let list = this.events[key]
    if (list) for (let cb of list) cb(arg1, arg2)
  }

  // interpret turntable events as our own
  // handler is bound in attach.js
  tS.handle = function tsHandleEvent (e) {
    if (!e.command) return

    // store some quick data
    e.$ping = this.pinged(e.text)
    e.$name = this.userName(e.userid)
    e.$from = this.buddyName(e.senderid)
    e.$self = e.userid == window.turntable.user.id
    
    // fire our own events
    this.emit(e.command, e)
  }

  tS.events = {}

}