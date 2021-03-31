// notify.js | chat & desktop notifications

module.exports = tS => {

  // check for browser notification permissions
  tS.prototype.notifyAuth = function () {
    let configs = this.config
    let running = configs.ping_chat || configs.ping_pm || configs.ping_song
    // return if nothing to notify, chrome is available or Notification isn't
    if (!running || this.chrome || !('Notification' in window)) return false
    // can't do anything with disabled permissions
    if (Notification.permission === 'denied') return false
    if (Notification.permission === 'default') {
      Notification.requestPermission()
      this.log(`requesting notification permission`)
      return false
    }
    return true
  }

  // send a user notifications
  tS.prototype.notifyUser = function (data, key) {
    if (document.hasFocus()) return // page focused, don't notify
    let packaged = popup(this, data)
    let notified = () => { window.postMessage(packaged) }

    if (!this.chrome) {
      if (!this.notifyAuth()) return // no browser permissions
      notified = () => {
        const sent = new Notification(data.head, packaged)
        sent.onclick = () => { window.focus(); sent.close() }
      }
    }

    // only send 1 notification per 10 seconds if suspend key provided
    return key ? this.suspend(notified, 10, key) : notified()
  }

  // post messages in chat
  tS.prototype.sendToChat = function (bold, text, type) {
    $('.chat .messages').append(msg(bold, text, type))
    this.view.updateChatScroll()
  }

  const msg = (bold, text, type = "") => `
    <div class="message ${type}">
      <em>
        <span class="subject">${bold}</span>
        <span class="text">${text}</span>
      </em>
    </div>
  `

  const popup = (self, data) => {
    const icon = "https://ts.pixelcrisis.co/build/images/icon128.png"
    if (!self.chrome) return { icon, body: data.text }
    else return { type: "tsNotify", notification: data }
  }

}