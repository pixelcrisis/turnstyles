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