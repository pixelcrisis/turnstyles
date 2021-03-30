// _utils.js | general purpose utilities

module.exports = tS => {

  tS.prototype.log = function (str) {
    console.info(`turnStyles :: ${str}`)
  }

  // get a username from the room object
  tS.prototype.named = user => this.room.userMap[user.id].attributes.name

  // convert a value between 0-100 to one recognized by TT's volume system
  tS.prototype.scaleVol = x => Math.log(x / 100) / Math.LN2 + 4

  tS.prototype.holding = {}
  // use setTimeout to delay actions
  // used to prevent notification and save spam
  tS.prototype.suspend = function (fire, delay, key) {
    let returns = fire || () => {}
    let delayed = () => { returns(); delete this.holding[key] }

    if (this.holding[key]) delete this.holding[key]
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