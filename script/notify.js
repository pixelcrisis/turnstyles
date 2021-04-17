// notify.js | send notifications / fake chat messages

module.exports = tS => {

  // get notifications permission from the browser
  tS.notifyAuth = function notifyAuth () {
    let opt = this.config
    let has = opt.ping_chat || opt.ping_pm || opt.ping_song

    // return if no notifications possible/available
    if (!has || !('Notification' in window)) return false

    if (Notification.permission === 'denied') return false
    if (Notification.permission === 'default') {
      this.Log(`requesting notifcation permission`)
      Notification.requestPermission()
      return false
    }

    return true
  }

  // send out a browser notification
  tS.notifyUser = function sendNotification (head, body, key) {
    // return if no perms or we're using turntable
    if (!this.notifyAuth() || document.hasFocus()) return
    let icon = `${this.__base}/images/icon128.png`
  
    let ding = () => {
      let sent = new Notification(head, { icon, body })
      sent.onclick = () => { window.focus(); sent.close() }
    }

    // delay spammy notifications with suspend
    return key ? this.suspend(ding, 5, key) : ding()
  }

  // post a pseudo message in chat only available to user
  tS.postToChat = function postToChat (bold, text, type) {
    $('.chat .messages').append(`
      <div class="message ${type}">
        <em>
          <span class="subject">${bold}</span>
          <span class="text">${text}</span>
        </em>
      </div>
    `)

    this.view().updateChatScroll()
  }

  tS.on('attach', tS.notifyAuth)
  tS.on('update', tS.notifyAuth)

}