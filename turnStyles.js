let turnStyles = window.$tS = {}
// a thing by pixelcrisis

require("./vitals/_import.js")(turnStyles)
require("./config/_import.js")(turnStyles)
require("./window/_import.js")(turnStyles)
require("./plugin/_import.js")(turnStyles)

const ts_url = "https://ts.pixelcrisis.co"
const update = `Oops! Something went wrong with turnStyles! 
If this is a bookmarklet, you may need to update it.
To update, view the ts website at ${ ts_url } 
Clicking OK will attempt to open the turnStyles website in a new tab.`

const init = () => {
	// throw errors for older plugins
	if (!window.tsBase) {
		let update = () => window.open(ts_url, "_blank")
		if (window.confirm(issues)) update()
		return false
	}

	turnStyles.attach()
}

init()