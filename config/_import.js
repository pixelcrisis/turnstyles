module.exports = App => {

	require("./configs.js")(App)
	require("./iconids.js")(App)
	require("./migrate.js")(App)
	require("./restore.js")(App)
	require("./session.js")(App)
	require("./storage.js")(App)	

}