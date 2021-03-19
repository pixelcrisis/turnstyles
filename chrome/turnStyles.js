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
		saved: true,
		autobop: true,
		theme: "dark",
		style: "",
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

	log: (str) => console.info(`turnStyles :: ${str}`),
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

	this.core.addEventListener('message', this.runEvents.bind(this))

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

	this.base = window.tsBase || ''
	this.__.log("loaded config")
}
tS.prototype.saveConfig = function() {
	this.config.theme   = $("#ts_theme").val()
	this.config.style   = $("#ts_style").val()
	this.config.autobop = $("#ts_autobop").val()

	window.localStorage.setItem("tsdb", JSON.stringify(this.config))
	$('#ts_pane').removeClass('active')
	this.__.log("saved config")
	this.loadThemes()
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

// build our options menu
tS.prototype.buildPanel = function() {
	// the options window
	$('body').append(`
		<div id="ts_pane">
			<h2>turnStyles options</h2>
			
			<label>Theme</label>
			${this.handleOpts('theme')}
			
			<label>Style</label>
			${this.handleOpts('style')}

			<label>${this.handleBool('autobop')} Autobop</label>

			<button id="ts_close">Cancel</button>
			<button id="ts_save">Save</button>
		</div>
	`)
	// the menu toggle
	$('#layout-option').before(`
		<li class="ts link option">
			<a id="ts_open" href="#">turnStyles</a>
		</li>
	`)
	// bind up the events
	$('#ts_save').on('click', this.saveConfig.bind(this))
	$('#ts_open').on('click', () => $('#ts_pane').toggleClass('active'))
	$('#ts_close').on('click', () => $('#ts_pane').removeClass('active'))
}
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
	let checked = this.__.config[data] ? 'checked' : ''
	return `<input id="ts_${data}" type="checkbox" ${checked} />`
}

// event handlers
tS.prototype.runEvents = function(e) {
		if (!e.command) return
		if (e.command == "newsong") this.onNewSong(e)
}
tS.prototype.onNewSong = function(e) {
	this.runAutobop(e)
}

const $tS = window.$tS = new tS()