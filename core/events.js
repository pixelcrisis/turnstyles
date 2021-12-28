// events.js | trigger internal events

module.exports = app => {

	// bind functions to events 
	app.on = function (keys, ...list) {
		// define storage, ensure list
		if (!this.events) this.events = {}
		if (!Array.isArray(keys)) keys = [ keys ]
		// loop through our list of keys
		for (let key of keys) {
			if (!this.events[key]) this.events[key] = []
			// bind app to function, add to event storage
			for (let func of list) this.events[key].push(func.bind(this))
		}
	}

	// fire functions bound to events
	app.Emit = function (key, ...args) {
		let eventList = this.events[key]
		if (eventList) for (let func of eventList) func(...args)
	}

	// listen to turntable events
	app.listen = function (event) {
		if (!event.command) return
		// attach some data of our own
		event.$ping = this.$Ping(event.text)
		event.$name = this.$Name(event.userid)
		event.$from = this.$Name(event.senderid)
		event.$self = event.userid == this.$User().id

		// fire the event
		this.Emit(event.command, event)
	}

	// listen for DOM changes
	app.watcher = function () {
		let Observe = window.MutationObserver || window.WebKitMutationObserver
		let Watcher = new Observe(function(mutations) {
			for (let changed of mutations) {
				let el = changed.target
				// playlist updates
				if (el.className == "songs") app.Emit('playlist')
				// new chat messages
				if (el.className == "messages") app.Emit('newchat', el)
				// profile overlay
				if (el.nodeName == "TITLE" && el.baseURI.indexOf('profile/') > -1) {
					app.Emit('profile', el.baseURI.split('profile/')[1])
				}
			}
		})

		Watcher.observe(document, {  subtree: true, childList: true })
	}

	// bind watcher on attach
	app.on('attach', app.watcher)
}