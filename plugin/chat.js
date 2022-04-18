// chat.js | modifying the chatbox

module.exports = App => {

  App.addTimeStamp = function (e) {
    if (!this.config.stamps) return
    let message = $( lastMessage )
    let matches = message[0].innerText.indexOf(e.name) === 0
    let stamped = message.has(".timestamp").length
    if (matches && !stamped) {
      let stamp = this.now().split(":").slice(0, 2).join(":")
      message.prepend(`<div class="timestamp">${ stamp }</div>`)
    }
  }

  App.fadeNewSong = function (el) {
    let last = $(el).children(".message").last()
    let user = last.has(".avatar").length
    let text = last[0].innerText.includes("started playing")
    if (!user && text) last.addClass("stat")
  }

  App.quickText = function (btn) {
    let text = this.config.qtbtns[btn]
    if (!text) return
    // remove the label
    if (text.indexOf("||") > -1) text = text.split("||")[1].trim()
    this.Batch(text)
  }

  App.bindChat = function () {
    this.Bind("speak", this.addTimeStamp)
    this.Bind("newchat", this.fadeNewSong)
    // easy inline quicktext onlick access
    this.qtbtn1 = function () { this.quickText('qtbtn1') }
    this.qtbtn2 = function () { this.quickText('qtbtn2') }
    this.qtbtn3 = function () { this.quickText('qtbtn3') }
  }

}

const lastMessage = ".chat .messages .messagelast-of-type"