// ttlink.js | interacting with turntable

module.exports = App => {

	App.User = () => window.turntable.user
	App.View = () => window.turntable.topViewController
	App.Chat = () => window.turntable.buddyList.pmWindows
	App.Room = () => window.turntable.topViewController.roomData

	App.findName = function (id = "Unknown") {
		let User = this.View().userMap[id]
		if (User) return User.attributes.name

		let Chat = this.Chat() ? this.Chat()[id] : false
		if (Chat) return Chat.otherUser.attributes.name
		
		return id
	}

	App.findPing = function (str = "") {
		let ping = `@${ this.User().attributes.name }`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

	App.Post = function (alert) {
		$(".chat .messages").append($post(alert))
		this.View().updateChatScroll()
	}

	App.Chat = function (text) {
		window.turntable.sendMessage({
			api: "room.speak",
			roomid: this.View().roomId,
			section: this.View().section,
			text
		})
	}

	App.Batch = function (text) {
		text = text.split(";;")
		if (text.length > 3) this.Post({
			head: "Send Error!",
			body: `Message contains ${ text.length }/3 Messages.`
		})
		else for (let msg of text) this.Chat(msg.trim())
	}

	App.Share = () => {
		if (window.confirm("Share turnStyles in the room chat?")) {
			App.Batch([
				`Check out turnStyles!`,
				`Autobop, Emotes, Themes, & More!`,
				`Get it @ https://ts.pixelcrisis.co`
			].join(";;"))
			$("#tsWindow").removeClass("active")
		}
	}

}

const $post = obj => `
  <div class="message ${ obj.type || '' }"><em>
    <span class="subject">${ obj.head || '' }</span>
    <span class="text">${ obj.body || '' }</span>
  </em></div>
`