// window.js | our settings window

module.exports = App => {

  App.bindWindow = function () {
    $("#tsWindow").remove()
    $("body").append( Window() )

    $(".ts-tab").on("click", switchTab)

    $("#tsClose").on("click", this.hidePanel)
    $("#tsWindow").on("click", closeFromWindow)

    $("#tsPanels *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsPanels *[data-opt]").on("change", this.saveConfig.bind(this))
    
    $("#tsBackup input").on("change", this.uploadData)
    $("#tsPanels article").on("click", toggleHelp)
  }

  const Window = () => `
    <div id="tsWindow" class="active">
      <div id="tsPanels">
        <header>
          <img src="${ App.logo }" id="tsLogo2"> 
          <h2>turnStyles Config</h2>
          <span id="tsClose">✖</span>
        </header>
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

const toggleHelp = function (e) {
  let target = e.target
  $(target).toggleClass("ts-help")
}