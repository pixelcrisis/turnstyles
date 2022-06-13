// capitalize a string
const capStr = str => str[0].toUpperCase() + str.substring(1)
// get words etc from a string
const strArr = (str, at = " ") => str.split(at).map(s => s.trim())

// get 00:00 timestamp
const getTime = function () {
	let time = new Date().toLocaleTimeString("en-US")
	return time.split(":").splice(0, 2).join(":")
}

// generate a local link
const getLink = function (file, folder) {
	if (!file) return "#"
	let path = folder ? `${ folder }/${ file }` : file
	return `${ this.base }/${ path }?v=${ Math.random() }`
}

// split a label from a string
const labeled = function (text, label) {
	let name = label || "none"
	let none = text.indexOf("||") < 0
	if (none) return [ name, text ]
	text = text.split("||")
	name = text.shift().trim()
	return [ name, text.join("").trim() ]
}

// force update if broken
const update = function () {
	let link = this.strings.website
	let open = () => window.open(link, "_blank")
	if (window.confirm(update_ts)) open()
}

const reload = function () {
	this.detach()
	this.print(`Reloading...`)
	$(`script[src*="turnStyles.js"]`).remove()
	window.localStorage.setItem("tsBase", this.base)
	return this.insertScript(this.getLink("turnStyles.js"))
}

// share a link to turnStyles
const share = function () {
	if (!window.confirm(share_ts)) return false
	this.batch([ share_head, share_text, share_link ])
	return this.panelHide()
}

export default app => {
	Object.assign(app, {
		capStr, strArr, getTime, getLink,
		labeled, update, reload, share
	})
}

const update_ts = `Oops! turnStyles is broken!
If this is a bookmarklet, you may need to update it.
Visit the turnStyles website at turnstyles.xyz to update!
Clicking OK will attempt to open the update in a new tab.`

const share_ts = "Share turnStyles in the room chat?"
const share_head = "Check out turnStyles!"
const share_text = "Autobop, Emojis, Themes, & More!"
const share_link = "https://turnstyles.xyz"