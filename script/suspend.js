// suspend.js | delaying functions

module.exports = tS => {

  // suspend a func for delayed seconds
  // used to prevent spam from notifications, mainly
  tS.suspend = function suspendFunc (func, delay, key) {
    if (!this.holding) this.holding = {}
    // if we aren't suspended, fire the function
    if (!this.holding[key]) func && func()
    // else clear the timeout so we can reset it
    else clearTimeout(this.holding[key])

    // self clearing timeout
    let timeout = delay * 1000
    let cleared = () => { delete this.holding[key] }
    this.holding[key] = setTimeout(cleared.bind(this), timeout)
  }

  tS.holding = {}

}