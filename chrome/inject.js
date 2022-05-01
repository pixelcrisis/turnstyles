// turnStyles preloading and injection

// what kind of browser are we in
const target = chrome || browser
const syncDB = target.storage ? target.storage.sync : false
const script = target.runtime.getURL("turnStyles.js")

const stored = window.localStorage.getItem("tsdb")
const remove = window.localStorage.getItem("ts-reset")

const Attach = () => {
	if (remove) return Format()
	if (syncDB) return Backup()
	else return Inject()
}

const Format = () => {
	// wipe out all tS data
	window.localStorage.removeItem("tsdb")
	window.localStorage.removeItem("ts-reset")
	if (syncDB) syncDB.remove([ "tsdb" ], () => Backup())
	else Inject()
}

const Backup = () => {
	// save to syncDB (addon db)
	let save = stored && !remove
	let tsdb = save ? JSON.parse(stored) : false
	if (tsdb) syncDB.set({ tsdb })
	// listen for db update messages
	window.addEventListener("message", Update)
	// fetch and inject our app data 
	syncDB.get([ "tsdb" ], db => Inject(db))
}

const Update = Event => {
	let tsdb = Event.data.tsdb
	if (tsdb) syncDB.set({ tsdb: tsdb })
}

const Inject = DB => {
	// inject tS data and scripts
	let tsSync = DB ? DB.tsdb : {}
	let tsBase = script.split("/turnStyles.js")[0]
	// inject the base URL/sync data
	if (tsSync) tsSync = JSON.stringify(tsSync)
	window.localStorage.setItem("tsBase", tsBase)
	window.localStorage.setItem("tsSync", tsSync)
	// the main script gets us started
	Append(script)
}

const Append = JS => {
	let elem = document.createElement("script")
	elem.src = `${ JS }?v=${ Math.random() }`
	elem.type = "text/javascript"
	document.body.append(elem)
}

Attach()