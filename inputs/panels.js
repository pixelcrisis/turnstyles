// window.js | our settings window

module.exports = App => {

  App.bindPanels = function () {
    $("#tsWindow").remove()
    $("body").append( Panels() )

    $("#tsWindow").on("click", closeFromWindow)
    $("#tsPanels .ts-tab").on("click", switchTab)
    $("#tsCloseBtn").on("click", this.closePanels)
    $("#tsBackup input").on("change", this.uploadData)
    $("#tsPanels *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsPanels *[data-opt]").on("change", this.saveConfig.bind(this))
  }

  const Panels = () => `
    <div id="tsWindow">
      <div id="tsPanels">
        <h2><span id="tsCloseBtn">✖</span>turnStyles options</h2>
        <nav> ${ App.tabs.map( TabHead ).join("") } </nav>
        ${ App.tabs.map( TabBody ).join("") }
      </div>
    </div>
  `

}

const TabHead = function (tab) {
  let name = tab.name, type = "ts-tab"
  if (name == "General") type += " active"
  return `<div data-tab="${ name }" class="${ type }">${ name }</div>`
}

const TabBody = function (tab) {
  let name = tab.name, type = "ts-tabbed"
  if (name == "General") type += " active"
  return `<div data-tab="${ name }" class="${ type }">${ tab.body() }</div>`
}

// close panels if clicked outside
const closeFromWindow = function (e) {
  let clicked = e.target == this
  if (clicked) $("#tsWindow").removeClass("active")
}

const switchTab = function (e) {
  let target = e.target.dataset.tab
  $("#tsPanels .active").removeClass("active")
  $(`*[data-tab="${ target }"]`).addClass("active")
}