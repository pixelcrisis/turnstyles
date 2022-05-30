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
	version: require("./package.json").version, 
	debugging: true
})

// import and build out the extension
require("./core/_import.js")(turnStyles)
require("./plugin/_import.js")(turnStyles)

// start or die
if (base) turnStyles.$attach()
else turnStyles.Update()