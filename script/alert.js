// alerts.js | sending info to the user/room

module.exports = App => {

	// send a "fake" message to chat
	App.Post = function (alert) {
		$(".chat .messages").append(postHTML(alert))
		this.View().updateChatScroll()
	}

	// sends a real message to chat
	App.Chat = function (text) {
		window.turntable.sendMessage({
			text, api: "room.speak",
			roomid: this.View().roomId,
			section: this.View().section
		})
	}

	// send multiple messages to chat
	App.Batch = function (text) {
		if (!text) return false
		text = text.split(";;")
		if (text.length > 3) this.Post(batchError)
		else for (let msg of text) this.Chat(msg.trim())
	}

	// Send a Post and Notification
	// used for big status updates (nextDJ, etc)
  App.Bully = function (alert) {
    this.Post(alert)
    this.Notify(alert)
  }

  // share turnStyles
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