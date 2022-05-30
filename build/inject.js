// turnStyles app injection

let self = chrome || browser
let file = self.runtime.getURL("turnStyles.js")
let sync = self.storage ? self.storage.sync : false

let data = window.localStorage.getItem("tsData")
let wipe = window.localStorage.getItem("tsWipe")

let Format = () => {
	data = false
	window.localStorage.removeItem("tsData")
	window.localStorage.removeItem("tsWipe")
	if (sync) sync.remove([ "tsData" ])
}

let Backup = () => {
	if (data) sync.set({ tsData: data })
	window.addEventListener("message", Update)
	sync.get([ "tsData" ], db => Inject(db))
}

let Update = ev => {
	let tsData = ev.data.tsData
	if (tsData) sync.set({ tsData })
}

let Inject = db => {
	let data = db ? db.tsData : "{}"
	let base = file.split("/turnStyles.js")[0]
	window.localStorage.setItem("tsBase", base)
	window.localStorage.setItem("tsSync", data)

	let elem = document.createElement("script")
	elem.src = `${ file }?v=${ Math.random() }`
	elem.type = "text/javascript"
	document.body.append(elem)
}

(function () {
	if (wipe) Format()
	if (sync) Backup()
	else return Inject()
})()