const ext = chrome || browser
const url = ext.runtime.getURL("turnStyles.js")

const inject = () => {
	// inject url base into the window
	// this tells the script we're an extension
	const path = url.split("/turnStyles.js")[0]
	const base = document.createElement("script")
	base.textContent = `window.tsBase = "${path}"`
	base.type = "text/javascript"
	document.body.append(base)

	// inject the main turnStyles script
	const main = document.createElement("script")
	main.type = "text/javascript"
	main.src = url
	document.body.append(main)
}

const sync = () => {
	let local = window.localStorage.getItem("tsdb")
	if (local) ext.storage.sync.set({ tsdb: JSON.parse(local) })
	ext.storage.sync.get([ "tsdb" ], result => {
		let store = result.tsdb ? JSON.stringify(result.tsdb) : ""
		const data = document.createElement("script")
		data.textContent = `window.tsSync = ${ store }`
		data.type = "text/javascript"
		document.body.append(data)
		inject()
	})
}

const init = () => {
	if (!ext.storage) inject()
	else sync()
}

init()