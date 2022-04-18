let turnStyles = window.$tS = {}
// a thing by pixelcrisis

require("./vitals/_bind.js")(turnStyles)
require("./config/_bind.js")(turnStyles)
require("./inputs/_bind.js")(turnStyles)
require("./plugin/_bind.js")(turnStyles)

const ts_url = "https://ts.pixelcrisis.co"
const issues = `Oops! Something went wrong with turnStyles! 
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

	turnStyles.Attach()
}

init()