// global.js | core utilties 

module.exports = App => {

	// quick access to turntable data
	App.User = () => window.turntable.user
	App.View = () => window.turntable.topViewController
	App.Chat = () => window.turntable.buddyList.pmWindows
	App.Room = () => window.turntable.topViewController.roomData

	// get and parse the current time
	App.time = function (trim) {
		// trim will return tiny, just the 00:00 format
		let time = new Date().toLocaleTimeString("en-us")
		let tiny = time.split(":").slice(0, 2).join(":")
		return trim ? tiny : time
	}

	// capitalize a string
	App.cap = str => str[0].toUpperCase() + str.substring(1)

	// find the name of a user by ID
	App.findName = function (id = "Unknown") {
		// look for user in the room
		let User = this.View().userMap[id]
		if (User) return User.attributes.name
		// look for user via PM windows
		let Chat = this.Chat() ? this.Chat()[id] : false
		if (Chat) return Chat.otherUser.attributes.name
		return id
	}

	// check a string for user mention
	App.findPing = function (str = "") {
		let ping = `@${ this.User().attributes.name }`
		return str.toLowerCase().indexOf(ping.toLowerCase()) > -1
	}

	// toggle classes on the DOM
	App.bodyClass = function (name, on) {
		let has = $("body").hasClass(name)
		if (on && !has) $("body").addClass(name)
		if (!on && has) $("body").removeClass(name)
	}

}