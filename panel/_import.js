module.exports = App => {

  require("./layout.js")(App)
  require("./hotbar.js")(App)
  require("./tabbed.js")(App)
  require("./window.js")(App)

  App.showPanel = () => $("#tsWindow").addClass("active")
  App.hidePanel = () => $("#tsWindow").removeClass("active")

  App.bindPanel = function () {
    this.bindHotBar()
    this.bindToggle()
    this.bindWindow()
  }

  App.Bind("lobby", App.bindPanel)
  App.Bind("attach", App.bindPanel)

}