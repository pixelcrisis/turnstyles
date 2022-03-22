// events.js | trigger internal events

module.exports = App => {

	App.on = function (keys, ...list) {
		// bind list of functions to event list
		if (!this.events) this.events = {}
		if (!Array.isArray(keys)) keys = [ keys ]

		for (let key of keys) {
			if (!this.events[key]) this.events[key] = []
			for (let f of list) this.events[key].push(f.bind(this))
		}
	}

	App.Emit = function (key, ...args) {
		// fire functions bound to events
		let list = this.events[key]
		if (list) for (let f of list) f(...args)
	}

	App.listen = function (event) {
		if (!event.command) return
		// listen to/parse turntable events
		event.$ping = this.findPing(event.text)
		event.$name = this.findName(event.userid)
		event.$from = this.findName(event.senderid)
		event.$self = this.User().id == event.userid
		this.Emit(event.command, event)
	}

	App.watcher = function () {
		let Observe = window.MutationObserver || window.WebKitMutationObserver
		let Watcher = new Observe(function (mutations) {
			for (let changed of mutations) {
				let el = changed.target

				if (el.className == "songs") App.Emit("playlist")
				if (el.className == "messages") App.Emit("newchat", el)

				if (el.nodeName == "TITLE" && el.baseURI.indexOf("profile/") > -1) {
					App.Emit("profile", el.baseURI.split("profile/")[1])
				}
			}
		})
		Watcher.observe(document, { subtree: true, childList: true })
	}

	App.on("attach", App.watcher)

}