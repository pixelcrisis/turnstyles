module.exports = App => {
	
	require("./themes.js")(App)
	require("./visual.js")(App)
	require("./volume.js")(App)
	require("./chat.js")(App)
	require("./quicktext.js")(App)
	require("./playlist.js")(App)
	require("./alerts.js")(App)
	require("./stats.js")(App)
	require("./away.js")(App)
	require("./autobop.js")(App)
	require("./reminder.js")(App)
	require("./ondeck.js")(App)
	require("./emotes.js")(App)

	App.on("loaded", function (config) {
		this.loadThemes(config)
		this.loadClasses(config)
	})

	App.on("attach", function () {
		this.autoBop()
		this.bindPlaylist()
	})

}