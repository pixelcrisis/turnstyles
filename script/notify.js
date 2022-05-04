// notify.js | manage notifications

module.exports = App => {

  // send a desktop notification
  App.Notify = function (alert) {
    let { head, body, type } = alert
    if (!this.canNotify() || document.hasFocus()) return
    // wrap in function in case we need to delay
    let ding = () => {
      let icon = this.__logo
      let sent = new Notification(head, { icon, body })
      // focus tt and close notification on click
      sent.onclick = () => { window.focus(); sent.close() }
    }
    // ignore duplicate notifications
    if (type) this.Delay(ding, type)
    else ding()
  }

  // get notification permissions
  App.canNotify = function () {
    let config = this.config.notify
    let notify = config.chat || config.song || config.ding
    // no notification if no access or not configured for it
    if (!notify || !("Notification" in window)) return false
    // no notification if notification permissions were denied
    if (Notification.permission === "denied") return false
    // if default, we need to ask for our permissions
    if (Notification.permission === "default") {
      this.Ran(`[notify] asking permission`)
      Notification.requestPermission()
      return false
    }
    // otherwise we're good!
    return true
  }

  // don't spam notificaions
  App.Delay = function (func, type) {
    // define holding list if undefined
    if (!this.holding) this.holding = {}
    // ignore the function if we're holding
    if (this.holding[type]) return false
    // otherwise set the delay
    let timeout = 5 * 1000 // 5 seconds
    // it works by self destructing the held type
    let cleared = () => { delete this.holding[type] }
    this.holding[type] = setTimeout(cleared.bind(this), timeout)
    // fire any function since we weren't holding
    if (func) func()
  }

  App.bindNotify = function () {
    this.Bind("update", this.canNotify)
    this.canNotify()
  }

}