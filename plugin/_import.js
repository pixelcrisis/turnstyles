module.exports = App => {

	require("./visual.js")(App)
	require("./volume.js")(App)
	require("./chat.js")(App)
	require("./songs.js")(App)
	require("./bop.js")(App)
	require("./ding.js")(App)
	require("./stats.js")(App)
	require("./afk.js")(App)
	require("./remind.js")(App)
	require("./deck.js")(App)
	require("./emote.js")(App)
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
		this.bindSongs(room)
		this.bindBop(room)
		this.bindDings(room)
		this.bindStats(room)
		this.bindAfk(room)
		this.bindRemind(room)
		this.bindDecks(room)
		this.bindEmotes(room)
		this.bindSuggest(room)
	})

}