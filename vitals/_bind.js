module.exports = App => {

  // import vital scripts
  require("./global.js")(App)
  require("./events.js")(App)
  require("./timing.js")(App)
  require("./logger.js")(App)
  require("./debugs.js")(App)
  require("./alerts.js")(App)
  require("./notify.js")(App)
  require("./reload.js")(App)
  require("./attach.js")(App)

  App.Bind("lobby", function () {
    this.bindLogger()
    this.bindDebugs()
  })

  App.Bind("attach", function (room) {
    this.bindWatcher(room)
    this.bindLoop(room)
    this.bindLogger(room)
    this.bindDebugs(room)
    this.bindNotify(room)
  })

}