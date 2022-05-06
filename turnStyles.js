let turnStyles = window.$ts = {}
turnStyles.version = require("./package.json").version
// overcomplicated, by pixelcrisis

// first we make sure we were injected properly
// so we look up the base (bookmarklet or app?)
// and grab the sync db data (if using the app)
let ts_base = window.localStorage.getItem("tsBase")
let ts_sync = window.localStorage.getItem("tsSync")
let ts_data = window.localStorage.getItem("tsdb")

// remove base / sync to prevent caching
window.localStorage.removeItem("tsBase")
window.localStorage.removeItem("tsSync")

// ensure that we have something for data/sync
if (!ts_sync || ts_sync == "undefined") ts_sync = "{}"
if (!ts_data || ts_data == "undefined") ts_data = "{}"

// import our confs (jsons)
turnStyles.conf = require("./confs/config.json").default
turnStyles.opts = require("./confs/config.json").options
turnStyles.lang = require("./confs/static.json")
turnStyles.icoT = require("./confs/emoteT.json")
turnStyles.icoB = require("./confs/emoteB.json")
turnStyles.gold = require("./confs/patron.json")
turnStyles.logo = ts_base + "/images/icon128.png"

// import and build out the extension
require("./script/_import.js")(turnStyles)
require("./state/_import.js")(turnStyles)
require("./panel/_import.js")(turnStyles)
// require("./plugin/_import.js")(turnStyles)

// if we weren't injected properly, check update
let ts_url = "https://ts.pixelcrisis.co"
let issues = `Oops! Something went wrong with turnstyles!
If this is a bookmarklet, you may need to update it.
Visit the turnStyles website at ${ ts_url } to update!
Clicking OK will attempt to open the update in a new tab.`
let update = () => {
	let popup = () => window.open(ts_url, "_blank")
	if (window.confirm( issues )) popup()
}

// let's attempt to start
(function () {
	if (!ts_base) return update()
	turnStyles.base = ts_base
	turnStyles.sync = ts_sync
	turnStyles.data = ts_data
	turnStyles.Attach()
})()