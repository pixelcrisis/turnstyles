module.exports = App => {

  require("./layout.js")(App)
  require("./tabbed.js")(App)
  require("./hotbar.js")(App)
  require("./window.js")(App)

  App.on("attach", function () {
    this.bindHotBar()
    this.bindWindow()
  })

}