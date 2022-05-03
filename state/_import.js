module.exports = App => {

	// import datasets
	App.static = require("./static.json")
	App.twitchIcons = require("./twitch_ids.json")
	App.bttvIcons = require("./bttv_ids.json")

	let configs = require("./configs.json")
	App.default = configs.default
	App.options = configs.options

	// import data tools
	require("./storage.js")(App)
	require("./session.js")(App)
	require("./control.js")(App)

	App.Bind("attach", function (room) {
		this.bindSession(room)
	})

}