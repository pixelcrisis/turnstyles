// chatbox.js | modifying the chatbox

module.exports = app => {

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