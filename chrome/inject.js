let core = chrome || browser
let tsdb = window.localStorage.getItem("tsdb")
let wipe = window.localStorage.getItem("ts-reset")
let sync = core.storage ? core.storage.sync : false
if (sync && wipe) window.localStorage.removeItem("ts-reset")

const append = js => {
	let file = js.indexOf(".js") > -1
	let elem = document.createElement("script")
	if (file) elem.src = js
	else elem.textContent = js
	elem.type = "text/javascript"
	document.body.append(elem)
}

const inject = sync => {
	let file = core.runtime.getURL("turnStyles.js")
	let base = file.split("/turnStyles.js")[0]
	// inject link base into the window
	// tells the script we're an extension
	append(`window.tsBase = "${ base }"`)
	// if we got a backup, inject that too
	if (sync) append(`window.tsSync = ${ sync }`)
	append(file)
}

const backup = () => {
	if (tsdb) sync.set({ tsdb: JSON.parse(tsdb) })
	if (wipe) sync.remove([ "tsdb" ], db => inject())
	else sync.get([ "tsdb" ], db => inject(JSON.stringify(db.tsdb || {})))
}

const init = () => {
	return sync ? backup() : inject()
}

init()