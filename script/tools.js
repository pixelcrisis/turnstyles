// tools.js | core utilties 

module.exports = App => {

	// quick access to turntable data
	App.User = () => window.turntable.user
	App.View = () => window.turntable.topViewController
	App.Chat = () => window.turntable.buddyList.pmWindows
	App.Room = () => window.turntable.topViewController.roomData

	// capitalize a string (proper Noun)
	App.Noun = str => str[0].toUpperCase() + str.substring(1)

	// get and parse the current time
	// passing trim returns just 00:00
	App.Time = function (trim) {
		let time = new Date().toLocaleTimeString("en-us")
		let tiny = time.split(":").slice(0, 2).join(":")
		return trim ? tiny : time
	}

	// find user's name by ID
	App.Name = function (id = "Unknown") {
		// check the room for the user
		let User = this.View().userMap[id]
		if (User)  return User.attributes.name
		// check the PM windows for the user
		let Chat = this.Chat() ? this.Chat()[id] : false
		if (Chat)  return Chat.otherUser.attributes.name
		// just return "Unknown" if we can't find any
		return id
	}

	// check a string for mention
	App.Ping = function (str = "") {
		let list = str.split(" ")
		let ping = `@${ this.User().attributes.name }`
		return list.indexOf(ping) > -1
	}

	// toggle classes on the DOM
	App.Body = function (name, on) {
		let has = $("body").hasClass(name)
		if (on && !has) $("body").addClass(name)
		if (!on && has) $("body").removeClass(name)
	}

}