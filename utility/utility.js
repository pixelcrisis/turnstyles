// utility.js | our core utilities

module.exports = App => {

  App.now = () => new Date().toLocaleTimeString("en-us")
  App.cap =  s => s[0].toUpperCase() + s.substring(1)

  App.classes = (name, on) => {
    // toggle classes on the DOM
    let has = $('body').hasClass(name)
    if (on && !has) $('body').addClass(name)
    if (has && !on) $('body').removeClass(name)
  }

  require("./ttlink.js")(App)
  require("./events.js")(App)
  require("./timing.js")(App)
  require("./logger.js")(App)
  require("./notify.js")(App)
  require("./attach.js")(App)

  App.on("attach", function () {
    this.bindLogs()
    this.bindTimer()
    this.canNotify()
  })

}