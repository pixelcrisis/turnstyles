module.exports = App => {

  require("./layout.js")(App)
  require("./hotbar.js")(App)
  require("./tabbed.js")(App)
  require("./panels.js")(App)

  App.openPanels = () => $("#tsWindow").addClass("active")
  App.closePanels = () => $("#tsWindow").removeClass("active")

  App.bindInputs = function () {
    this.bindHotBar()
    this.bindPanels()
  }

  App.Bind("lobby", App.bindInputs)
  App.Bind("attach", App.bindInputs)

}