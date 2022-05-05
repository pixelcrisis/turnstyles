module.exports = App => {

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
		this.loadVisual(config)
	})

	App.Bind("lobby", function () {
		this.bindVisual()
	})

	App.Bind("attach", function (room) {
		this.bindVisual(room)
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