// _tools.js | general purpose utilities

module.exports = tS => {

  tS.Log = str => console.info(`turnStyles :: ${str}`)

  // portals to tt
  tS.user = () => window.turntable.user
  tS.view = () => window.turntable.topViewController

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