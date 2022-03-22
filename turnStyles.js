let turnStyles = window.$tS = {}
// a thing by pixelcrisis

require("./utility/utility.js")(turnStyles)
require("./storage/storage.js")(turnStyles)
require("./options/options.js")(turnStyles)
require("./plugins/plugins.js")(turnStyles)

const init = () => {
	// throw errors for older plugins
	if (!window.tsBase) {
		let ts_url = "https://ts.pixelcrisis.co"
		let issues = `Oops! Something went wrong with turnStyles! 
		If this is a bookmarklet, you may need to update it.
		To update, view the ts website at ${ ts_url } 
		Clicking OK will attempt to open the turnStyles website in a new tab.`
		let update = () => window.open(ts_url, "_blank")
		
		if (window.confirm(issues)) update()
		return false
	}

	turnStyles.attach()
}

init()