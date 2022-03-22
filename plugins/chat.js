// chat.js | modifying the chatbox

module.exports = App => {

  App.fadeNewSong = function (el) {
    let last = $(el).children(".message").last()
    let user = last.has(".avatar").length
    let text = last[0].innerText.includes("started playing")
    if (!user && text) last.addClass("stat")
  }

  App.addTimeStamp = function (event) {
    if (!this.config.stamps) return
    let message = $(".chat .messages .message:last-of-type")
    let matches = message[0].innerText.indexOf(event.name) === 0
    let stamped = message.has(".timestamp").length
    if (matches && !stamped) {
      let stamp = this.now().split(":").slice(0, 2).join(":")
      message.prepend(`<div class="timestamp">${ stamp }</div>`)
    }
  }

  App.on("speak", App.addTimeStamp)
  App.on("newchat", App.fadeNewSong)

}