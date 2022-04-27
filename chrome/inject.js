const target = chrome || browser
const stored = window.localStorage.getItem("tsdb")
const remove = window.localStorage.getItem("ts-reset")
const bridge = target.storage ? target.storage.sync : false

const Attach = () => {
	if (remove) return Format()
	if (bridge) return Backup()
	else return Inject()
}

const Format = () => {
	// wipe out all tS data
	window.localStorage.removeItem("tsdb")
	window.localStorage.removeItem("ts-reset")
	if (bridge) bridge.remove([ "tsdb" ], () => Backup())
	else Inject()
}

const Backup = () => {
	// save to bridge (addon db)
	let save = stored && !remove
	let tsdb = save ? JSON.parse(stored) : false
	if (tsdb) bridge.set({ tsdb })
	// listen for db update messages
	window.addEventListener("message", Update)
	// fetch and inject our app data 
	bridge.get([ "tsdb" ], db => Inject(db))
}

const Update = ev => {
	let tsdb = ev.data.tsdb
	if (tsdb) bridge.set({ tsdb: tsdb })
}

const Inject = db => {
	// inject tS data and scripts
	let backup = db ? JSON.stringify(db.tsdb || {}) : false
	let script = target.runtime.getURL("turnStyles.js")
	let extURL = script.split("/turnStyles.js")[0]
	// inject the base URL/sync data
	window.localStorage.setItem("tsBase", extURL)
	window.localStorage.setItem("tsSync", backup)
	// the main script gets us started
	Append(script)
}

const Append = js => {
	// append JS file/code to DOM
	let isFile = js.indexOf(".js") > -1
	let script = document.createElement("script")
	if (isFile) script.src = js
	else script.textContent = js
	script.type = "text/javascript"
	document.body.append(script)
}

Attach()