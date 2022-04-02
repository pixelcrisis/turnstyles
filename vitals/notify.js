// notify.js | manage notifications

module.exports = App => {

  App.Notify = function (alert) {
    if (!this.canNotify() || document.hasFocus()) return
    let { head, body, type } = alert, icon = this.__logo

    let ding = () => {
      let sent = new Notification(head, { icon, body })
      sent.onclick = () => { window.focus(); sent.close() }
    }
    // delay notifications with types to prevent spam
    return type ? this.delay(ding, 5, type) : ding()
  }

  App.canNotify = function () {
    let cfg = this.config.notify
    let has = cfg.chat || cfg.song || cfg.ding
    if (!has || !("Notification" in window)) return false
    if (Notification.permission === "denied") return false
    if (Notification.permission === "default") {
      this.Log("requesting notification permissions")
      Notification.requestPermission()
      return false
    }
    return true
  }

  App.Bully = function (alert) {
    this.Post(alert)
    this.Notify(alert)
  }

  App.on("update", App.canNotify)

}