const tools = {
	onOff: bool => bool ? "On" : "Off",
	capStr: str => str[0].toUpperCase() + str.substring(1),
	strArr: (str, at = " ") => str.split(at).map(s => s.trim()),
	
	getTime () { // returns 00:00 fromatted timestamp
		let time = new Date().toLocaleTimeString("en-US")
		return time.split(":").splice(0, 2).join(":")
	},
	
	getLink (file, folder) { // generate local link
		let bust = `?v=${ Math.random() }`
		let path = folder ? `${ folder }/${ file }` : file
		return file ? `${ this.base }/${path}${ bust }` : "#"
	},
	
	prefix (text, pre) { // split prefix from a string
		let name = pre || false
		let none = text.indexOf("||") < 0
		if (none) return [ name, text ]
		text = text.split("||")
		name = text.shift().trim()
		return [ name, text.join("").trim() ]
	},
	
	update () { // force update if broken
		let link = this.strings.website
		if (window.confirm(can_update)) this.open(link)
	},
	
	reload () { 
		this.detach()
		this.print(`Reloading...`)
		$(`script[src*="turnStyles.js"]`).remove()
		window.localStorage.setItem("tsBase", this.base)
		this.insertScript(this.getLink("turnStyles.js"))
	},
	
	share () { // share turnStyles in chat
		if (!window.confirm(can_share)) return
		else this.hidePanel() // hide panel when shared
		this.batch([ 
			"Check out turnStyles!", 
			"Autobop, Emojis, Themes, & More!", 
			"https://turnstyles.xyz" 
		])
	}
}

const can_share = "Share turnStyles in the room chat?"
const can_update = `Oops! turnStyles is broken!
If this is a bookmarklet, you may need to update it.
Visit the turnStyles website at turnstyles.xyz to update!
Clicking OK will attempt to open the update in a new tab.`

export default { tools }