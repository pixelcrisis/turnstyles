// events.js | trigger internal events

module.exports = App => {

	// make keyed list of functions
	App.Bind = function (key, func) {
		// define events list if undefined
		if (!this.events) this.events = {}
		if (!this.events[key]) this.events[key] = []
		this.events[key].push(func.bind(this))
	}

	// fire list of keyed functions
	App.Emit = function (key, ...args) {
		let list = this.events[key]
		// fire every function bound to keyed event
		if (list) for (let func of list) func(...args)
	}

	// parse turntable events
	App.listen = function (event) {
		if (!event.command) return
		event.$ping = this.findPing(event.text)
		event.$name = this.findName(event.userid)
		event.$from = this.findName(event.senderid)
		event.$self = this.User().id == event.userid
		this.Emit(event.command, event)
	}

	// fire events on DOM changes
	App.watcher = function (mutations) {
		for (let changed of mutations) {
			let element = changed.target
			let byClass = element.className
			let byTitle = element.nodeName == "TITLE"

			if (byClass == "songs") App.Emit("playlist")
			if (byClass == "messages") App.Emit("newchat", element)

			if (byTitle && element.baseURI.indexOf("profile/") > -1) {
				let user = element.baseURI.split("profile/")[1]
				App.Emit("profile", user)
			}
		}
	}

	// bind DOM observer
	App.bindWatcher = function () {
		// find proper MutationObserver
		let Observe = window.MutationObserver
		if (!Observe) Observe = window.WebKitMutationObserver
		// define our DOM Mutations Observer
		let Watcher = new Observe(this.watcher)
		Watcher.observe(document, { subtree: true, childList: true })
	}

}