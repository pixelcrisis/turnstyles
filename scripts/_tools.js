// _tools.js | general purpose utilities

module.exports = tS => {

  // logging functions
  tS.logBook = []
  tS.Log = str => {
    this.logBook = this.logBook || tS.logBook

    let date = new Date()
    let time = `[${date.toLocaleTimeString('en-US')}]`

    this.logBook.push(`[tS] ${time} <span>${str}</span>`)
    console.info(`${time} turnStyles :: ${str}`)

    if (this.logBook.length > 50) this.logBook.shift()

    let logger = $('#ts_logs')[0]
    if (logger) {
      logger.innerHTML = this.logBook.join('<br>')
      logger.scrollTop = logger.scrollHeight
    }
  }

  // portals to tt
  tS.user = () => window.turntable.user
  tS.view = () => window.turntable.topViewController

  // send an actual message to room
  tS.speak = function (text) {
    window.turntable.sendMessage({
      text, api: 'room.speak',
      roomid: this.view().roomId,
      section: this.view().section
    })
  }

  // grab a link to our icon 
  tS.icon = () => `${this.__base}/images/icon128.png`

  // username lookups
  tS.userName = id => {
    let user = tS.view().userMap[id]
    return user ? user.attributes.name : 'Someone'
  }
  tS.buddyName = id => {
    let chat = window.turntable.buddyList.pmWindows[id]
    return chat ? chat.otherUser.attributes.name : false
  }

  // check for ping
  tS.pinged = str => {
    let ping = `@${tS.user().attributes.name.toLowerCase()}`
    return str.toLowerCase().indexOf(ping) > -1
  }

  // toggle classes on the body
  tS.toggleClass = (sel, val) => {
    let has = $('body').hasClass(sel)
    if (val && !has) $('body').addClass(sel)
    if (has && !val) $('body').removeClass(sel)
  }

  // use suspend to delay things
  tS.holding = {}
  tS.suspend = function (cb, delay, key) {
    if (!this.holding[key]) cb && cb()
    else clearTimeout(this.holding[key])

    let timeout = delay * 1000
    let cleared = () => { delete this.holding[key] }
    this.holding[key] = setTimeout(cleared.bind(this), timeout)
  }

}