module.exports = App => {

	require("./themes.js")(App)
	require("./visual.js")(App)
	require("./volume.js")(App)
	require("./chat.js")(App)
	require("./playlist.js")(App)
	require("./autobop.js")(App)
	require("./dings.js")(App)
	require("./stats.js")(App)
	require("./away.js")(App)
	require("./remind.js")(App)
	require("./ondeck.js")(App)
	require("./emotes.js")(App)
	require("./suggest.js")(App)

	App.Bind("loaded", function (config) {
		this.loadTheme(config)
		this.loadClass(config)
	})

	App.Bind("lobby", function () {
		this.bindTheme()
		this.bindClass()
	})

	App.Bind("attach", function (room) {
		this.bindTheme(room)
		this.bindClass(room)
		this.bindVolume(room)
		this.bindChat(room)
		this.bindPlaylist(room)
		this.bindAutobop(room)
		this.bindAlerts(room)
		this.bindStats(room)
		this.bindAway(room)
		this.bindReminder(room)
		this.bindDecks(room)
		this.bindEmotes(room)
	})

}