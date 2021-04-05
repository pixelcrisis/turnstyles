// notify.js | notification functionality

module.exports = tS => {

  tS.notifyAuth = function () {
    let opt = this.config
    let has = opt.ping_chat || opt.ping_pm || opt.ping_song
    // return if nothing to notify, chrome is available or Notification isn't
    if (!has || this.chrome || !('Notification' in window)) return false

    if (Notification.permission === 'denied') return false
    if (Notification.permission === 'default') {
      this.Log(`requesting notifcation permission`)
      Notification.requestPermission()
      return false
    }

    return true
  }

  tS.stopNotify = function () {
    if (document.hasFocus()) return true
    if (!this.chrome && !this.notifyAuth()) return true
    return false
  }

  tS.sendNotify = function (data, key) {
    if (this.stopNotify()) return
    let send = this.notifyType(data)
    return key ? this.suspend(send, 5, key) : send()
  }

  tS.notifyType = function (data) {
    let chrome = { type: "tsNotify", notification: data }
    let browse = { icon: this.icon(), body: data.text }

    if (this.chrome) return () => window.postMessage(chrome)
    else return () => {
      let sent = new Notification(data.head, browse)
      sent.onclick = () => { window.focus(); sent.close() }
    }
  }

  tS.postToChat = function (bold, text, type) {
    $('.chat .messages').append(layout(bold, text, type))
    this.view().updateChatScroll()
  }

  tS.on('attach', tS.notifyAuth)
  tS.on('update', tS.notifyAuth)

}

const layout = (bold, text, type = "") => `
  <div class="message ${type}">
    <em>
      <span class="subject">${bold}</span>
      <span class="text">${text}</span>
    </em>
  </div>
`