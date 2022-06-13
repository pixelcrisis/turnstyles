// turnStyles for turntable.fm
// overcomplicated, by pixelcrisis
import TBA from "../../tt-browser-api/index.js"
import App from "./import.js"

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

// now let's define our app
let turnStyles = window.$ts = new TBA({ 
	base, data, sync, debugging: true,
	name: "turnStyles", label: "TS",
	icon: `${ base }/images/icon128.png`
})

// build app
App(turnStyles)
if (base) turnStyles.attach()
else turnStyles.update()