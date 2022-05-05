module.exports = App => {

  // import our core scripts
  require("./tools.js")(App)
  require("./events.js")(App)
  require("./loop.js")(App)
  require("./theme.js")(App)
  require("./logger.js")(App)
  require("./debug.js")(App)
  require("./alert.js")(App)
  require("./notify.js")(App)
  require("./reload.js")(App)
  require("./attach.js")(App)

  App.Bind("loaded", function (config) {
    this.loadTheme(config)
  })

  App.Bind("lobby", function () {
    this.bindLogger()
    this.bindDebugs()
  })

  App.Bind("attach", function (room) {
    this.bindWatcher(room)
    this.bindLoop(room)
    this.bindTheme(room)
    this.bindLogger(room)
    this.bindDebug(room)
    this.bindNotify(room)
  })

}