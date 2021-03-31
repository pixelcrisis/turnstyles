// _utils.js | general purpose utilities

module.exports = tS => {

  tS.prototype.log = function (str) {
    console.info(`turnStyles :: ${str}`)
  }

  // get a username from the userMap
  tS.prototype.named = id => {
    let user = window.turntable.topViewController.userMap[id]
    return user ? user.attributes.name : 'Someone'
  }

  // get a username from the buddyList
  tS.prototype.buddy = id => {
    let buds = window.turntable.buddyList.pmWindows[id]
    return buds ? buds.otherUser.attributes.name : false
  }

  // check if a user was pinged
  tS.prototype.pinged = function (str) {
    let search = `@${this.core.user.attributes.name.toLowerCase()}`
    return str.toLowerCase().indexOf(search) > -1
  }

  // convert a value from between 0-100
  // to one recognized by TT's volume system
  tS.prototype.scaleVol = x => Math.log(x / 100) / Math.LN2 + 4

  tS.prototype.holding = {}
  // use setTimeout to delay actions
  // used to prevent notification and save spam
  tS.prototype.suspend = function (cb, delay, key) {
    let delayed = () => { delete this.holding[key] }
    if (this.holding[key]) delete this.holding[key]
    // fire the callback if no delay
    else if (cb) cb()
    // update our delay
    this.holding[key] = setTimeout(delayed.bind(this), delay * 1000)
  }

  // "click" an element
  tS.prototype.click = function (el) {
    $(window).focus()
    let opts = { bubbles: true, cancelable: true, view: window }
    let elem = document.querySelectorAll(el)[0]
    let fire = new MouseEvent('click', opts)
    return !elem.dispatchEvent(fire)
  }

}