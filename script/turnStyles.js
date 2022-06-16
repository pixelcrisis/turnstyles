// turnStyles for turntable.fm
// overcomplicated, by pixelcrisis
// include the local TBA for bleeding edge
import TBA from "../../tt-browser-api/index.js"

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
let name = "turnStyles"
let icon = `${ base }/images/icon128.png`
let turnStyles = window.$ts = new TBA({ 
	name, icon, base, data, sync
})

// and build it out 
import Apply_Core from "./core/apply.js"
import Apply_Store from "./store/apply.js"
import Apply_Panel from "./panel/apply.js"
import Apply_Plugin from "./plugin/apply.js"

Apply_Core(turnStyles)
Apply_Store(turnStyles)
Apply_Panel(turnStyles)
Apply_Plugin(turnStyles)

// start or die
if (base) turnStyles.attach()
else turnStyles.update()