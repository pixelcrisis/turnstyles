module.exports = App => {

	// import data tools
	require("./storage.js")(App)
	require("./session.js")(App)
	require("./mutates.js")(App)

	App.Bind("attach", function (room) {
		this.bindSession(room)
	})

}