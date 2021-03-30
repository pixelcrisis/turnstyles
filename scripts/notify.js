// notify.js | chat & desktop notifications

module.exports = tS => {

  tS.prototype.checkNotificationsPerms = function () {
    // users browser doesn't support notifications
    if (!('Notification' in window)) return false // alert('2005 called, they want their browser back') haha jk... unless?
    // they have notifications disabled
    if (Notification.permission === 'denied') return false
    if (Notification.permission === 'default') {
      Notification.requestPermission()
      return false
    }

    return true
  }

  // send a message to chrome/notify
  tS.prototype.notifyUser = function (data, key) {
    if (document.hasFocus()) return // page focused, don't notify.
    if (this.chrome) {
      let packed = { type: "tsNotify", notification: data }
      let notify = () => { window.postMessage(packed) }
      return key ? this.suspend(notify, 10, key) : notify()
    } else {
      if (!this.checkNotificationsPerms()) return // notifs are disabled, unsupported or haven't been accepted yet.
      const iconUrl = 'https://ts.pixelcrisis.co/build/images/icon128.png'
      const notify = () => {
        const notif = new Notification(data.head, { icon: iconUrl, body: data.text })
        notif.onclick = () => {
          window.focus()
          notif.close()
        }
      }

      return key ? this.suspend(notify, 10, key) : notify()
    }
  }

  // post messages in chat
  tS.prototype.sendToChat = function (bold, text, type) {
    $('.chat .messages').append(msg(bold, text, type))
    this.view.updateChatScroll()
  }

  const msg = (bold, text, type) => `
    <div class="message ${type}">
      <em>
        <span class="subject">${bold}</span>
        <span class="text">${text}</span>
      </em>
    </div>
  `

}