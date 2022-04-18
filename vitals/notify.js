// notify.js | manage notifications

module.exports = App => {

  App.Notify = function (alert) {
    let perm = this.canNotify()
    if (!perm || document.hasFocus()) return
    let { head, body, type } = alert
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

  App.canNotify = function () {
    let config = this.config.notify
    let notify = config.chat || config.song || config.ding
    // no notification if no access or not configured for it
    if (!notify || !("Notification" in window)) return false
    // no notification if notification permissions were denied
    if (Notification.permission === "denied") return false
    // if default, we need to ask for our permissions
    if (Notification.permission === "default") {
      this.Ran("requesting notifications")
      Notification.requestPermission()
      return false
    }
    // otherwise we're good!
    return true
  }

  App.bindNotify = function () {
    this.Bind("update", App.canNotify)
    this.canNotify()
  }

}