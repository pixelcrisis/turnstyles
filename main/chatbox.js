// chatbox.js | modifying the chatbox

module.exports = app => {

  app.qtbtn1 = function () { this.qtbtns('1') }
  app.qtbtn2 = function () { this.qtbtns('2') }
  app.qtbtn3 = function () { this.qtbtns('3') }
  app.qtbtns = function (i) {
    let text = this.config.qtbtns[`qtbtn${i}`]
    let name = `QT${i}`
    if (!text) return

    if (text.indexOf('||') > -1) {
      text = text.split('||')
      name = text.shift().trim()
      text = text.join('').trim()
    }

    text = text.split(';;')

    if (text.length > 3) {
      let head = "QuickText Error!"
      let body = `${name} message contains ${text.length}/3 messages.`
      this.$Post({ head, body })
    }
    
    else for (let msg of text) this.$Send(msg.trim())
  }

  // fade out 'started playing' 
  app.fadeNewSong = function (el) {  
    let last = $(el).children('.message').last()
    let user = last.has('.avatar').length
    let text = last[0].innerText.includes('started playing')
    if (!user && text) last.addClass('stat')
  }

  // add timestamps to new chats
  app.addTimeStamp = function (e) {
    if (!this.config.stamps) return
    let message = $('.chat .messages .message:last-of-type')
    let matches = message[0].innerText.indexOf(e.name) === 0
    let stamped = message.has('.timestamp').length

    if (!stamped && matches) {
      let _time = new Date().toLocaleTimeString('en-US')
      let stamp = _time.split(':').slice(0, 2).join(':')

      message.prepend(`<div class="timestamp">${stamp}</div>`)
    }
  }

  app.on('newchat', app.fadeNewSong)
  app.on('speak', app.addTimeStamp)

}