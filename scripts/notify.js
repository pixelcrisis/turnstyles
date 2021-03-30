// notify.js | chat & desktop notifications

module.exports = tS => {

  // send a message to chrome/notify
  tS.prototype.notifyUser = function (data, key) {
    if (this.chrome) {
      let packed = { type: "tsNotify", notification: data }
      let notify = () => { window.postMessage(packed) }
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