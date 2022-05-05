module.exports = App => {

  require("./layout.js")(App)
  require("./hotbar.js")(App)
  // require("./tabbed.js")(App)
  // require("./window.js")(App)

  App.showPanel = () => $("#tsWindow").addClass("active")
  App.hidePanel = () => $("#tsWindow").removeClass("active")

  App.bindInputs = function () {
    this.bindHotBar()
    // this.bindPanels()
  }

  App.Bind("lobby", App.bindInputs)
  App.Bind("attach", App.bindInputs)

}