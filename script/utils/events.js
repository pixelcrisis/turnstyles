// events.js | trigger internal events

module.exports = app => {

	// bind functions to fire on events 
	app.on = function (keys, ...list) {
		// define storage if undefined
		if (!this.events) this.events = {}
		// list-ify non-listed event keys
		if (!Array.isArray(keys)) keys = [ keys ]
		// loop through our list of keys
		for (let key of keys) {
			// define event storage array if undefined
			if (!this.events[key]) this.events[key] = []
			// add function to our event storage
			// bind app to all event functions
			for (let func of list) this.events[key].push(func.bind(this))
		}
	}

	// fire functions bound to events on events
	app.Emit = function (key, ...args) {
		// if we have a list of functions
		let eventList = this.events[key]
		// then fire all the functions in the list
		if (eventList) for (let func of eventList) func(...args)
	}

	// listen and parse data from turntable events
	app.listen = function (event) {
		if (!event.command) return

		// attach some data of our own
		event.$ping = this.pinged(event.text)
		event.$name = this.$Name(event.userid)
		event.$from = this.$Name(event.senderid)
		event.$self = event.userid == this.$User().id

		// fire the event
		this.Emit(event.command, event)
	}

	// listen for DOM changes
	app.on('attach', function DOMListener () {
		let Observe = window.MutationObserver || window.WebKitMutationObserver
		let Watcher = new Observe(function(mutations) {
			for (let changed of mutations) {
				let el = changed.target

				// watch for new chat messages
				if (el.className == "messages") app.Emit('newchat', el)

				// watch for playlist updates
				if (el.className == "songs") app.Emit('playlist')

				// watch for profile overlay insertion
				if (el.nodeName == "TITLE" && el.baseURI.indexOf('profile/') > -1) {
					app.Emit('profile', el.baseURI.split('profile/')[1])
				}
			}
		})

		Watcher.observe(document, { 
			subtree: true,
			childList: true
		})
	})

}