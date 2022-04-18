// alerts.js | sending info to the user/room

module.exports = App => {

	App.Post = function (alert) {
		// appends a "fake" message to chat
		$(".chat .messages").append(postHTML(alert))
		this.View().updateChatScroll()
	}

	App.Chat = function (text) {
		// sends a real message to chat
		window.turntable.sendMessage({
			text, api: "room.speak",
			roomid: this.View().roomId,
			section: this.View().section
		})
	}

	App.Batch = function (text) {
		// send multiple messages to chat
		if (!text) return false
		text = text.split(";;")
		if (text.length > 3) this.Post(batchError)
		else for (let msg of text) this.Chat(msg.trim())
	}

  App.Bully = function (alert) {
    this.Post(alert)
    this.Notify(alert)
  }

	App.Share = () => {
		if (window.confirm(shareAsk)) {
			App.Batch(shareMsg.join(";;"))
			$("#tsWindow").removeClass("active")
		}
	}

}

const postHTML = obj => `
  <div class="message ${ obj.type || '' }"><em>
    <span class="subject">${ obj.head || '' }</span>
    <span class="text">${ obj.body || '' }</span>
  </em></div>
`

const batchError = {
	head: "Too Many Messages!",
	body: "Can only send up to 3 messages at a time!"
}

const shareAsk = "Share turnStyles in the room chat?"
const shareMsg = [
	"Check out turnStyles!",
	"Autobop, Emotes, Themes, & More!",
	"Get it @ https://ts.pixelcrisis.co"
]