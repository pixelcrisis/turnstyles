// ttlink.js | interacting with turntable

module.exports = app => {

	// quick access to turntable room data
	app.$User = () => window.turntable.user
	app.$View = () => window.turntable.topViewController
	app.$Chat = () => window.turntable.buddyList.pmWindows
	app.$Room = () => window.turntable.topViewController.roomData

	// find username from id
	app.$Name = (id = 'Unknown') => {
		// check the room first
		let user = app.$View().userMap[id]
		if (user) return user.attributes.name
		// then check PMs
		if (app.$Chat() && app.$Chat()[id]) {
			return app.$Chat()[id].otherUser.attributes.name
		}
		return id
	}

	// check for mention
	app.$Ping = (str = '') => {
		let ping = `@${app.$User().attributes.name}`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

  // "silent" messages posted in chat
  app.$Post = function (alert) {
    $('.chat .messages').append(this.$_post(alert))
    this.$View().updateChatScroll()
  }

  // send a message to the room
  app.$Send = function (text) {
    let roomid = this.$View().roomId
    let section = this.$View().section
    window.turntable.sendMessage({
      text, api: 'room.speak', roomid, section
    })
  }

}