(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// listen.js
// intercepting tt events

module.exports = {

	// import our listeners
	__onChat: require("./listen/onChat.js"),
	__onMail: require("./listen/onMail.js"),
	__onJump: require("./listen/onJump.js"),
	__onDrop: require("./listen/onDrop.js"),
	__onSong: require("./listen/onSong.js"),
	__onSnag: require("./listen/onSnag.js"),
	__onVote: require("./listen/onVote.js"),
	__onJoin: require("./listen/onJoin.js"),
	__onLeft: require("./listen/onLeft.js"),

	__listen (event) {
		let type = event.command
		if (!event.command) return // only commands
		// custom handlers for most common events
		if (type == "speak") 		return this.__onChat(event)
		if (type == "pmmed") 		return this.__onMail(event)
		if (type == "add_dj") 	return this.__onJump(event)
		if (type == "rem_dj") 	return this.__onDrop(event)
		if (type == "nosong") 	return this.__onSong(event)
		if (type == "newsong") 	return this.__onSong(event)
		if (type == "snagged") 	return this.__onSnag(event)
		if (type == "update_votes") return this.__onVote(event)
		if (type == "deregistered") return this.__onLeft(event)
		if (type == "registered") 	return this.__onJoin(event)
		// otherwise, just emit the raw turntable data
		this.$debug(`Unhandled: ${ type }`, event)
		return this.$emit(name, { raw: event })
	},

	__bindListener () {
		this.__listener = this.__listen.bind(this)
		window.turntable.addEventListener("message", this.__listener)
	}

}
},{"./listen/onChat.js":2,"./listen/onDrop.js":3,"./listen/onJoin.js":4,"./listen/onJump.js":5,"./listen/onLeft.js":6,"./listen/onMail.js":7,"./listen/onSnag.js":8,"./listen/onSong.js":9,"./listen/onVote.js":10}],2:[function(require,module,exports){
// listen/onChat.js
// handling tt chat events

module.exports = function (event) {
	let data = { 
		text: event.text,
		ping: this.$hasPing(event.text),
		self: event.userid == this.$user().id,
		user: { id: event.userid, name: event.name }, 
		target: this.$getChat(event.text, event.name), 
		raw: event 
	}

	this.$debug(`[chat] ${ event.name }`, data)
	this.$emit("chat", data)
}
},{}],3:[function(require,module,exports){
// listen/onDrop.js
// handling a DJ leaving the deck

module.exports = function (event) {
	for (let user of event.user) {
		let data = {
			self: user.userid == this.$user().id,
			stat: this.__cacheDrop(user.userid),
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.$debug(`[drop] ${ user.name }`, data)
		this.$emit("drop", data)
	}
}
},{}],4:[function(require,module,exports){
// listen/onJoin.js
// handling user join

module.exports = function (event) {
	for (let user of event.user) {
		let data = {
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.$debug(`[join] ${ user.name }`, data)
		this.$emit("join", data)
	}
}
},{}],5:[function(require,module,exports){
// listen/onJump.js
// handling a new room DJ

module.exports = function (event) {
	for (let user of event.user) {
		let data = { 
			self: user.userid == this.$user().id,
			stat: this.__cacheJump(user.userid),
			user: { id: user.userid, name: user.name }, 
			raw: event
		}

		this.$debug(`[jump] ${ user.name }`, data)
		this.$emit("jump", data)
	}	
}
},{}],6:[function(require,module,exports){
// listen/onLeft.js
// handling user leaving

module.exports = function (event) {
	for (let user of event.user) {
		let data = {
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.$debug(`[left] ${ user.name }`, data)
		this.$emit("left", data)
	}
}
},{}],7:[function(require,module,exports){
// listen/onMail.js
// handling tt PM events

module.exports = function (event) {
	let user = event.senderid
	let data = {
		text: event.text,
		user: { id: user, name: this.$getName(user) },
		raw: event
	}

	this.$debug(`[mail] ${ name }`, data)
	this.$emit("mail", data)
}
},{}],8:[function(require,module,exports){
// listen/onSnag.js
// handling someone snagging the song

module.exports = function (event) {
	this.__cacheSnag()
	
	let user = event.userid
	let data = {
		self: user == this.$user().id,
		user: { id: user, name: this.$getName(user) },
		raw: event
	}

	this.$debug(`[snag] ${ name }`, data)
	this.$emit("snag", data)
}
},{}],9:[function(require,module,exports){
// listen/onSong.js
// handling songs (or not) starting

module.exports = function (event) {
	this.__cacheSong(event.room.metadata)

	let data = {
		curr: this.$now_playing, 
		last: this.$last_played,
		self: this.$now_playing.djid == this.$user().id,
		name: this.$now_playing.song || "Nothing",
		artist: this.$now_playing.artist || "No One",
		raw: event
	}

	this.$debug(`[song] ${ data.name }`, data)
	this.$emit("song", data)
}
},{}],10:[function(require,module,exports){
// listen/onVote.js
// handling awesome (or lame) votes

module.exports = function (event) {
	this.__cacheVote(event.room.metadata)
	// get the last vote in the list
	let list = event.room.metadata.votelog
	let [ id, vote ] = list[ list.length - 1 ]
	let user = { id, name: this.$getName(id) }
	let data = { vote, user, raw: event }
	this.$debug(`[vote] ${ user.name } (${ vote })`, data)
	this.$emit("vote", data)
}
},{}],11:[function(require,module,exports){
// mutate.js
// intercepting dom changes

module.exports = {

	// import our mutate watchers
	__onList: require("./mutate/onList.js"),
	__onText: require("./mutate/onText.js"),
	__onType: require("./mutate/onType.js"),
	__onUser: require("./mutate/onUser.js"),

	__mutate (mutations) {
		for (let changed of mutations) {
			// parse the changed element
			let element = changed.target
			let elClass = element.className
			let elTitle = element.nodeName == "TITLE"
			let profile = element.baseURI.indexOf("profile/") > 0

			if (elClass == "songs") return this.__onList()
			if (elClass == "messages") return this.__onText(element)
			if (elClass == "typeahead") return this.__onType()

			if (elTitle && profile) {
				let userid = element.baseURI.split("profile/")[1]
				return this.__onUser(userid)
			}
		}
	},

	__escape (event) {
		if (event.key != "Escape") return
		this.$emit("esc")
	},

	__bindMutation () {
		let Observe = window.MutationObserver
		if (!Observe) Observe = window.WebKitMutationObserver
		this.__mutation = new Observe(this.__mutate.bind(this))
		this.__mutation.observe(document, { subtree: true, childList: true })
		// bind up our escape handler
		this.__escaping = this.__escape.bind(this)
		$(document).on("keyup", this.__escaping)
	}
	
}
},{"./mutate/onList.js":12,"./mutate/onText.js":13,"./mutate/onType.js":14,"./mutate/onUser.js":15}],12:[function(require,module,exports){
// mutate/onList.js
// handling playlist updates

module.exports = function () {
	if (this.__listDelay) {
		clearTimeout(this.__listDelay)
		delete this.__listDelay
	}

	let onList = function () {
		let list = window.playlist.fileids
		let name = window.playlist.activePlaylist
		let data = { name, list }
		this.$debug(`[list]: ${ name }`, data)
		this.$emit("list", data)
	}

	// wait for half a second for updating to finish
	this.__listDelay = setTimeout(onList.bind(this), 500)
}
},{}],13:[function(require,module,exports){
// mutate/onText.js
// handling non-user messages

module.exports = function (target) {
	let data = { target: $(target) }
	this.$emit("text", data)
}
},{}],14:[function(require,module,exports){
// mutate/onType.js
// detecting the tt typeahead

module.exports = function () {
	this.$emit("type")
}
},{}],15:[function(require,module,exports){
// mutate/onUser.js
// detecting a user profile

module.exports = function (userid) {
	let name = this.$getName(userid)
	let data = { user: { id: userid, name } }
	this.$emit("user", data)
}
},{}],16:[function(require,module,exports){
// tt-browser-api (TBA) | a thing by pixelcrisis
// for handling turntable.fm in the web browser
const API = require("./package.json")

// first things first, import the realest
// aka all of our scripts we need to add
const REQ = {
	...require("./script/logger.js"),
	...require("./script/events.js"),
	...require("./events/listen.js"),
	...require("./events/mutate.js"),
	...require("./script/looped.js"),
	...require("./script/cached.js"),
	...require("./script/bridge.js"),
	...require("./script/notify.js"),
	...require("./script/insert.js"),
	...require("./script/loader.js"),
	...require("./script/attach.js")
}

// import our imports into the class
const ADD = function (obj, self) {
	for (let [ key, prop ] of Object.entries(obj)) {
		self[key] = prop.bind ? prop.bind(self) : prop
	}
}

class TBA {
	constructor(options = {}) {
		// apply our options
		Object.assign(this, options)
		// apply some default properties
		this.api_version = API.version
		if (!this.name) this.name = API.name
		if (!this.label) this.label = "TBA"
		ADD( REQ, this ) // bind imports
		this.$debug("Initialized")
	}
}

// export the library
module.exports = TBA
},{"./events/listen.js":1,"./events/mutate.js":11,"./package.json":17,"./script/attach.js":18,"./script/bridge.js":19,"./script/cached.js":20,"./script/events.js":21,"./script/insert.js":22,"./script/loader.js":23,"./script/logger.js":24,"./script/looped.js":25,"./script/notify.js":26}],17:[function(require,module,exports){
module.exports={
  "name": "tt-browser-api",
  "version": "0.1.0",
  "description": "A Browser-Based API Wrapper for Turntable.FM",
  "main": "index.js",
  "author": "pixelcrisis <pxcrisis@gmail.com>",
  "license": "MIT"
}

},{}],18:[function(require,module,exports){
// attach.js
// initialize with turntable

module.exports = {

	$attach () {
		// make sure that tt exists
		if (!this.__loadCore()) return false
		// find the room if tt exists
		if (!this.__loadRoom()) return this.__reattach()
		// bind up our access to turntable
		let [ named, count ] = this.__attached()
		this.$print(`Attached to ${ named } (${ count } Users)`)
		this.$emit("attach", { room: this.$room() })
	},

	$detach () {
		// un bind and remove
		this.$debug(`Detaching...`)
		clearInterval(this.__loop)
		this.__mutation.disconnect()
		$(document).off("keyup", this.__escaping)
		this.$core.removeEventListener("message", this.__listener)
		this.$print(`Detached`)
	},

	__attached () {
		this.__bindLooped()
		// bind our event handlers
		this.__bindMutation()
		this.__bindListener()
		this.__cacheRoom(this.$room().metadata)
		// return the room name and listeners
		let named = this.$room().name
		let count = this.$view().numListeners()
		return [ named, count ]
	},

	__reattach () {
		// try again until it works!
		let again = this.$attach.bind(this)
		return setTimeout(again, 200)
	}

}
},{}],19:[function(require,module,exports){
// bridge.js
// communicating with turntable

module.exports = {

	$user () { return window.turntable.user },
	$view () { return window.turntable.topViewController },
	$room () { return window.turntable.topViewController.roomData },
	$jump () { return window.turntable.topViewController.becomeDj() },
	$drop () { return window.turntable.topViewController.quitDj() },

	$vote (vote) { 
		let dn = vote == "down"
		if (dn) return CLICK(".lame-button")
		else return CLICK(".awesome-button")
	},

	$chat (text) { // send a real message
		if (text) window.turntable.sendMessage({
			api: "room.speak", text,
			roomid: this.$view().roomId,
			section: this.$view().section
		})
	},

	$batch (list) { // multiple real messages
		if (!list || !list.length) return false
		if (list.length > 3) this.$post(BATCH_ERROR)
		else list.forEach((msg, i) => {
			// delay to make sure they go in order
			setTimeout(this.$chat( msg.trim() ), i * 100)
		})
	},

	$post ({ type, head, text }) { // fake chat message
		if (!text) return false
		let html = POST_HTML(type, head, text )
		$(".chat .messages").append( html )
		this.$view().updateChatScroll()
	},
	
	$getName (id) {
		id = id || "Unknown"
		// check the room locally first
		let User = this.$view().userMap[id]
		if (User) return User.attributes.name
		// maybe they're hiding in the DMs
		let Chat = this.$core.buddyList.pmWindows
		if (Chat && Chat[id]) User = Chat[id].otherUser
		if (User) return User.attributes.name
		// we'll check the API for a name otherwise later
		// when I feel like figuring out async (todo)
		return id
	},

	$hasPing (str) { // checks for an us ping
		let list = str.split(" ") // per word
		let ping = `@${ this.$user().attributes.name }`
		return list.indexOf(ping) > -1
	},

	$getChat (text, name) { // find chat in DOM
		let query = `.message:contains("${ text }")`
		if (name) query += `:contains("${ name }")`
		return $( query ).last()
	}

}

const CLICK = vote => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(vote)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}

const POST_HTML = (type, head, text) => `
	<div class="message ${ type || "" }">
		<span class="subject">${ head || "" }</span>
		<span class="text">${ text || "" }</span>
	</div>
`

const BATCH_ERROR = {
	head: "Too Many Messages!",
	text: "Can only send up to 3 messages at a time!"
}
},{}],20:[function(require,module,exports){
// cached.js
// storing extra data and stats

module.exports = {

	$now_playing: {},
	$last_played: {},
	$current_djs: {},

	__cacheSong (room) {
		this.$last_played = { ...this.$now_playing }
		let song = room.current_song
		let last = this.$last_played

		if (!song) this.$now_playing = { none: true }
		else this.$now_playing = { 
			...song.metadata, djid: song.djid, snag: 0,
			love: room.upvotes, hate: room.downvotes
		}

		if (last.song && last.djid) {
			let dj = this.$current_djs[last.djid]
			if (dj && last.love) dj.love += last.love
			if (dj && last.hate) dj.hate += last.hate
			if (dj && last.snag) dj.snag += last.snag
			if (dj) dj.spun += 1
		}
	},

	__cacheRoom (room) {
		for (let id of room.djs) this.__cacheJump(id)
		this.__cacheSong(room)
	},

	__cacheJump (id) {
		let stat = this.$current_djs[id]
		let base = { spun: 0, love: 0, hate: 0, snag: 0 }
		this.$current_djs[id] = stat || base
		return this.$current_djs[id]
	},

	__cacheDrop (id) {
		let curr = this.$current_djs[id]
		let stat = curr ? { ...curr } : false
		if (stat) delete this.$current_djs[id]
		return stat
	},

	__cacheVote (room) {
		this.$now_playing.love = room.upvotes
		this.$now_playing.hate = room.downvotes
	},

	__cacheSnag () {
		this.$now_playing.snag += 1
	}
	
}
},{}],21:[function(require,module,exports){
// events.js
// the TBA event bus

module.exports = {

	__events: {},

	$on (names, funcs) {
		// force arrays for single strings
		if (!Array.isArray(names)) names = [ names ]
		if (!Array.isArray(funcs)) funcs = [ funcs ]
		names.forEach(name => {
			let list = this.__events[name]
			if (!list) this.__events[name] = list = []
			funcs.forEach(func => list.push( func.bind(this) ))
		})
	},

	$emit (name, ...args) {
		let list = this.__events[name] || false
		// attempt to handle errors with try / catch
		if (list) for (let func of list) {
			try { func(...args) }
			catch (e) { this.$error(`Event (${ name })`, e) }
		}
	}

}
},{}],22:[function(require,module,exports){
// insert.js
// modifying the turntable DOM

module.exports = {

	$body (name, on) { // DOM body classes
		let has = $("body").hasClass(name)
		if (on && !has) $("body").addClass(name)
		if (!on && has) $("body").removeClass(name)
	},

	$sheet (path = "#", type) { // insert a stylesheet
		// if we have a type, only include one
		let curr = type ? $(`#${ type }`) : false
		if (path != "#") this.$debug(`Inserting Stylesheet`, { path, type })
		if (curr && curr.length) curr.attr("href", path)
		else document.head.append( SHEET_HTML(path, type) )
	},

	$style (style = "", type) { // inject style tags 
		// if we have a type, only include one set
		let curr = type ? $(`#${ type }`)[0] : false
		if (style) this.$debug(`Injecting CSS`, { style, type })
		if (curr) curr.innerHTML = style
		else document.head.append( STYLE_HTML(style, type) )
	}

}

const SHEET_HTML = (path, type) => {
	let elem = document.createElement("link")
	if (type) elem.id = type
	elem.type = "text/css"
	elem.rel = "stylesheet"
	elem.href = path
	return elem
}

const STYLE_HTML = (style, type) => {
	let elem = document.createElement("style")
	if (type) elem.id = type
	elem.type = "text/css"
	elem.innerHTML = style
	return elem
}
},{}],23:[function(require,module,exports){
// loader.js
// waiting for turntable

module.exports = {

	__loadInit () {
		// we've officially started
		// who knows how long it'll take?
		this.$print("Finding Turntable...")
		this.loading = true
		this.$emit("load")
	},

	__loadCore () {
		if (!this.loading) this.__loadInit()
		// we can only do like....3 things in the lobby
		if ($( LOBBY ).length) return this.__loadLobby()
		// don't check if we already have
		if (this.$core) return this.$core
		// if turntable doesn't exist, what do?
		if (!window.turntable) return this.__loadFail()
		// but hey, now we can find our room
		this.$debug("Looking For Room...")
		this.$core = window.turntable
		return this.$core
	},

	__loadRoom () {
		// just make sure everything we need
		// has been loaded into the DOM first
		if (!this.$user()) return false
		if (!this.$view() || !this.$view().roomId) return false
		const room = window.turntable.topViewController.roomView
		if (!room || !room.roomData) return false
		else this.$debug("Found Room", room.roomData)
		return this.$room()
	},

	__loadFail () {
		this.$error("Turntable Not Found")
		this.loading = false
		return false
	},

	__loadLobby () {
		this.$print("Attached To Lobby")
		this.loading = false
		this.$emit("lobby")
		return false
	}

}

// the lobby defining selector
const LOBBY = "#turntable #topBG"
},{}],24:[function(require,module,exports){
// logger.js
// handles printing logs

module.exports = {

	$logs: [],

	$debug (text, data) {
		this.__log("debug", text, data)
	},

	$print (text, data) {
		this.__log("print", text, data)
	},

	$error (text, data) {
		this.__log("error", text, data)
	},

	__log (type, text, data) {
		let time = new Date().toLocaleTimeString("en-us").split(" ")[0]
		this.$logs.push({ type, text, data, time })
		this.$emit("log", { type, text, data, time })
		if (type == "debug" && !this.debugging) return
		let send = [ LOG( time, this.label, text ), CSS[ type ] ]
		if (data) send.push(type == "error" ? data : { data })
		if (type == "error") return console.error( ...send )
		if (type == "debug") return console.info( ...send )
		if (type == "print") return console.log( ...send )
	}

}

const LOG = (time, label, text) => {
	return `%c${ label } (${ time }) :: ${ text }`
}

const CSS = {
	debug: "color: grey;",
	print: "font-weight: bold;",
	error: "font-weight: bold;"
}
},{}],25:[function(require,module,exports){
// looped.js
// doing something every minute

module.exports = {

	__beat: 0,

	__looped () {
		this.__beat += 1
		let data = { beat: this.__beat }
		this.$emit("loop", data)
	},

	__bindLooped () {
		let time = 60 * 1000 // one minute
		let loop = this.__looped.bind(this)
		this.__loop = setInterval(loop, time)
	}

}
},{}],26:[function(require,module,exports){
// notify.js
// desktop notifications!

module.exports = {

	$notify ({ head, text, type, icon }) {
		// send a desktop notification from turntable
		if (!head || !text) return // sending what?
		if (!this.__canNotify() || document.hasFocus()) return
		// wrap in a function for use with delay
		let send = () => {
			icon = icon || this.icon || ""
			let sent = new Notification(head, { body: text, icon })
			sent.onclick = () => { window.focus(); sent.close(); }
		}
		if (!type) send()
		else this.__delayNotify(send, type)
	},

	$bully (alert) {
		this.$post(alert) // send both a post
		this.$notify(alert) // and a notification
	},

	__canNotify () {
		// check for notification permissions
		if (!"Notification" in window) return false
		if (Notification.permission == "denied") return false
		if (Notification.permission == "default") {
			// ask for permissions
			this.$print(`Requesting Notification Permissions`)
			Notification.requestPermission()
			return false
		}
		return true
	},

	__delayNotify (notify, type) {
		if (!this._holding) this._holding = {}
		if (this._holding[type]) return false
		// set a self-destructing delay
		let timeout = 5 * 1000 // 5 seconds
		let cleared = () => { delete this._holding[type] }
		this._holding[type] = setTimeout(cleared.bind(this), timeout)
		return notify()
	}

}


},{}],27:[function(require,module,exports){
module.exports = TS => {

  // import our config
  TS.default = require("./confs/default.json")
  TS.options = require("./confs/options.json")
  // and our other jsons
  TS.static = require("./confs/static.json")
  TS.patrons = require("./confs/patrons.json")
  // convert some to maps
  const emoji = require("./confs/emoji.json")
  TS.twitchMap = new Map(emoji.twitch)
  TS.bttvMap = new Map(emoji.bttv)

  // import our core scripts
  require("./utility.js")(TS)
  require("./theming.js")(TS)
  require("./storage.js")(TS)
  require("./backups.js")(TS)
  require("./migrate.js")(TS)

  // import our panel scripts
  require("./panel/panel.js")(TS)
  require("./panel/inputs.js")(TS)
  require("./panel/hotbar.js")(TS)
  require("./panel/tabbed.js")(TS)
  require("./panel/window.js")(TS)

}
},{"./backups.js":28,"./confs/default.json":29,"./confs/emoji.json":30,"./confs/options.json":31,"./confs/patrons.json":32,"./confs/static.json":33,"./migrate.js":34,"./panel/hotbar.js":35,"./panel/inputs.js":36,"./panel/panel.js":37,"./panel/tabbed.js":38,"./panel/window.js":46,"./storage.js":47,"./theming.js":48,"./utility.js":49}],28:[function(require,module,exports){
module.exports = TS => {

	TS.backupData = function () {
		// backup the configs to a JSON file
		let config = JSON.stringify(this.config)
		let backup = new Blob([ config ], { type: "text/json" })
		return DOWNLOAD_FILE(backup)
	}

	TS.uploadData = function () {
		// read configs from a JSON file
		let file = $("#tsBackup input")[0].files[0]
		if (!file) return alert("Select Backup File First!")
		this.$debug("Restoring Backup...")
		let Reader = new FileReader()
		Reader.onload = this.restoreData.bind(this)
		Reader.readAsText(file)
	}

	TS.restoreData = function (file) {
		let data = file.target.result
		try { data = JSON.parse(data) }
		catch(e) { return alert("Backup Corrupted") }
		if (!"theme" in data) return alert("Invalid Backup")
		let curr = data.version == 12 ? data : {}
		if (!curr.version) this.Migrate(data)
		this.updateData(curr)
	}

	TS.updateData = function (data = {}) {
		// update config with new config data
		for (let prop in data) this.config[prop] = data[prop]
		let store = JSON.stringify(this.config)
		window.localStorage.setItem("tsData", store)
		return this.Reload()
	}

	TS.resetData = function () {
		// reset config to defaults
		if (window.confirm( WARN_RESET )) {
			this.updateData(this.default)
		}
	}

	TS.deleteData = function () {
		// destroy database start over
		if (window.confirm( WARN_DELETE )) {
			window.localStorage.setItem("tsWipe", true)
			window.localStorage.removeItem("tsData")
			window.location.reload()
		}
	}

}

const DOWNLOAD_FILE = file => {
	// we can direct download with windows
	let windows = window.navigator.msSaveBlob
	if (windows) return windows(file)
	// otherwise we go via HTML5
	let tmp = window.document.createElement("a")
	tmp.href = window.URL.createObjectURL(file)
	tmp.download = "tsData.json"
	document.body.appendChild(tmp)
	tmp.click()
	document.body.removeChild(tmp)
}

const WARN_RESET = `WARNING: You're about to reset your turnStyles Data! 
Clicking "OK" will reset turnStyles to default and reload the extension!
Click "CANCEL" if this is not what you intended to do!`

const WARN_DELETE = `WARNING: You're about to DELETE the turnStyles DATABASE!
THIS WILL RELOAD THE WEB PAGE! USE AS A LAST RESORT!
Click "OK" to delete the turnStyles DB and start over!
Click "CANCEL" to go back to turntable!`
},{}],29:[function(require,module,exports){
module.exports={
	"debug": false,
	"isfan": false,
	"theme": "dark",
	"color": "",
	"style": "",

	"autobop": true,

	"use.emojis": true,
	"use.volume": false,
	"use.recent": false,
	"use.stamps": true,

	"afk.auto": 0,
	"afk.idle": false,
	"afk.text": "I'm AFK - Back in a sec!",

	"dj.next": false,
	"dj.done": false,
	"dj.auto": false,
	"dj.text": "Hey @user - it's your turn!",

	"on.pm": false,
	"on.song": false,
	"on.mention": false,
	"on.text": "",

	"post.song": false,
	"post.spun": false,
	"post.snag": false,
	"post.join": false,
	"post.left": false,

	"qtbtn1": "Welcome || Welcome to my room!",
	"qtbtn2": "Label || Your Message",
	"qtbtn3": "Label || Message 1 ;; Message 2 ;; Message 3",

	"hb.qtbtn1": false,
	"hb.qtbtn2": false,
	"hb.qtbtn3": false,
	"hb.autobop": true,
	"hb.afk.idle": true,
	"hb.dj.next": true,
	"hb.dj.done": true,
	"hb.dj.auto": true,
	"hb.people": false,
	"hb.player": false,
	"hb.bubble": false,
	"hb.share": true,

	"hide.people": false,
	"hide.player": false,
	"hide.bubble": false,
	"show.logger": false,

	"note.on": 0,
	"note.text": "Today's theme is: Cool."
}
},{}],30:[function(require,module,exports){
module.exports={
	"bttv": [
		[ "tf", "54fa8f1401e468494b85b537" ],
		[ "cigrip", "54fa8fce01e468494b85b53c" ],
		[ "datsauce", "54fa903b01e468494b85b53f" ],
		[ "foreveralone", "54fa909b01e468494b85b542" ],
		[ "gaben", "54fa90ba01e468494b85b543" ],
		[ "hailhelix", "54fa90f201e468494b85b545" ],
		[ "shoopdawhoop", "54fa932201e468494b85b555" ],
		[ "m&mjc",  "54fab45f633595ca4c713abc"],
		[ "bttvnice", "54fab7d2633595ca4c713abf" ],
		[ "twat", "54fa935601e468494b85b557" ],
		[ "watchusay", "54fa99b601e468494b85b55d" ],
		[ "tehpolecat", "566ca11a65dbbdab32ec0558" ],
		[ "angelthump", "566ca1a365dbbdab32ec055b" ],
		[ "taxibro", "54fbefeb01abde735115de5b" ],
		[ "brobalt", "54fbf00a01abde735115de5c" ],
		[ "candianrage", "54fbf09c01abde735115de61" ],
		[ "vislaud", "550352766f86a5b26c281ba2" ],
		[ "karappa", "550b344bff8ecee922d2a3c1" ],
		[ "fishmoley", "566ca00f65dbbdab32ec0544" ],
		[ "hhhehehe", "566ca02865dbbdab32ec0547" ],
		[ "kkona", "566ca04265dbbdab32ec054a" ],
		[ "poledoge", "566ca09365dbbdab32ec0555" ],
		[ "sosgame", "553b48a21f145f087fc15ca6" ],
		[ "cruw", "55471c2789d53f2d12781713" ],
		[ "rarepepe", "555015b77676617e17dd2e8e" ],
		[ "hahaa", "555981336ba1901877765555" ],
		[ "feelsbirthdayman", "55b6524154eefd53777b2580" ],
		[ "ronsmug", "55f324c47f08be9f0a63cce0" ],
		[ "kappacool", "560577560874de34757d2dc0" ],
		[ "feelsbadman", "566c9fc265dbbdab32ec053b" ],
		[ "burself", "566c9f3b65dbbdab32ec052e" ],
		[ "concerndoge", "566c9f6365dbbdab32ec0532" ],
		[ "feelsgoodman", "566c9fde65dbbdab32ec053e" ],
		[ "firespeed", "566c9ff365dbbdab32ec0541" ],
		[ "nam", "566ca06065dbbdab32ec054e" ],
		[ "sourpls", "566ca38765dbbdab32ec0560" ],
		[ "feelssnowman", "566dde0e65dbbdab32ec068f" ],
		[ "feelssnowyman", "566decae65dbbdab32ec0699" ],
		[ "sosnowy", "567b5b520e984428652809b6" ],
		[ "saltycorn", "56901914991f200c34ffa656" ],
		[ "monkas", "56e9f494fff3cc5c35e5287e" ],
		[ "vapenation", "56f5be00d48006ba34f530a4" ],
		[ "ariw", "56fa09f18eff3b595e93ac26" ],
		[ "notsquishy", "5709ab688eff3b595e93c595" ],
		[ "feelsamazingman", "5733ff12e72c3c0814233e20" ],
		[ "duckerz", "573d38b50ffbf6cc5cc38dc9" ],
		[ "icecold", "5849c9a4f52be01a7ee5f79d" ],
		[ "sqshy", "59cf182fcbe2693d59d7bf46" ],
		[ "wowee", "58d2e73058d8950a875ad027" ],
		[ "wubtf", "5dc36a8db537d747e37ac187" ],
		[ "cvr", "5e76d2ab8c0f5c3723a9a87d" ],
		[ "cvl", "5e76d2d2d112fc372574d222" ],
		[ "cvhazmat", "5e76d338d6581c3724c0f0b2" ],
		[ "cvmask", "5e76d399d6581c3724c0f0b8" ],
		[ "dogchamp", "5ffdf28dc96152314ad63960" ],

		[ "fubaldi", "5f1caf2d713a6144748a2372" ],
		[ "baomn", "5f30ac02fe85fb4472d27d16" ],
		[ "crawlers", "5f30ae9e6f37824466029865" ],
		[ "checkers", "5f30afaa65fe924464efae58" ],
		[ "kissapregomie", "5f30b03d6f37824466029880" ],
		[ "pettheeddie", "5f30b0eacf6d2144653e6f92" ],
		[ "solarflare", "5f30b6c865fe924464efaec9" ],
		[ "petthebaldie", "5f30b844cf6d2144653e6fef" ],
		[ "raremoon", "5f30b90ffe85fb4472d27dce" ],
		[ "eddieknead", "5f30ba4ffe85fb4472d27dda" ],
		[ "baldfloss", "5f30c16f6f37824466029992" ],
		[ "coomtime", "5f30c24ccf6d2144653e70a1" ],
		[ "humpers", "5f30cfc2713a6144748b5028" ],
		[ "balddab", "5f30d8791ab9be446c4eb078" ],
		[ "baldflick", "5f30d8e1cf6d2144653e71b8" ],
		[ "eddiespin", "5f30df5b65fe924464efb0dd" ],
		[ "feelsayayaman", "5f30e087713a6144748b50ce" ],
		[ "bropls", "5f30e22865fe924464efb100" ],
		[ "eddiebaldmansmash", "5f30ebbacf6d2144653e725a" ],
		[ "moon2bass", "5f31e0f68abf185d76c680cf" ],
		[ "sneakers", "5f3c69a6afb6965d6e7c100d" ],
		[ "catjam", "5f41c91bf93bbe5d717f8a09" ],
		[ "peepoboom", "5f4ef4c1aa6fe06bfb5f8df4" ],
		[ "doubters", "5f5ad9080b77be6bfcad897e" ],
		[ "eekum", "5f5c0dc468d9d86c020e58ec" ],
		[ "moon2scoots", "5f6145b16084af6c171a58f9" ],
		[ "baldyikes", "5f6937288d3e1b709d8e731c" ],
		[ "speeders", "5f6e01ec239b210b0de66bca" ],
		[ "baners", "5f76b04eccde1f4a870bf570" ],
		[ "mariorun", "5f79098897f70a4a9be7f410" ],
		[ "peeponarusprint", "5f790a01e016be4a882f04f5" ],
		[ "flappers", "5f791fe1e9c9344a8f34f563" ],
		[ "twerkers", "5f8a6c38473f4802fe4713c6" ],
		[ "vibers", "5f8a6cdf710f8302f0c87068" ],
		[ "baldspin", "5f8a6d0d6f583802e38905dd" ],
		[ "pettheqynoa", "5fae06b5f32aa26441c89258" ],
		[ "qynoalurks", "5fae06df4dfba1644029ccef" ],
		[ "ayayajam", "5fb639f72d6c386f224a0679" ],
		[ "notsure", "5fb640fc2d6c386f224a06cc" ],
		[ "pepemetal", "5fb6414ff096f76f0d1bd1c0" ],
		[ "peepogolfclap", "5fb64523f096f76f0d1bd1f6" ],
		[ "soulshroom", "5fbc901de2900c6f07df72e6" ],
		[ "pepelepsy", "5fc1a3660d141d6f06d87397" ],
		[ "tanties", "5ff0e2539d7d952e405a1e7c" ],
		[ "shushers", "5ff0e27bbe65982e48cf1431" ],
		[ "baldyappp", "5ff0e2c1be65982e48cf143e" ],
		[ "monaks", "5ff0e34c3edf1a2e56b7af2a" ],
		[ "deskchan", "5ff0e4299d7d952e405a1ec3" ],
		[ "pepw", "5ff0e4c5f58a572e54214737" ],
		[ "lgiggle", "5ff0e4faf58a572e54214743" ],
		[ "shruggers", "5ff0e50f3edf1a2e56b7af83" ],
		[ "pukers", "5ff0e51f5ae5852e41549e31" ],
		[ "peepocheering", "5ff0e545f58a572e5421474e" ],
		[ "prayge", "5ff0e5a1f58a572e5421475b" ],
		[ "yappp", "5ff0e6a35ae5852e41549e5f" ],
		[ "geckw", "5ff0e704be65982e48cf14dc" ],
		[ "komodochomp", "5ff0e76cbe65982e48cf14e9" ],
		[ "omegapoggers", "5ff120aaf58a572e54214def" ],
		[ "peepeegachat", "5ff66346644cbf2fc687bff4" ],
		[ "tinyteeth", "5ffd116a30e9273179cdc63f" ],
		[ "feelsgoogman", "5ffd143ac12abd316340578a" ],
		[ "hypernopers", "60016b8dc96152314ad671e5" ],
		[ "hypernodders", "6001f12a3928fb3152de23a7" ],
		[ "hyperpeepod", "60037536c96152314ad6956d" ],
		[ "pepephoner", "600f796f6c75a765d463bdd4" ],
		[ "peepersd", "60172c8b8a320865dcf41961" ],
		[ "gamba", "60172ffbf1cfbf65dbe14586" ],
		[ "vanish", "6032f4bf7c74605395f31f2b" ],
		[ "copege", "6032fa797c74605395f31f5f" ],
		[ "wicked", "6032fab47c74605395f31f61" ],
		[ "hard", "603301507c74605395f31fa1" ],
		[ "kissabrother", "603306de7c74605395f31fbb" ],
		[ "teatime", "60333b0d7c74605395f320ea" ],
		[ "teatime2", "60333b377c74605395f320ec" ],
		[ "guitartime", "6033439f7c74605395f3210f" ],
		[ "okayge", "603349ea7c74605395f32129" ],
		[ "click", "60334fb57c74605395f32152" ],
		[ "easy", "603461887c74605395f329e6" ],
		[ "peeposteer", "6035a63a7c74605395f33357" ],
		[ "gawkgawk", "605008f0306b602acc59dbb9" ],
		[ "mahalo", "605a6e997493072efdeb3476" ],
		[ "wowers", "6063a39fa407570b72f282c7" ],
		[ "aaugh", "6063aa98a407570b72f28321" ],
		[ "peepees", "6063b0c3a407570b72f2837a" ],
		[ "noted", "60665f35a407570b72f296a0" ],
		[ "robpls", "606fc2ce39b5010444cfbb8c" ],
		[ "refracting", "609f0faf67644f1d67e86529" ],
		[ "grumpge", "60a7548f67644f1d67e8a27f" ],
		[ "eato", "60b44a3ff8b3f62601c35f26" ],
		[ "deadlole", "60e10bf58ed8b373e421d4a8" ],
		[ "corpa", "6121e47e76ea4e2b9f78a35f" ],
		[ "peeposhy", "6126e9e8af28e956864a23bf" ],
		[ "borpau", "612d6dc1af28e956864b0fac" ],
		[ "slap", "6132f9c3af28e956864bd1b2" ],
		[ "kachorpa", "6136f959af28e956864c563f" ],
		[ "geckpog", "615b961fb63cc97ee6d4dc42" ],
		[ "elyouel", "61871d291f8ff7628e6cc518" ],
		[ "hunger", "61eb460806fd6a9f5be1a098" ],
		[ "potl", "6222a4be06fd6a9f5be6348a" ]
	],
	"twitch": [
	  [ "jkanstyle", 15 ],
	  [ "optimizeprime", 16 ],
	  [ "stonelightning", 17 ],
	  [ "theringer", 18 ],
	  [ "redcoat", 22 ],
	  [ "kappa", 25 ],
	  [ "joncarnage", 26 ],
	  [ "mrdestructoid", 28 ],
	  [ "bcwarrior", 30 ],
	  [ "gingerpower", 32 ],
	  [ "dansgame", 33 ],
	  [ "swiftrage", 34 ],
	  [ "pjsalt", 36 ],
	  [ "kevinturtle", 40 ],
	  [ "kreygasm", 41 ],
	  [ "ssssss", 46 ],
	  [ "punchtrees", 47 ],
	  [ "arsonnosexy", 50 ],
	  [ "smorc", 52 ],
	  [ "frankerz", 65 ],
	  [ "onehand", 66 ],
	  [ "bloodtrail", 69 ],
	  [ "dbstyle", 73 ],
	  [ "asianglow", 74 ],
	  [ "biblethump", 86 ],
	  [ "shazbotstix", 87 ],
	  [ "pmstwin", 92 ],
	  [ "fungineer", 244 ],
	  [ "residentsleeper", 245 ],
	  [ "4head", 354 ],
	  [ "hotpokket", 357 ],
	  [ "failfish", 360 ],
	  [ "daesuppy", 973 ],
	  [ "wholewheat", 1896 ],
	  [ "thunbeast", 1898 ],
	  [ "tf2john", 1899 ],
	  [ "ralpherz", 1900 ],
	  [ "kippa", 1901 ],
	  [ "keepo", 1902 ],
	  [ "bigbrother", 1904 ],
	  [ "sobayed", 1906 ],
	  [ "peopleschamp", 3412 ],
	  [ "grammarking", 3632 ],
	  [ "panicvis", 3668 ],
	  [ "anele", 3792 ],
	  [ "brokeback", 4057 ],
	  [ "pipehype", 4240 ],
	  [ "youwhy", 4337 ],
	  [ "ritzmitz", 4338 ],
	  [ "elegiggle", 4339 ],
	  [ "thething", 7427 ],
	  [ "hassaanchop", 20225 ],
	  [ "babyrage", 22639 ],
	  [ "panicbasket", 22998 ],
	  [ "permasmug", 27509 ],
	  [ "buddhabar", 27602 ],
	  [ "wutface", 28087 ],
	  [ "prchase", 28328 ],
	  [ "mau5", 30134 ],
	  [ "heyguys", 30259 ],
	  [ "notatk", 34875 ],
	  [ "mcat", 35063 ],
	  [ "ttours", 38436 ],
	  [ "praiseit", 38586 ],
	  [ "corgiderp", 49106 ],
	  [ "argieb8", 51838 ],
	  [ "shadylulu", 52492 ],
	  [ "kappapride", 55338 ],
	  [ "coolcat", 58127 ],
	  [ "dendiface", 58135 ],
	  [ "notlikethis", 58765 ],
	  [ "ripepperonis", 62833 ],
	  [ "dududu", 62834 ],
	  [ "bleedpurple", 62835 ],
	  [ "twitchraid", 62836 ],
	  [ "seemsgood", 64138 ],
	  [ "minglee", 68856 ],
	  [ "kappaross", 70433 ],
	  [ "kappaclaus", 74510 ],
	  [ "ohmydog", 81103 ],
	  [ "osfrog", 81248 ],
	  [ "serioussloth", 81249 ],
	  [ "komodohype", 81273 ],
	  [ "vohiyo", 81274 ],
	  [ "mikehogu", 81636 ],
	  [ "kappawealth", 81997 ],
	  [ "cmonbruh", 84608 ],
	  [ "smoocherz", 89945 ],
	  [ "nomnom", 90075 ],
	  [ "stinkycheese", 90076 ],
	  [ "cheffrank", 90129 ],
	  [ "futureman", 98562 ],
	  [ "opieop", 100590 ],
	  [ "doritoschip", 102242 ],
	  [ "pjsugar", 102556 ],
	  [ "voteyea", 106293 ],
	  [ "votenay", 106294 ],
	  [ "rulefive", 107030 ],
	  [ "dxcat", 110734 ],
	  [ "drinkpurple", 110785 ],
	  [ "tinyface", 111119 ],
	  [ "picomause", 111300 ],
	  [ "thetarfu", 111351 ],
	  [ "datsheffy", 111700 ],
	  [ "unsane", 111792 ],
	  [ "copythis", 112288 ],
	  [ "pastathat", 112289 ],
	  [ "imglitch", 112290 ],
	  [ "giveplz", 112291 ],
	  [ "takenrg", 112292 ],
	  [ "blargnaut", 114738 ],
	  [ "dogface", 114835 ],
	  [ "jebaited", 114836 ],
	  [ "toospicy", 114846 ],
	  [ "wtruck", 114847 ],
	  [ "unclenox", 114856 ],
	  [ "raccattack", 114870 ],
	  [ "strawbeary", 114876 ],
	  [ "primeme", 115075 ],
	  [ "brainslug", 115233 ],
	  [ "batchest", 115234 ],
	  [ "curselit", 116625 ],
	  [ "poooound", 117484 ],
	  [ "freakinstinkin", 117701 ],
	  [ "supervinlin", 118772 ],
	  [ "trihard", 120232 ],
	  [ "coolstorybob", 123171 ],
	  [ "itsboshytime", 133468 ],
	  [ "kapow", 133537 ],
	  [ "youdontsay", 134254 ],
	  [ "uwot", 134255 ],
	  [ "rlytho", 134256 ],
	  [ "partytime", 135393 ],
	  [ "ninjagrumpy", 138325 ],
	  [ "mvgame", 142140 ],
	  [ "tbangel", 143490 ],
	  [ "theilluminati", 145315 ],
	  [ "morphintime", 156787 ],
	  [ "thankegg", 160392 ],
	  [ "begwan", 160394 ],
	  [ "bigphish", 160395 ],
	  [ "inuyoface", 160396 ],
	  [ "kappu", 160397 ],
	  [ "koncha", 160400 ],
	  [ "punoko", 160401 ],
	  [ "sabaping", 160402 ],
	  [ "tearglove", 160403 ],
	  [ "tehepelo", 160404 ],
	  [ "twitchlit", 166263 ],
	  [ "carlsmile", 166266 ],
	  [ "crreamawk", 191313 ],
	  [ "squid1", 191762 ],
	  [ "squid2", 191763 ],
	  [ "squid3", 191764 ],
	  [ "squid4", 191767 ],
	  [ "twitchunity", 196892 ],
	  [ "tpcrunchyroll", 323914 ],
	  [ "entropywins", 376765 ],
	  [ "lul", 425618 ],
	  [ "powerupr", 425671 ],
	  [ "powerupl", 425688 ],
	  [ "hscheers", 444572 ],
	  [ "hswp", 446979 ],
	  [ "darkmode", 461298 ],
	  [ "twitchvotes", 479745 ],
	  [ "tpfufun", 508650 ],
	  [ "redteam", 530888 ],
	  [ "greenteam", 530890 ],
	  [ "purplestar", 624501 ],
	  [ "fbtouchdown", 626795 ],
	  [ "popcorn", 724216 ],
	  [ "tombraid", 864205 ],
	  [ "earthday", 959018 ],
	  [ "partyhat", 965738 ],
	  [ "mercywing1", 1003187 ],
	  [ "mercywing2", 1003189 ],
	  [ "pinkmercy", 1003190 ],
	  [ "bisexualpride", 1064987 ],
	  [ "lesbianpride", 1064988 ],
	  [ "gaypride", 1064991 ],
	  [ "transgenderpride", 1064995 ],
	  [ "asexualpride", 1130348 ],
	  [ "pansexualpride", 1130349 ],
	  [ "twitchrpg", 1220086 ],
	  [ "intersexpride", 1221184 ],
	  [ "maxlol", 1290325 ],
	  [ "nonbinarypride", 1297279 ],
	  [ "genderfluidpride", 1297281 ],
	  [ "fbrun", 1441261 ],
	  [ "fbpass", 1441271 ],
	  [ "fbspiral", 1441273 ],
	  [ "fbblock", 1441276 ],
	  [ "fbcatch", 1441281 ],
	  [ "fbchallenge", 1441285 ],
	  [ "fbpenalty", 1441289 ],
	  [ "pixelbob", 1547903 ],
	  [ "gunrun", 1584743 ],
	  [ "holidaycookie", 1713813 ],
	  [ "holidaylog", 1713816 ],
	  [ "holidayornament", 1713818 ],
	  [ "holidaypresent", 1713819 ],
	  [ "holidaysanta", 1713822 ],
	  [ "holidaytree", 1713825 ],
	  [ "soonerlater", 2113050 ],
	  [ "twitchsings", 300116344 ],
	  [ "singsmic", 300116349 ],
	  [ "singsnote", 300116350 ],
	  [ "porschewin", 300745158 ],
	  [ "bop", 301428702 ],
	  [ "virtualhug", 301696583 ],
	  [ "extralife", 302426269 ],
	  [ "blacklivesmatter", 302537250 ],
	  [ "football", 302628600 ],
	  [ "footyellow", 302628613 ],
	  [ "footgoal", 302628617 ],
	  [ "showofhands", 303564554 ],
	  [ "glitchcat", 304486301 ],
	  [ "stinkyglitch", 304486324 ],
	  [ "glitchlit", 304489128 ],
	  [ "glitchnrg", 304489309 ],
	  [ "pogchamp", 305954156 ]
	]
}
},{}],31:[function(require,module,exports){
module.exports={
	"theme": [
		{ "label": "Theme: Disabled", "value": "" },
		{ "label": "Theme: Dark Mode", "value": "dark" },
		{ "label": "Theme: Night Mode", "value": "night" },
		{ "label": "Theme: Cosmic", "value": "cosmic" },
		{ "label": "Theme: Forest", "value": "forest" },
		{ "label": "Theme: Midnight", "value": "midnight" }
	],
	"color": [
		{ "label": "Color: Disabled", "value": "" },
		{ "label": "Color: Blue", "value": "blue" },
		{ "label": "Color: Pink", "value": "pink" },
		{ "label": "Color: Green", "value": "green" },
		{ "label": "Color: Purple", "value": "purple" },
		{ "label": "Color: Teal", "value": "teal" }
	],
	"times": [
		{ "label": "Disabled", "value": 0 },
		{ "label": "15 Minutes", "value": 15 },
		{ "label": "30 Minutes", "value": 30 },
		{ "label": "60 Minutes", "value": 60 },
		{ "label": "90 Minutes", "value": 90 },
		{ "label": "120 Minutes", "value": 120 }
	]
}
},{}],32:[function(require,module,exports){
module.exports={
  "6042cdc3c2dbd9001bb37880": { "name": "pxcrisis" },
  "604207043f4bfc001c3a8704": { "name": "chef_nilo" }
}
},{}],33:[function(require,module,exports){
module.exports={
	"author":    "6042cdc3c2dbd9001bb37880",

	"website":	 "https://turnstyles.xyz",
	"patreon":	 "https://patreon.com/pixelcrisis",
	
	"chrome":		 "https://chrome.google.com/webstore/detail/turntable-tweaks/pmlkackfnbbnjfejpddpakallilkbdme",
	
	"firefox":	 "https://addons.mozilla.org/en-US/firefox/addon/turnstyles-for-turntable-fm/",

	"ttDiscord": "https://discord.gg/jnRs4WnPjM",
	"tsDiscord": "https://discord.gg/wqmAVvgSbE"
}
},{}],34:[function(require,module,exports){
module.exports = TS => {

	TS.Migrate = function (old) {
		let ver = this.config.version
		let tmp = window.localStorage.getItem("tsdb")
		if (tmp) old = JSON.parse(tmp)
		if (isNaN(ver)) ver = 11
		if (ver < 12 || old) this.migrate12(old)
		if (tmp) window.localStorage.removeItem("tsdb")
	}

	TS.migrate12 = function(old) {
		if (!old) return false

		if ("debug" in old) this.config["debug"] = old.debug
		if ("theme" in old) this.config["theme"] = old.theme
		if ("style" in old) this.config["color"] = old.style
		if ("u_css" in old) this.config["style"] = old.u_css

		if ("auto_b" in old) this.config["autobop"] = old.auto_b

		if ("emojis" in old) this.config["use.emojis"] = old.emojis
		if ("volume" in old) this.config["use.volume"] = old.volume
		if ("played" in old) this.config["use.recent"] = old.played
		if ("stamps" in old) this.config["use.stamps"] = old.stamps
		if ("logger" in old) this.config["use.logger"] = old.logger

		if ("afkstr" in old) this.config["afk.text"] = old.afkstr
		if ("afkmax" in old) this.config["afk.auto"] = old.afkmax

		if ("auto_q" in old) this.config["dj.auto"] = old.auto_q
		if ("q_text" in old) this.config["dj.text"] = old.q_text

		if ("people" in old) this.config["show.people"] = old.people
		if ("player" in old) this.config["show.player"] = old.player
		if ("bubble" in old) this.config["show.bubble"] = old.bubble

		if ("qtbtns" in old) {
			if (old.qtbtns.qtbtn1) this.config["qtbtn1"] = old.qtbtns.qtbtn1
			if (old.qtbtns.qtbtn2) this.config["qtbtn2"] = old.qtbtns.qtbtn2
			if (old.qtbtns.qtbtn3) this.config["qtbtn3"] = old.qtbtns.qtbtn3
		}

		if ("timing" in old) {
			this.config["note.on"] = old.timing.post
			this.config["note.text"] = old.timing.text
		}

		if ("notify" in old) {
			this.config["on.pm"] = old.notify.ding
			this.config["on.song"] = old.notify.song
			this.config["on.mention"] = old.notify.chat
			this.config["on.text"] = old.notify.text
		}

		if ("alerts" in old) {
			this.config["post.song"] = old.alerts.song
			this.config["post.spun"] = old.alerts.spun
			this.config["post.snag"] = old.alerts.snag
			this.config["post.join"] = old.alerts.join
			this.config["post.left"] = old.alerts.left
		}

		if ("hotbar" in old) {
			this.config["hb.qtbtn1"] = old.hotbar.qtbtn1
			this.config["hb.qtbtn2"] = old.hotbar.qtbtn2
			this.config["hb.qtbtn3"] = old.hotbar.qtbtn3
			this.config["hb.autobop"] = old.hotbar.auto_b
			this.config["hb.afk.idle"] = old.hotbar.is_afk
			this.config["hb.dj.next"] = old.hotbar.nextdj
			this.config["hb.dj.done"] = old.hotbar.escort
			this.config["hb.dj.auto"] = old.hotbar.auto_q
			this.config["hb.people"] = old.hotbar.people
			this.config["hb.player"] = old.hotbar.player
			this.config["hb.bubble"] = old.hotbar.bubble
		}

		this.$debug("Migrated DB to v12")
		this.config.version = 12
	}

}
},{}],35:[function(require,module,exports){
module.exports = TS => {

  TS.loadHotBar = function () {
    $("#tsHotBar, .ts-menu").remove()
    $(".header-bar").append( this.makeHotBar() )
    $("#settings .dropdown ul li").first().before( this.makeButton() )

    $(".ts-menu").on("click", this.showPanel)
    $("#tsHotBar *[data-for]").on("click", this.savePanel.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.savePanel.bind(this))

    this.$body("hb-qtbtn1", !this.config["hb.qtbtn1"])
    this.$body("hb-qtbtn2", !this.config["hb.qtbtn2"])
    this.$body("hb-qtbtn3", !this.config["hb.qtbtn3"])
    this.$body("hb-autobop", !this.config["hb.autobop"])
    this.$body("hb-afk-idle", !this.config["hb.afk.idle"])
    this.$body("hb-dj-auto", !this.config["hb.dj.auto"])
    this.$body("hb-dj-next", !this.config["hb.dj.next"])
    this.$body("hb-dj-done", !this.config["hb.dj.done"])
    this.$body("hb-people", !this.config["hb.people"])
    this.$body("hb-player", !this.config["hb.player"])
    this.$body("hb-bubble", !this.config["hb.bubble"])
    this.$body("hb-share", !this.config["hb.share"])
  }

  TS.$on("lobby", TS.loadHotBar)
  TS.$on("attach", TS.loadHotBar)
  TS.$on("update", function updateHotBar (key) {
    let qt = key.indexOf("qt") === 0
    let hb = key.indexOf("hb") === 0
    if (!qt && !hb) return false
    else return this.loadHotBar()
  })

  TS.makeHotBar = function () { return `
    <div id="tsHotBar">
      <div class="wrap">
        <span id="tsMenu" class="ts-menu">☰</span>
        <img src="${ this.icon }" alt="turnstyles" id="tsLogo" class="ts-menu">
        ${ this._bool_("afk.idle", "AFK", "hbIdle") }
        ${ this._bool_("autobop", "Autobop", "hbBop") }
        ${ this._bool_("dj.auto", "AutoQueue", "hbAutoDJ") }
        ${ this._bool_("dj.next", "Next DJ", "hbNextDJ") }
        ${ this._bool_("dj.done", "Escort", "hbDoneDJ") }

        ${ this._qtbtn_("1") } ${ this._qtbtn_("2") } ${ this._qtbtn_("3") }

        ${ this._bool_("show.bubble", "Bubbles", "hbBubble") }
        ${ this._bool_("show.people", "People",  "hbPeople") }
        ${ this._bool_("show.player", "Player",  "hbPlayer") }
        ${ this._btn_("Share", false, "hbShare", "Share") }
      </div>
    </div>
  ` }

  TS.makeButton = function () { return `
    <li class="option link ts-menu">
      <a><strong><em>turnStyles Config</em></strong></a>
    </li>
  ` }

}
},{}],36:[function(require,module,exports){
module.exports = TS => {

  TS._a_ = function (text, path, name) {
    let href = `href="${ path || "#" }"`
    let flag = `class="ts-button" target="_blank"`
    if (name) flag += ` id="${ name }"`
    return `<a ${ flag } ${ href }>${ text }</a>`
  }

  TS._btn_ = function (text, item, name, func) {
    let flag = `class="ts-button"`
    if (name) flag += ` id="${ name }"`
    if (item) flag += ` data-for="${ item }"`
    if (func) flag += ` onclick="$ts.${ func }()"`
    return `<button ${ flag }>${ text }</button>`
  }

  TS._bool_ = function (item, text, name) {
    let data = this.config[item]
    let type = `type="checkbox"`
    let flag = `class="ts-button ts-toggle"`
    if (name) flag += ` id="${ name }"`
    if (item) type += ` data-opt="${ item }"`
    if (data) type += ` checked`
    let html = `<input ${ type } /><span></span>`
    return `<label ${ flag }>${ html }${ text }</label>`
  }

  TS._str_ = function (item, text) {
    let data = this.config[item]
    let done = this._btn_(text, item)
    let flag = `type="text" class="ts-inputs"`
    if (item) flag += `data-opt="${ item }" value="${ data }"`
    return `<input ${ flag } /> ${ done }`
  }

  TS._text_ = function (item, text) {
    let data = this.config[item]
    let done = this._btn_(text, item)
    let flag = `class="ts-inputs" rows="10"`
    if (item) flag += `data-opt="${ item }"`
    return `<textarea ${ flag }>${ data }</textarea> ${ done }`
  }

  TS._list_ = function (item, type) {
    let data = this.config[item]
    let list = this.options[type || item]
    let flag = `class="ts-button ts-choice"`
    if (item) flag += ` data-opt="${ item }"`
    let make = item => this._item_(list, item, data)
    let html = Object.keys( list ).map( item => make(item) )
    return `<select ${ flag }>${ html }</select>`
  }

  TS._item_ = function (list, item, data) {
    let { label, value } = list[item]
    let flag = `value="${ value }"`
    if (value == data) flag += ` selected`
    return `<option ${ flag }>${ label }</option>`
  }

  TS._qtbtn_ = function (i) {
    let name = `qtbtn${ i }`
    let data = this.config[name]
    let text = data.indexOf("||") > -1
    if (!text) text = `QT${ i }`
    else {
      data = data.split("||")
      text = data.shift().trim()
      data = data.join(" ")
    }
    return this._btn_(text, false, name, name)
  }

}
},{}],37:[function(require,module,exports){
module.exports = TS => {

  // quick toggles to hide/show
  TS.showPanel = () => $("#tsWindow").addClass("active")
  TS.hidePanel = () => $("#tsWindow").removeClass("active")

  TS.syncPanel = function (name, data) {
    // mirror config values inside the panel
    let type = typeof data == "boolean" ? "checked" : "value"
    $(`*[data-opt="${ name }"]`).prop(type, data)
  }
  
  TS.savePanel = function (event) {
    let option = this.getOption(event)
    if (!option) return false
    // save config updates from panel
    let { name, data } = option
    this.setConfig(name, data)
    // only emit visual updates in lobby
    let update = !this.lobby || !VISUAL.includes(name)
    if (update) this.$emit("update", name, data)
  }

  TS.getOption = function (event) {
    let elem = event.target, item = elem.dataset
    if (!item.opt && !item.for) return false
    // figure out which item we need to save
    let name = item.for || item.opt
    let bool = elem.type == "checkbox"
    let data = bool ? elem.checked : elem.value
    // fetch a value if we're saving a "for"
    if (item.for) data = $(`*[data-opt="${ name }"]`).val()
    return { name, data }
  }

}

const VISUAL = [ "style", "theme", "u_css", "hotbar" ]
},{}],38:[function(require,module,exports){
module.exports = TS => {

  TS.tabbed = [
    { name: "Room", body: require("./tabs/tab-room.js") },
    { name: "Style", body: require("./tabs/tab-style.js") },
    { name: "DJ + AFK", body: require("./tabs/tab-djafk.js") },
    { name: "HotBar",  body: require("./tabs/tab-hotbar.js") },
    { name: "Alerts",  body: require("./tabs/tab-alerts.js") },
    { name: "Help",    body: require("./tabs/tab-help.js") },
    { name: "About",   body: require("./tabs/tab-about.js") },
  ]

  TS.tabList = function () {
    // get the list of tab head elements
    return this.tabbed.map(tab => {
      let show = tab.name == "Room" ? "active" : ""
      let flag = `class="ts-tab ${ show }" data-tab="${ tab.name }"`
      return `<div ${ flag }>${ tab.name }</div>`
    }).join("")
  }

  TS.tabBody = function () {
    // get the generated tab body elements
    return this.tabbed.map(tab => {
      let body = tab.body.bind(this)
      let show = tab.name == "Room" ? "active" : ""
      let flag = `class="ts-tabbed ${ show }" data-tab="${ tab.name }"`
      return `<div ${ flag }>${ body() }</div>`
    }).join("")
  }

  TS.tabMove = function (e) {
    // simple switch tab
    let target = e.target.dataset.tab
    $("#tsPanels .active").removeClass("active")
    $(`*[data-tab="${ target }"]`).addClass("active")
  }

}
},{"./tabs/tab-about.js":39,"./tabs/tab-alerts.js":40,"./tabs/tab-djafk.js":41,"./tabs/tab-help.js":42,"./tabs/tab-hotbar.js":43,"./tabs/tab-room.js":44,"./tabs/tab-style.js":45}],39:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article class="ts-help">
      <strong>About turnStyles</strong>
      <p>
        version: <em><strong>${ this.version }</strong></em><br />
        user id: <em><strong>${ this.$user() ? this.$user().id : "" }</strong></em>
      </p>
    </article>
    <article class="fan">
      ${ this._bool_("isfan", "Fan The Developer") }
      <p>With this option enabled, you'll automatically fan @crisis on turntable - allowing you to find him when he's online and pester him with questions!</p>
    </article>
    <article class="ts-help">
      <strong>About The Developer</strong>
      <p>turnStyles was made by pixelcrisis, who goes by <em>@crisis</em> on both Discord and turntable.fm</p>
      <p><em>I have a full time job and do this as a hobby, if you want to support turnStyles, consider joining the Patreon! By becoming a patron, you get some swag in chat visible to other turnStyles users!</em></p>
      <p>
        ${ this._a_("Support turnStyles On Patreon!", this.static.patreon, "tsGold") }
      </p>
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>Share turnStyles</strong>
      <p>This will send a message to the room chat with a little description and a link to the turnStyles website! Use this to quickly share if someone wants to install the extension!</p>
      ${ this._btn_("Share turnStyles in chat!", 0, 0, "Share") }
    </article>
    <article class="ts-help ts-links">
      <strong>Links</strong>
      <p>These are links to the website (bookmarklets!), and other places you can install turnStyles.</p>
      ${ this._a_("turnStyles Website", this.static.website) }
      ${ this._a_("As A Firefox Addon", this.static.firefox) }
      ${ this._a_("From The Chrome Store", this.static.chrome) }
    </article>
  </section>`
}
},{}],40:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article class="ts-help">
      <strong>Desktop Notifications</strong>
      <p>Sends a Desktop Notification when you aren't looking at turntable, and one of the selected events occurs.</p>
      ${ this._bool_("on.pm", "On New PMs") }
      ${ this._bool_("on.mention", "On New Mentions") }
      ${ this._bool_("on.song", "On New Songs") }
    </article>
    <article class="ts-help">
      <strong>Hot Words</strong>
      <p>Mention/Notify on word/phrase match in chat. Use multiple words and phrases in a comma separated list.</p>
      ${ this._str_("on.text", "Save Hot Words") }
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>Alerts In Chat</strong>
      <p>These are posted in chat as a fake message, only visible to you. Meant to keep you up to date on the room.</p>
      ${ this._bool_("post.join", "On User Join") }
      ${ this._bool_("post.left", "On User Leave") }
      ${ this._bool_("post.snag", "On Song Snags") }
      ${ this._bool_("post.song", "Last Song Stats") }
      ${ this._bool_("post.spun", "Last DJ's Stats") }
    </article>
  </section>`
}
},{}],41:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article class="ts-help">
      ${ this._bool_("dj.next", "Enable Next DJ") }
      <p>Auto jump up after the next DJ drops!</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("dj.done", "Escort After Next") }
      <p>Auto jump down after your next track!</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("dj.auto", "Enable AutoQueue") }
      <p>Jump on deck when pinged by a bot!</p>
      ${ this._str_("dj.text", "Save Queue Ping") }
    </article>
  </section>
  <section>
    <article class="ts-help">
      <strong>AFK Response</strong>
      <p>The message sent when Currently AFK or pinged while AFK.</p>
      ${ this._str_("afk.text", "Save AFK Response") }
    </article>
    <article class="ts-help">
      <strong>AFK Timer:</strong> ${ this._list_("afk.auto", "times") }
      <p>turnStyles can detect your activity and mark you afk automatically! </p>
    </article>
    <article>
      ${ this._bool_("afk.idle", "Currently AFK") }
      <p>When enabled, sends your AFK Response to the room chat, and again when pinged while you're away!</p>
    </article>
  </section>`
}
},{}],42:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article>
      ${ this._bool_("debug", "Print Debug Logs In Console") }
      <p>The output of turnStyles will be printed into the dev console of your browser. This is useful for finding out why things aren't working.</p>
    </article>
    <article>
      ${ this._bool_("show.logger", "Show Logbook In Room Tab") }
      <p>This adds a running log of what's happened in your room and with turnStyles, printed neatly in the Room Tab.</p>
    </article>
    <p></p>
    <article class="ts-help">
      <strong>Reload turnStyles</strong>
      <p>Removes turnStyles from the room and re-injects it. Useful for debugging or updating a bookmarklet.</p>
      ${ this._btn_("Reload turnStyles", 0, 0, "Reload") }
    </article>
    <article class="ts-help">
      <strong>Reload Music Players</strong>
      <p>Disables and Re-Enables the music players in an attempt to unstick them when broken.</p>
      ${ this._btn_("Reload Players", 0, 0, "reloadMusic") }
    </article>
  </section>
  <section>
    <article class="ts-data ts-help">
      <strong>turnStyles Data</strong>
      <p>If something goes wrong or you need to start over, you can reset/restore/backup your data here!</p><br>
      ${ this._btn_("Backup Data", 0, 0, "backupData") }
      <label id="tsBackup" class="ts-button">
        <input type="file"> Restore Data
      </label><br>
      ${ this._btn_("Reset To Default", 0, 0, "resetData") }
      ${ this._btn_("Delete All Data", 0, 0, "deleteData") }
    </article>
    <article class="ts-help">
      <strong>On Discord</strong>
      <p>You can find the author (and other active users) in the discords below.</p>
      ${ this._a_("turnStyles Discord", this.static.tsDiscord) }
      ${ this._a_("turntable.fm Discord", this.static.ttDiscord) }
    </article>
  </section>`
}
},{}],43:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article class="ts-help">
      ${ this._bool_("hb.qtbtn1", "Enable QuickText 1") }
      <p>Send messages with HotBar buttons!</p>
      ${ this._str_("qtbtn1", "Save QuickText 1") }
    </article>
    <article class="ts-help">
      ${ this._bool_("hb.qtbtn2", "Enable QuickText 2") }
      <p>Prefixing with <strong>||</strong> adds a label!</p>
      ${ this._str_("qtbtn2", "Save QuickText 2") }
    </article>
    <article class="ts-help">
      ${ this._bool_("hb.qtbtn3", "Enable QuickText 3") }
      <p>Use <strong>;;</strong> to send up to three messages!</p>
      ${ this._str_("qtbtn3", "Save QuickText 3") }
    </article>
  </section>
  <section>
    <article>
      ${ this._bool_("hb.afk.idle", "AFK Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.autobop", "Autobop Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.dj.auto", "AutoQueue Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.dj.next", "Next DJ Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.dj.done", "Escort Button") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.bubble", "Chat Bubble Toggle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.people", "Audience Toggle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.player", "Player Toggle") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
    <article>
      ${ this._bool_("hb.share", "Share turnStyles") }
      <p>Toggles button visibility in the HotBar.</p>
    </article>
  </section>`
}
},{}],44:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article>
      ${ this._bool_("autobop", "Autobop") }
      <p>Auto vote "awesome" when a new song starts.</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("use.volume", "Move Volume") }
      <p>Moves volume to the header, adds temporary mute - unmutes after the current song.</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("use.recent", "Recently Played") }
      <p>Highlights songs in your playlist that were recently played in the room.</p>
    </article>
    <article class="ts-help">
      <strong>Reminder:</strong> ${ this._list_("note.on", "times") }
      <p>Send text to the room at a selected interval. Useful for posting recurring information like rules, themes, or whatever!</p>
      ${ this._str_("note.text", "Save Reminder") }
    </article>
  </section>
  <section>
    <article class="ts-help">
      ${ this._bool_("use.emojis", "Add More Emojis") }
      <p>Adds more emojis to the :emoji: syntax. Currently sourced from Twitch and BTTV. Note: Only visible to other turnStyles users, and disables the :P emoji!</p>
    </article>
    <article class="ts-help">
      ${ this._bool_("use.stamps", "Chat Timestamps") }
      <p>We all get distracted - turnStyles will add timestamps to all user messages in chat so you know when a message was sent.</p>
    </article>
    <article>
      ${ this._bool_("hide.bubble", "Hide Chat Bubbles") }
      <p>Toggles speech bubbles from the audience.</p>
    </article>
    <article>
      ${ this._bool_("hide.people", "Hide Room Audience") }
      <p>Toggles the avatars on the room floor.</p>
    </article>
    <article>
      ${ this._bool_("hide.player", "Hide Video Player") }
      <p>Toggles the video player in the background.</p>
    </article>
  </section>`
}
},{}],45:[function(require,module,exports){
module.exports = function () { return `
  <section>
    <article class="ts-help">
      ${ this._list_("theme") }
      <p>Changes the overall appearance of turntable.</p>
    </article>
  </section>
  <section>
    <article class="ts-help">
      ${ this._list_("color") }
      <p>Changes just the gold/accent color of turntable.</p>
    </article>
  </section>
  <section class="full">
    <article class="ts-help">
      <strong>Custom CSS</strong>
      <p>Want to add your own tweaks? Add any CSS snippet here and turnStyles will inject it into turntable for you!</p>
      ${ this._text_("style", "Save & Apply Styles") }
    </article>
  </section>`
}
},{}],46:[function(require,module,exports){
module.exports = TS => {

  TS.$on([ "lobby", "attach" ], function attachWindow () {
    $("#tsWindow").remove()
    $("body").append( this.makeWindow() )

    TS.$on("esc", this.hidePanel)
    $(".ts-tab").on("click", this.tabMove)
    $("#tsClose").on("click", this.hidePanel)
    $("#tsWindow").on("click", CLOSE_FROM_WINDOW)
    $("#tsPanels article").on("click", TOGGLE_HELP)
    $("#tsBackup input").on("change", this.uploadData.bind(this))
    $("#tsPanels *[data-for]").on("click", this.savePanel.bind(this))
    $("#tsPanels *[data-opt]").on("change", this.savePanel.bind(this))
  })


  TS.makeWindow = function () { return `
    <div id="tsWindow">
      <div id="tsPanels">
        <header>
          <img id="tsLogo2" src="${ this.icon }" alt="turnStyles">
          <h2>turnStyles Config</h2><span id="tsClose">✖</span>
        </header>
        <nav>${ this.tabList() }</nav> ${ this.tabBody() }
      </div>
    </div>` 
  }

}

const CLOSE_FROM_WINDOW = function (e) {
  let clicked = e.target == this
  // close panels if clicked outside of panel
  if (clicked) $("#tsWindow").removeClass("active")
}

const TOGGLE_HELP = function (e) {
  let target = e.target
  if (e.target.nodeName != "ARTICLE") return
  $(target).toggleClass("ts-help")
}
},{}],47:[function(require,module,exports){
module.exports = TS => {

	TS.$on("load", function loadConfig () {
		// read our local / addon dbs
		let local = JSON.parse(this.data)
		let addon = JSON.parse(this.sync)
		if (addon && addon.theme) this.$debug('Loaded Addon DB', addon)
		if (local && local.theme) this.$debug('Loaded Local DB', local)

		this.config = { ...this.default, ...addon, ...local }
		this.Migrate()

		this.config["afk.idle"] = false
		this.$emit("loaded", this.config)
	})

	TS.setConfig = function (name, data) {
		// handle changing a config value
		this.config[name] = data
		// store the updated config values
		let tsData = JSON.stringify(this.config)
		window.localStorage.setItem("tsData", tsData)
		window.postMessage({ tsData }) // addon sync
		this.syncPanel(name, data)
		this.$debug(`Set [${ name }] to [${ data }]`)
	}

}
},{}],48:[function(require,module,exports){
module.exports = TS => {

  TS.$on("loaded", function loadTheme (config) {
    // remove any leftovers
    $("#ts_core, #ts_style").remove()
    $("#ts_themes, #ts_colors").remove()
    // add our current settings
    this.addSheet("turnStyles")
    this.addTheme(config.theme)
    this.addSheet(config.color, "colors")
    this.addStyle(config.style)
  })

  TS.$on("update", function updateTheme (key, val) {
    if (key == "theme") this.addTheme(val)
    if (key == "color") this.addSheet(val, "colors")
    if (key == "style") this.addStyle(val)
  })

  TS.addTheme = function (theme) {
    // toggle the no theme class
    this.$body("th-none", !theme)
    // remove the last used theme
    let last = $("body").data("theme")
    if (last)  $("body").removeClass(`th-${ last }`)
    // record and add the current theme
    $("body").data("theme", theme)
    if (theme) $("body").addClass(`th-${ theme }`)
    this.addSheet(theme, "themes")
  }

  TS.addSheet = function (file, folder) {
    // insert a stylesheet with TBA
    let name = file ? `${ file }.css` : false
    let path = this.getLink(name, folder)
    let type = `ts_${ folder || "core" }`
    this.$sheet(path, type)
  }

  TS.addStyle = function (style) {
    // inject our style tag CSS
    this.$style(style, "ts_style")
  }

}
},{}],49:[function(require,module,exports){
module.exports = TS => {

	TS.capStr = function (str) {
		// capitalize a string (proper Noun)
		return str[0].toUpperCase() + str.substring(1)
	}
		
	TS.getTime = function (trim) {
		// get and parse the current time
		// passing trim returns just 00:00
		let time = new Date().toLocaleTimeString("en-us")
		let tiny = time.split(":").slice(0, 2).join(":")
		return trim ? tiny : time
	}

	TS.getLink = function (file, folder) {
		if (!file) return "#"
		// generate a cachebuster link to a file
		let path = folder ? `${ folder }/${ file }` : file
		return `${ this.base }/${ path }?v=${ Math.random() }`
	}

	TS.getWords = function (str, split = " ") {
		// find words/phrases in an array
		return str.split(split).map(w => w.trim())
	}

	TS.Share = function () {
		// share turnStyles in chat
		if (window.confirm( SHARE.CAN )) {
			this.$batch( SHARE.MSG )
			this.hidePanel()
		}
	}

	TS.Update = function () {
		let link = this.static.website
		let open = () => window.open(link, "_blank")
		if (window.confirm( UPDATE )) open()
	}

	TS.Reload = function () {
		// generate our new turnStyles
		let script = document.createElement("script")
		script.src = this.getLink("turnStyles.js")
		script.type = "text/javascript"
		// remove the old one
		this.$print(`reloading...`)
		this.$detach()
		$(`script[src*="turnStyles.js`).remove()
		// add our new turnStyles to start over!
		window.localStorage.setItem("tsBase", this.base)
		document.body.append(script)
	}

}

const SHARE = {
	CAN: "Share turnStyles in the room chat?",
	MSG: [
		"Check out turnStyles!",
		"Autobop, Emotes, Themes, & More!",
		"Get it @ https://turnstyles.xyz"
	]
}

const UPDATE = `Oops! Something went wrong with turnstyles!
If this is a bookmarklet, you may need to update it.
Visit the turnStyles website at turnstyles.xyz to update!
Clicking OK will attempt to open the update in a new tab.`
},{}],50:[function(require,module,exports){
module.exports={
  "name": "turnstyles",
  "version": "12.0.0-beta.5",
  "main": "turnStyles.js",
  "repository": "git@github.com:pixelcrisis/turntable-tweaks.git",
  "author": "pixelcrisis <pxcrisis@gmail.com>",
  "license": "MIT",
  "scripts": {
    "serve": "sh bash/serve.sh",
    "quick": "sh bash/quick.sh",
    "style": "sh bash/style.sh",
    "build": "sh bash/build.sh"
  },
  "devDependencies": {
    "autoprefixer": "^10.2.5",
    "babel-eslint": "^10.1.0",
    "browserify": "^17.0.0",
    "concurrently": "^6.0.0",
    "copy-and-watch": "^0.1.6",
    "eslint": "^7.22.0",
    "node-sass": "^7.0.1",
    "postcss": "^8.2.9",
    "postcss-cli": "^8.3.1",
    "sass": "^1.32.8",
    "tinyify": "^3.0.0",
    "watchify": "^4.0.0"
  },
  "dependencies": {}
}

},{}],51:[function(require,module,exports){
module.exports = TS => {

	// our plugins! (features!)
	require("./visual.js")(TS)
	require("./player.js")(TS)
	require("./volume.js")(TS)
	require("./alerts.js")(TS)
	require("./idling.js")(TS)
	require("./remind.js")(TS)
	require("./ondeck.js")(TS)
	require("./emojis.js")(TS)
	require("./suggest.js")(TS)
	require("./patrons.js")(TS)
	require("./autoBop.js")(TS)
	require("./roomTab.js")(TS)
	require("./chatTab.js")(TS)
	require("./songTab.js")(TS)

}
},{"./alerts.js":52,"./autoBop.js":53,"./chatTab.js":54,"./emojis.js":55,"./idling.js":56,"./ondeck.js":57,"./patrons.js":58,"./player.js":59,"./remind.js":60,"./roomTab.js":61,"./songTab.js":62,"./suggest.js":63,"./visual.js":64,"./volume.js":65}],52:[function(require,module,exports){
module.exports = TS => {

  TS.$on("mail", function notifyMail (event) {
    if (!this.config["on.pm"]) return false
    let head = `New PM from: ${ event.user.name }`
    return this.$notify({ head, text: event.text, type: "mail" })
  })

  TS.$on("chat", function notifyChat (event) {
    if (!this.config["on.mention"] || !event.ping) return false
    let head = `New Mention from: ${ event.user.name }`
    return this.$notify({ head, text: event.text, type: "ping" })
  })

  TS.$on("chat", function notifyWord (event) {
    let find = this.config["on.text"]
    if (!find || find.length < 3) return false
    let text = event.text.toLowerCase()
    let list = this.getWords(find.toLowerCase(), ",")
    // check the text for each word in the query
    list.forEach(word => {
      if (text.indexOf(word) > -1) {
        event.target.addClass("mention")
        let head = `Hot Word: ${ word }`
        return this.$notify({ head, text: event.text, type: "word" })
      }
    })
  })

  TS.$on("song", function notifySong (event) {
    if (!this.config["on.song"]) return
    let head = `Now Playing: ${ event.name }`
    let text = `By: ${ event.artist }`
    return this.$notify({ head, text, type: "song" })
  })

  TS.$on("snag", function alertSnag (event) {
    if (!this.config["post.snag"]) return
    let head = event.user.name, text = `has snagged this track!`
    return this.$post({ head, text, type: "snag" })
  })

  TS.$on("join", function alertJoin (event) {
    if (!this.config["post.join"]) return
    let head = event.user.name, text = "joined."
    return this.$post({ head, text, type: "join" })
  })

  TS.$on("left", function alertLeft (event) {
    if (!this.config["post.left"]) return
    let head = event.user.name, text = "left."
    return this.$post({ head, text, type: "left" })
  })

}
},{}],53:[function(require,module,exports){
module.exports = TS => {

	TS.$on([ "attach", "song" ], function autoBop (event) {
		// clear timeout to rest
		if (this.bopping) clearTimeout(this.bopping)
		if (!this.config["autobop"]) return false
		if (this.$now_playing.none || event.self) return false 
		// get a random delay of 1 - 7 seconds
		const delay = Math.floor((Math.random() * 7) * 100)
		this.$debug(`Autobop in ${ delay / 100 } seconds`)
		this.bopping = setTimeout(this.$vote(), delay)
	})

}


},{}],54:[function(require,module,exports){
module.exports = TS => {

  TS.$on("chat", function timeStamp (event) {
    if (!this.config["use.stamps"]) return
    let chat = event.target, time = this.getTime(true)
    if (!chat || chat.has(".ts-time").length) return
    chat.prepend(`<div class="ts-time">${ time }</div>`)
  })

  TS.$on("text", function textFade (event) {
    // fade out the new song message
    let flag = `.message:not(.stat)`
    let find = `${ flag }:contains(' started playing "')`
    let list = event.target.children(find)
    list.each((i, msg) => $(msg).addClass("stat"))
  })

  TS.$on("song", function postSong (event) {
    if (!this.config["post.song"] || !event.last) return
    let head = STAT_LINE(event.last)
    let text = `${ event.last.song } by ${ event.last.artist }`
    if (head) this.$post({ head, text, type: "stat" })
  })

  TS.$on("drop", function postDrop (event) {
    if (!this.config["post.spun"]) return
    let head = STAT_LINE(event.stat)
    let text = `<strong>${ event.user.name }</strong> is done spinning!`
    return this.$post({ head, text, type: "stat" })
  })

  TS.quickText = function (btn) {
    let data = REMOVE_LABEL(this.config[btn])
    let text = this.getWords(data, ";;")
    if (text) this.$batch( text )
  }

  // easy inline quicktext onlick access
  TS.qtbtn1 = function () { this.quickText('qtbtn1') }
  TS.qtbtn2 = function () { this.quickText('qtbtn2') }
  TS.qtbtn3 = function () { this.quickText('qtbtn3') }

}

const REMOVE_LABEL = function (str) {
  if (str.indexOf("||") < 0) return str
  else return str.split("||")[1].trim()
}

const STAT_LINE = (obj = {}, str = "") => {
  if ("love" in obj) str += `${obj.love}❤️`
  if ("hate" in obj) str += `${obj.hate}💔`
  if ("snag" in obj) str += `${obj.snag}💖`
  if ("spun" in obj) str += `${obj.spun}▶️`
  return str
}
},{}],55:[function(require,module,exports){
module.exports = TS => {

	TS.isEmoji = function (str) {
		// make sure first/last char match syntax
		let cF = str[0], cL = str[str.length - 1]
		return cF == ":" && cL == ":"
	}

	TS.getEmoji = function (word)	{
		if (!this.isEmoji(word)) return false
		let name = word.split(":").join("").toLowerCase()
		// check the twitch map first
		let icoA = this.twitchMap.get(name)
		if (icoA) return TWITCH.ICON(icoA)
		// if nothing, check the bttv map
		let icoB = this.bttvMap.get(name)
		if (icoB) return BTTV.ICON(icoB)
		return false
	}

	TS.genEmoji = function (word, icon) {
		// find the message via the word
		// we have to replace :P because of the emoji
		let name = NO_TONGUE(word)
		$(`.chat .text:contains("${ name }")`).each(function () {
			let html = this.innerHTML.split(name).join(icon)
			this.innerHTML = NO_TONGUE(html)
		})
	}

	TS.$on("chat", function findEmojis (event) {
		if (!this.config["use.emojis"]) return
		this.getWords(event.text).forEach(word => {
			let icon = this.getEmoji(word)
			if (icon) this.genEmoji(word, icon)
		})

	})

}

const BTTV = {
	BASE: "https://cdn.betterttv.net/emote/", TAIL: "/1x",
	ICON: ICON => `<img src="${ BTTV.BASE }${ ICON }${ BTTV.TAIL }">`
}

const TWITCH = {
	BASE: "https://static-cdn.jtvnw.net/emoticons/v2/", TAIL: "/static/light/1.0",
	ICON: ICON => `<img src="${ TWITCH.BASE }${ ICON }${ TWITCH.TAIL }">`
}

const NO_TONGUE = STR => {
	STR = STR.split(":p").join("")
	STR = STR.split(":P").join("")
	return STR.split(TONGUE).join("")
}

const TONGUE = `<span title="stuck_out_tongue" class="emoji emoji-stuck_out_tongue emoji-small"></span>`
},{}],56:[function(require,module,exports){
module.exports = TS => {

  TS.autoIdle = function (event) {
    let auto = parseInt(this.config["afk.auto"])
    if (!auto) return
    if (!event.active) this.idleTimer += 1
    else this.idleTimer = 0
    this.$debug(`Idle: ${ this.idleTimer }/${ auto }`)
    if (this.config["afk.idle"]) return
    if (this.idleTimer < auto) return
    this.$debug("Running Auto AFK...")
    this.setConfig("afk.idle", true)
    return this.$post( IDLE.ON )
  }

  TS.pingIdle = function () {
    let data = this.config["afk.text"]
    let text = this.getWords(data, ";;")
    return this.$batch(text)
  }

  TS.scanIdle = function (text) {
    // check it wasn't an afk message
    let data = this.config["afk.text"]
    let list = this.getWords(data, ";;")
    if (list.includes(text)) return
    // otherwise welcome them back
    this.setConfig("afk.idle", false)
    return this.$post( IDLE.OFF )
  }

  TS.$on("chat", function setIdle (event) {
    let active = event.self
    if (active) this.autoIdle({ active })
    let { self, text, ping } = event
    if (!this.config["afk.idle"]) return
    if (self) return this.scanIdle(text)
    else if (ping) return this.pingIdle()
  })

  TS.$on("loop", TS.autoIdle)
  TS.$on("update", function updateIdle (key, val) {
    if (key != "afk.idle") return
    if (val) this.pingIdle()
    this.idleTimer = 0
  })

  TS.idleTimer = 0
  
}

const IDLE = {
  ON: {
    head: "Still there?",
    text: "I've marked you as AFK until you get back!"
  },
  OFF: {
    head: "Welcome Back!",
    text: "You're no longer AFK!"
  }
}
},{}],57:[function(require,module,exports){
module.exports = TS => {

  TS.tryJump = function (tries) {
    // try to get on deck
    let user = this.$user().id
    let list = this.$room().metadata.djs
    let curr = this.$current_djs[user] || list[user]
    let spot = $(".become-dj").length || list.length < 5
    if (curr) return this.$print(`jump: landed on deck.`)
    // only try to grab the spot if there is one
    if (!spot) this.$print(`jump: no spot.`)
    else this.$print(`jump: attempting...`)
    if (spot) this.$jump()
    // try again if we have tries left
    if (tries) return this.retryJump(tries - 1)
    else return this.$print(`jump: max attempts.`)
  }

  TS.retryJump = function (tries) {
    let retry = () => this.tryJump(tries)
    return setTimeout(retry.bind(this), 300)
  }

  TS.$on([ "chat", "mail"], function checkAutoDJ (event) {
    // check all messages for autoqueue
    if (!this.config["dj.auto"]) return
    let data = this.config["dj.text"]
    let text = this.getWords(data, ";;")
    // check each possible queue text against event text
    for (let word of text) if (event.text.indexOf(word) > -1) {
      this.$print(`running autoqueue...`)
      return this.tryJump(6)
    }
  })

  TS.$on([ "drop", "update" ], function checkDropDJ () {
    // run our next DJ on change or drop
    if (!this.config["dj.next"]) return false
    this.$print(`running next dj...`)
    this.tryJump(3)
  })

  TS.$on("jump", function checkJumpDJ (event) {
    // disable next DJ if we jumped
    if (!event.self) return
    if (!this.config["dj.next"]) return
    this.setConfig("dj.next", false)
    this.$bully( DECK.JUMP )
  })

  TS.$on("song", function checkDoneDJ (event) {
    if (!this.config["dj.done"]) return
    // escort if user was the last DJ
    if (event.last.djid == this.$user().id) {
      this.setConfig("dj.done", false)
      this.$bully( DECK.DROP )
      return this.$drop()
    }
    // warn when user starts playing
    if (event.self) return this.$bully( DECK.WARN )
  })

}

const DECK = {
  JUMP: {
    head: "You've hopped on deck!",
    body: "NextDJ has been disabled.",
    type: "action"
  },
  WARN: {
    head: "You've started spinning!",
    body: "(turnStyles will escort you after this song)",
    type: "action"
  },
  DROP: {
    head: "You've finished spinning!",
    body: "(turnStyles has escorted you from the deck!)",
    type: "action"
  }
}
},{}],58:[function(require,module,exports){
module.exports = TS => {

  TS.$on("chat", function checkPatron (event) {
    let elem = event.target
    let gold = this.patrons[event.userid]
    if (gold && elem) elem.addClass("patron")
  })

}
},{}],59:[function(require,module,exports){
module.exports = TS => {

  TS.reloadMusic = function () {
    let yt = window.youtube
    let sc = window.soundcloudplayer
    // update the song delay as time of refresh
    // then resume the song to force an update
    if (sc.song) this.reloadSC(sc)
    if (yt.song) this.reloadYT(yt)
    // close the panel on finish
    this.hidePanel()
  }

  TS.reloadSC = function (curr) {
    curr.songTime = curr.player.currentTime() / 1e3
    curr.previewStartTime = Date.now() - 1000
    curr.resumeSong(curr.song)
  }

  TS.reloadYT = function (curr) {
    curr.songTime = curr.player[0].getCurrentTime()
    curr.previewStartTime = Date.now() - 3000
    curr.resumeSong(curr.song)
  }

}
},{}],60:[function(require,module,exports){
module.exports = TS => {

	TS.$on("loop", function sendRemind (event) {
		let text = this.config["note.text"]
		let perm = parseInt(this.config["note.on"])
		// make sure beat is divisble by note.on
		// e.g - every 15 minutes, on 30th beat is:
		// 30 % 15 === 0 (31 is not divisible by 15)
		let time = (event.beat % perm) === 0
		if (!perm || !text || !time) return
		this.$chat(`[${ this.$room().name }] ${ text }`)
	})

}
},{}],61:[function(require,module,exports){
module.exports = TS => {

	TS.$on("log", function addLog () {
		let book = $("#tsLogs")[0] || {}
		let logs = this.$logs.map( LOG.ITEM )
		book.innerHTML = logs.reverse().join("")
		book.scrollTop = book.scrollHeight
	})

	TS.$on("attach", function attachRoomTab () {
		$("#tsLogBook").remove()
		$(".room-info-nav").after( LOG.BOOK )
		let fan = this.$user().isFanof(this.static.author)
		if (fan) this.config.isfan = true
		if (!this.config.isfan) return
		this.$debug(`Thanks For The Fan <3`)
		this.$user().addFan(this.static.author)
	})

	TS.$on("update", function updateIsFan (key, val) {
		if (key != "isfan") return
		if (val) this.$user().addFan(this.static.author)
		else this.$user().removeFan(this.static.author)
	})

}

const LOG = {
	BOOK: `
		<div id="tsLogBook">
			<h3>tS Room Logs</h3>
			<div id="tsLogs"></div>
		</div>
	`,
	ITEM: log => `
		<div class="ts-log ${ log.type }">
			<div class="tl-text">${ log.text }</div>
			<div class="tl-info">
				<span>${ log.time }</span>
				${ log.data || ""}
			</div>
		</div>
	`
}
},{}],62:[function(require,module,exports){
module.exports = TS => {

  TS.findRecent = function () {
    $(".ts-played").removeClass("ts-played")
    if (!this.config["use.recent"]) return false
    let mark = (i, elem) => this.markRecent(elem)
    $("#queue .songs .song").each( mark )
  }

  TS.markRecent = function (elem) {
    let name = $(elem).find(".title").text()
    let band = $(elem).find(".details").text().split(" • ")[0]
    let both = data => data.song == name && data.artist == band
    let mark = data => both(data) && $(elem).addClass("ts-played")
    this.$room().metadata.songlog.forEach( item => mark(item.metadata) )
  }

  TS.$on([ "attach", "list" ], function attachSongTab () {
    // count songs in current playlist
    let head = $("#playlist-header .text")[0]
    let data = window.playlist.fileids.length
    let name = head.innerHTML.split("<em>")[0]
    head.innerHTML = `${ name }<em> ${ data }</em>`
  })

  TS.$on([ "attach", "list", "song" ], function attachRecents () {
    // check playlist for recently played songs
    // but make sure we wait until done loading
    let holdRecent = this.findRecent.bind(this)
    if (this.waitRecent) clearTimeout(this.waitRecent)
    this.waitRecent = setTimeout(holdRecent, 250)
  })

  TS.$on("update", function (key, val) {
    if (key != "use.recent") return
    this.$body("ts-recent", val)
    this.findRecent()
  })
  
}
},{}],63:[function(require,module,exports){
module.exports = TS => {

	TS.hideSuggest = () => $("#tsSuggest").remove()

	TS.scanSuggest = function () {
		if (!this.config["use.emojis"]) return
		let text = this.getWords($("#chat-input").val())
		let word = text[text.length - 1]
		let icon = word[0] == ":" && word.length > 1
		if (icon) this.findSuggest(word.split(":").join(""))
		else this.hideSuggest()
	}

	TS.findSuggest = function (word) {
		let icons = []
		let match = key => key.indexOf(word) === 0
		let found = (val, key) => { if (match(key)) icons.push(key) }
		this.twitchMap.forEach(found)
		this.bttvMap.forEach(found)
		this.makeSuggest(icons.sort())
	}

	TS.makeSuggest = function (list) {
		this.hideSuggest()
		if (!list.length) return 
		// func to generate our icon HTML
		let icon = name => this.getEmoji(`:${ name }:`)
		let make = name => HTML.ICON( icon(name), name )
		let html = list.map( make ).join("")
		$("body").append( HTML.WRAP(html) )
		$("#tsSuggest .icon").on("click", this.sendSuggest.bind(this))
	}

	TS.sendSuggest = function (event) {
		let name = event.target.dataset.icon
		let text = $("#chat-input").val().split(" ")
		// replace the in progress emoji with complete
		text[text.length - 1] = `${ name } `
		$("#chat-input").val( text.join(" ")).focus()
		this.$view().typeahead.clearTypeahead()
		this.hideSuggest()
	}

	TS.$on("attach", function attachSuggest () {
		this.$on("type", this.scanSuggest)
		$("#chat-input").on("input", this.scanSuggest.bind(this))
	})

}

const HTML = {
	ICON: (ICON, NAME) => `
		<div class="icon" data-icon=":${ NAME }:">
			${ ICON } :${ NAME }:
		</div>
	`,
	WRAP: LIST => `
		<div id="tsSuggest">
			<div class="wrap">${ LIST }</div>
		</div>
	`
}
},{}],64:[function(require,module,exports){
module.exports = TS => {

  TS.$on("user", function profileStat (event) {
    if ($(".profile.modal .statslink").length) return
    // force web links section to be visibe
    $(".profile.modal .section.web-links").show()
    $(".profile.modal .website").append( STAT_LINK(event.userid) )
  })

  TS.$on("loaded", function loadVisual (config) {
    this.debugging = config["debug"]
    this.$body("ts-recent", config["use.recent"])
    this.$body("ts-logger", config["show.logger"])
    this.$body("ts-logger", config["show.logger"])
    this.$body("ts-no-bub", config["hide.bubble"])
    this.$body("ts-no-ppl", config["hide.people"])
    this.$body("ts-no-vid", config["hide.player"])
  })

  TS.$on("update", function updateVisual (key, val) {
    if (key == "debug") this.debugging = val
    if (key == "use.recent") this.$body("ts-played", val)
    if (key == "show.logger") this.$body("ts-logger", val)
    if (key == "hide.bubble") this.$body("ts-no-bub", val)
    if (key == "hide.player") this.$body("ts-no-vid", val)
    if (key == "hide.people") this.$body("ts-no-ppl", val)
  })

}

const STAT_LINK = id => `
  <a target="_blank" class="statslink" onclick="$('.modal .close-x')[0].click()"
    href="https://thompsn.com/turntable/leaderboard/thing/?id=${ id }">
    Leaderboard
  </a>
`
},{}],65:[function(require,module,exports){
module.exports = TS => {

	TS.loadVolume = function () {
		// toggle volume control
		let opt = this.config["use.volume"]
		let has = $("body").hasClass("ts-volume")
		// disable volume controls
		if (has && !opt) {
			$("#tsVolWrap").remove()
			window.turntablePlayer.realVolume = this.realVolume
			this.$debug(`Restored Volume`)
		}
		// or add volume controls
		if (opt && !has) {
			let scroll = "DOMMouseScroll mousewheel"
			$(".header-content").append( VOL.HTML() )
			$("#tsMuteBtn").on("click", this.toggleMute.bind(this))
			$("#tsVolSlide").on("input", this.saveVolume.bind(this))
			$("#tsVolSlide").on(scroll, this.rollVolume.bind(this))
			this.$debug(`Replaced Volume`)
		}
		this.$body("ts-volume", opt)
	}

	TS.saveVolume = function (vol) {
		// update window volume on change
		vol = vol.target ? vol.target.value : vol
		let volume = vol > 0 ? VOL.MAKE(vol) : -7
		// turntable doesn't natively go lower than 7
		// so decide to use tt volume or our own 
		let volFunc = volume < 7 ? VOL.CURR : this.realVolume
		window.turntablePlayer.realVolume = volFunc
		window.turntablePlayer.setVolume(volume)
		window.util.setSetting("volume", volume)
	}

	TS.rollVolume = function (e) {
		// handle scrollbar
		let curr = VOL.CURR()
		// get direction of scrolling
		let down = e.originalEvent.deltaY > 0
		// we step by 5 if holding shift
		let step = e.originalEvent.shiftKey ? 1 : 5
		let save = down ? (curr - step) : (curr + step)
		$("#tsVolSlide")[0].value = save
		this.saveVolume(save)
		return false // don't interrupt event flow
	}

	TS.toggleMute = function () {
		this.muted = !this.muted
		this.$body("ts-muted", this.muted)
		let vol = this.muted ? -7 : VOL.FULL()
		window.turntablePlayer.setVolume(vol)
		this.$print(`Turned Mute ${ this.muted ? "On" : "Off" }`)
	}

	TS.$on("update", TS.loadVolume)
	TS.$on("attach", function attachVolume () {
		// stash realVolume to replace
		let rv = window.turntablePlayer.realVolume
		if (!this.realVolume) this.realVolume = rv
		this.loadVolume()
	})

	TS.$on("song", function unmuteAfter () {
		// unmute if muted after current song
		if (this.muted) this.toggleMute()
	})

}

const VOL = {
	// why doesn't TT use standard linear volumes?
	MAKE: x => Math.log(x / 100) / Math.LN2 + 4,
	CURR: e => {
		// get the volume (in real numbers) from tt
		let curr = e || window.util.getSetting("volume")
		return 100 * Math.pow(2, curr - 4)
	},
	FULL: () => VOL.MAKE( VOL.CURR() ),
	HTML: () => `
	  <div id="tsVolWrap">
	    <span id="tsMuteBtn"></span>
	    <input id="tsVolSlide" type="range" min="0" max="100" value="${ VOL.CURR() }">
	    <em id="tsMutedMsg">Muted For One Song</em>
	  </div>
	`
}
},{}],66:[function(require,module,exports){
// turnStyles for turntable.fm
// overcomplicated, by pixelcrisis
let TBA = require("../tt-browser-api/")

// first we make sure we were injected properly
// so we look up the base (bookmarklet or app?)
// and grab the sync db data (if using the app)
let data = window.localStorage.getItem("tsData")
let sync = window.localStorage.getItem("tsSync")
let base = window.localStorage.getItem("tsBase")

// remove base / sync to prevent caching
window.localStorage.removeItem("tsBase")
window.localStorage.removeItem("tsSync")

// ensure that we have something for data/sync
if (!sync || sync == "undefined") sync = "{}"
if (!data || data == "undefined") data = "{}"

// let's define our plugin now
let turnStyles = window.$ts = new TBA({ 
	base, data, sync,
	name: "turnStyles", label: "TS",
	icon: `${ base }/images/icon128.png`,
	version: require("./package.json").version
})

// import and build out the extension
require("./core/_import.js")(turnStyles)
require("./plugin/_import.js")(turnStyles)

// start or die
if (base) turnStyles.$attach()
else turnStyles.Update()
},{"../tt-browser-api/":16,"./core/_import.js":27,"./package.json":50,"./plugin/_import.js":51}]},{},[66]);
