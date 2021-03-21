// turnStyles.js

// the main initiation
const tS = function() {
	this.loadConfig()
	this.loadThemes()
	this.attachRoom()
}

// defaults & utilities
tS.prototype.__ = {
	config: {
		autobop: true,

		volume: 100,
		has_vol: false,

		theme: "dark",
		style: "",

		ping_pm: false,
		ping_song: false,
		ping_chat: false,

		chat_stat: false,
		chat_snag: false,
		chat_join: false,
		chat_gone: false
	},
	options: {
		theme: {
			dark: "Dark Mode",
			night: "Night Mode",
		},
		style: {
			pink: "Pink",
			blue: "Blue",
			teal: "Teal",
			green: "Green",
		},
	},

	log: (str, obj) => {
		obj = obj ? JSON.stringify(obj, 0, 2) : ''
		console.info(`turnStyles :: ${str}`, obj)
	},
	// check if obj exists and has a key
	has: (obj, key) => obj !== null && typeof obj != "undefined" && obj[key]
}
// attach to the turntable room
tS.prototype.attachRoom = function() {
	this.core = window.turntable
	if (!this.core) return this.__.log("where are we?")
	this.user = this.core.user.id
	let again = () => setTimeout(tS.prototype.attachRoom.bind(this), 250)

	// let's find the room
	for (let x in this.core) {
		if (this.__.has(this.core[x], "roomId")) {
			this.room = this.core[x]
			break
		}
	}

	if (!this.room) return again()

	// find the room manager
	for (let x in this.room) {
		if (this.__.has(this.room[x], "roomData")) {
			this.ttbl = this.room[x]
			break
		}
	}
	// try again if we can't find it
	if (!this.ttbl) return again()

	// record any currently playing song
	if (this.room.currentSong) {
		this.now_playing = {
			snag: 0, hate: 0,
			love: this.room.upvoters.length,
			...this.room.currentSong.metadata
		}
	}

	// handle our events
	this.core.addEventListener('message', this.handle.bind(this))
	// we need a copy of this to for the volume function
	this.realVolume = window.turntablePlayer.realVolume
	this.__.log(`loaded room: ${this.room.roomId}`)
	this.runAutobop()
	this.buildPanel()
}

// define our "database"
tS.prototype.loadConfig = function() {
	const store = window.localStorage.getItem("tsdb")
	this.config = store ? JSON.parse(store) : {}

	// apply our defaults for any config upgrades
	this.config = { ...this.__.config, ...this.config }

	this.base = window.tsBase || 'https://ts.pixelcrisis.co/src/'
	this.__.log("loaded config")
}
tS.prototype.saveConfig = function() {
	this.config.theme     = $("#ts_theme").val()
	this.config.style     = $("#ts_style").val()

	this.config.autobop   = $("#ts_autobop").is(':checked')
	this.config.has_vol   = $('#ts_has_vol').is(':checked')
	this.config.ping_pm   = $('#ts_ping_pm').is(':checked')
	this.config.ping_chat = $('#ts_ping_chat').is(':checked')
	this.config.ping_song = $('#ts_ping_song').is(':checked')
	this.config.chat_snag = $('#ts_chat_snag').is(':checked')

	window.localStorage.setItem("tsdb", JSON.stringify(this.config))
	$('#ts_pane').removeClass('active')
	this.__.log("saved config")
	this.loadThemes()
	this.loadVolume()
}

// build our options menu
tS.prototype.handleOpts = function(list) {
	let data = this.__.options[list]
	let opts = `<option value="">None</option>`
	for (let key in data) {
		let curr = this.config[list] == key ? 'selected' : ''
		opts += `<option value="${key}" ${curr}>${data[key]}</option>`
	}
	return `<select id="ts_${list}">${opts}</select>`
}
tS.prototype.handleBool = function(data) {
	let checked = this.config[data] ? 'checked' : ''
	return `<input id="ts_${data}" type="checkbox" ${checked} />`
}
tS.prototype.buildPanel = function() {
	// inject our CSS
	let link = document.createElement('link')
	link.rel = "stylesheet"; link.type = "text/css"
	link.href = `${this.base}/turnStyles.css`
	document.head.append(link)

	// the options window
	$('body').append(`
		<div id="ts_pane">
			<h2>turnStyles options</h2>

			<div class="half">
				<label>${this.handleBool('autobop')} Autobop</label>
			</div>
			<div class="half">
				<label>${this.handleBool('has_vol')} Control Volume</label>
			</div>
			<div class="half">
				<label>Theme</label>
				${this.handleOpts('theme')}
			</div>
			<div class="half">
				<label>Style</label>
				${this.handleOpts('style')}
			</div>
			<div class="half">
				<h3>Chat Info</h3>
				<label>${this.handleBool('chat_stat')} Stats In Chat</label>
				<label>${this.handleBool('chat_snag')} Snags In Chat</label>
				<label>${this.handleBool('chat_join')} Joins In Chat</label>
				<label>${this.handleBool('chat_gone')} Leaves In Chat</label>
			</div>
			<div class="half">
				<h3>Notifications</h3>
				<label>${this.handleBool('ping_pm')} On DMs</label>
				<label>${this.handleBool('ping_chat')} On Mentions</label>
				<label>${this.handleBool('ping_song')} On New Songs</label>
			</div>

			<button id="ts_close">Cancel</button>
			<button id="ts_save">Save</button>
		</div>
	`)
	// bind up the events
	$('#ts_save').on('click', this.saveConfig.bind(this))
	$('#ts_close').on('click', () => $('#ts_pane').removeClass('active'))

	this.

	this.attachMenu() // add the menu toggle
	this.loadVolume() // add the volume control
}
tS.prototype.attachMenu = function() {
	// add the button
	$('#layout-option').before(`
		<li class="ts link option">
			<a id="ts_open" href="#">turnStyles</a>
		</li>
	`)
	// clicking toggles the menu
	$('#ts_open').on('click', () => {
		$('#ts_pane').toggleClass('active')
	})
}

// load our styles and themes
tS.prototype.loadThemes = function() {
	this.refreshCSS("themes", this.config.theme)
	this.refreshCSS("styles", this.config.style)
}
tS.prototype.refreshCSS = function(type, name) {
	let curr = $(`link.tS-${type}`)
	let path = `${this.base}/${type}/${name}.css`
	if (!name) return curr.length ? curr.remove() : false
	this.__.log(`loading ${type}/${name}.css`)

	if (curr.length) curr.attr("href", path)
	else {
		let link = document.createElement('link')
		link.classList.add(`tS-${type}`)
		link.rel = "stylesheet"
		link.type = "text/css"
		link.href = path
		document.head.append(link)
	} 
}

// volume controls
tS.prototype.loadVolume = function() {
	let hasVolume = $('body').hasClass('has-volume')
	if (this.config.has_vol && !hasVolume) {
		$('body').addClass('has-volume')
		$('.header-content').append(`
			<div id="ts_volume">
				<span id="ts_mute"></span>
				<input id="ts_slider" type="range" 
					min="0" max="100" value="${this.currVolume()}">
				</input>
				<em id="ts_muted">Muted For One Song</em>
			</div>
		`)
		// set up our connection to youtube
		$('#ts_mute').on('click', this.toggleMute.bind(this))
		$('#ts_slider')
			.on('input', this.saveVolume.bind(this))
			.on('DOMMouseScroll mousewheel', this.onVolWheel.bind(this))
	}
	else if (!this.config.has_vol && hasVolume) {
		$('body').removeClass('has-volume')
		$('#ts_volume').remove()
		window.turntablePlayer.realVolume = this.realVolume;
	}
}
tS.prototype.currVolume = function() {
	// fetch TT's volume setting and convert to 100 scale
	let curr = window.util.getSetting('volume')
	return 100 * Math.pow(2, curr - 4)
}
tS.prototype.saveVolume = function(vol) {
	vol = vol.target ? vol.target.value : vol
	// convert volume to a scale of 100
	let scaled = x => Math.log(x / 100) / Math.LN2 + 4
	let volume = vol > 0 ? scaled(vol) : -3

	// rewrite tt function to allow values below 7
	if (volume > 6) window.turntablePlayer.realVolume = this.realVolume
	else window.turntablePlayer.realVolume = x => 100 * Math.pow(2, x - 4)

	// set volume immediately, but delay saving
	window.turntablePlayer.saveVolume(volume)
	// only actually *save* the volume once every second
	let saving_vol = () => window.util.setSetting('volume', volume)
	if (this.vol_saving) clearTimeout(this.vol_saving)
	this.vol_saving = setTimeout(saving_vol, 1* 1000)
}
tS.prototype.toggleMute = function() {
	if (!this.mute) $('#ts_volume').addClass('muted')
	else $('#ts_volume').removeClass('muted')
	this.saveVolume(this.mute ? this.currVolume() : 0)
	this.mute = !this.mute
	this.__.log(`turned mute ${ this.mute ? 'on' : 'off'}`)
}
tS.prototype.onVolWheel = function(e) {
	const slider = $('#ts_slider')
	let currentVolume = window.youtube.futureVolume
	if (currentVolume < 0 ) currentVolume = this.currVolume()
	let multiplier = e.originalEvent.shiftKey ? 1 : 5;

	if (e.originalEvent.deltaY > 0) {
		let newVolume = currentVolume - multiplier;
		if (newVolume <= 0) newVolume = 0;
		this.saveVolume(newVolume)
		slider[0].value = newVolume;
	} else {
		let newVolume = currentVolume + multiplier;
		if (newVolume >= 100) newVolume = 100;
		this.saveVolume(newVolume)
		slider[0].value = newVolume
	}
	return false;
}

// run our autobop (awesome)
tS.prototype.runAutobop = function() {
	if (this.autobop) clearTimeout(this.autobop)
	if (!this.config.autobop) return
	let roomId = this.room.roomId
	this.autobop = setTimeout(() => {
		$(window).focus()
		let options = { bubbles: true, cancelable: true, view: window }
		let awesome = document.querySelectorAll('.awesome-button')[0]
		let clicked = new MouseEvent('click', options)
		return !awesome.dispatchEvent(clicked)
	}, (Math.random() * 7) * 1000)
}

// handle our notifications
tS.prototype.notifyUser = function(data) {
	return window.postMessage({
		type: "tsNotify", notification: data
	})
}
tS.prototype.sendToChat = function(bold, text, type) {
	$('.chat .messages').append(`
		<div class="message ${type}">
			<em>
				<span class="subject">${bold}</span>
				<span class="text">${text}</span>
			</em>
		</div>
	`)
	this.core.topViewController.updateChatScroll()
}

// event handlers
tS.prototype.handle = function(e) {
	if (!e.command) return
	if (e.command == "pmmed") this.onPing(e)
	if (e.command == "speak") this.onChat(e)
	if (e.command == "newsong") this.onSong(e)
	if (e.command == "snagged") this.onSnag(e)
	if (e.command == "registered") this.onJoin(e)
	if (e.command == "deregistered") this.onLeft(e)
	if (e.command == "update_votes") this.onVote(e)
}
tS.prototype.onPing = function(e) {
	if (this.config.ping_pm && !window.tsPmPing) {
		this.notifyUser({ head: `New PM`, text: e.text })
		// only send one notification per ten seconds
		window.tsPmPing = setTimeout(() => {
			window.tsPmPing = null
		}, 10 * 1000)
	}
}
tS.prototype.onChat = function(e) {
	if (this.config.ping_chat && !window.tsChatPing) {
		let ping = `@${this.core.user.attributes.name}`
		if (e.text.indexOf(ping) > -1) this.notifyUser({
			head: `[${this.room.roomData.name}] @${e.name}`, text: e.text
		})
		// only send one notification every ten seconds
		window.tsChatPing = setTimeout(() => {
			window.tsChatPing = null
		}, 10 * 1000)
	}
}
tS.prototype.onSong = function(e) {
	this.runAutobop()
	if (this.mute) this.toggleMute()

	// save the current as the last played
	if (!this.now_playing) this.last_played = {}
	else this.last_played = { ...this.now_playing }
	// set the current song to the new one
	this.now_playing = {
		love: 0, hate: 0, snag: 0,
		...e.room.metadata.current_song.metadata
	}
	
	let head = `Now Playing: ${this.now_playing.song}`
	let text = `By: ${this.now_playing.artist}`

	if (this.last_played.song) {
		let last = this.last_played
		let stat = `[${last.love}🔺|${last.hate}🔻|${last.snag}❤️]`
		text = `${stat} - ${last.song}`

		if (this.config.chat_stat) this.sendToChat(`Last:`, text)
		if (this.last_played.song) text = `Last: ${text}`
	}

	if (this.config.ping_song) this.notifyUser({ head, text })
}
tS.prototype.onSnag = function(e) {
	this.now_playing.snag += 1
	if (this.config.chat_snag) {
		let name = this.room.userMap[e.userid].attributes.name
		this.sendToChat(name, `has snagged this track!`, 'snag')
	}
}
tS.prototype.onVote = function(e) {
	this.now_playing.love = e.room.metadata.upvotes
	this.now_playing.hate = e.room.metadata.downvotes
}
tS.prototype.onJoin = function(e) {
	if (this.config.chat_join) {
		this.sendToChat(e.user[0].name, `joined.`, 'join')
	}
}
tS.prototype.onLeft = function(e) {
	if (this.config.chat_gone) {
		this.sendToChat(e.user[0].name, `left.`, 'leave')
	}
}

const $tS = window.$tS = new tS()