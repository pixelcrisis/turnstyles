// bind config window on attach
const windowLoad = function () {
  $("#tsWindow").remove()
  $("body").append(this.windowMake())
  this.on("esc", this.panelHide)
  $(".ts-tab").on("click", this.tabMove)
  $("#tsClose").on("click", this.panelHide)
  $("#tsWindow").on("click", close_from_window)
  $("#tsPanels article").on("click", toggle_help)
  $("#tsBackup input").on("change", this.dataUpload.bind(this))
  $("#tsPanels *[data-for]").on("click", this.panelSave.bind(this))
  $("#tsPanels *[data-opt]").on("change", this.panelSave.bind(this))
}

const windowMake = function () { return `
  <div id="tsWindow">
    <div id="tsPanels">
      <header>
        <img id="tsLogo2" src="${ this.icon }">
        <h2>turnStyles Config</h2><span id="tsClose">✖</span>
      </header>
      ${ this.tabList() } ${ this.tabBody() }
    </div>
  </div>
`}

export default app => {
  app.on([ "lobby", "attach" ], windowLoad)
  Object.assign(app, { windowMake })
}

// close if clicked outside of panel
const close_from_window = function (e) {
  let clicked = e.target == this
  if (clicked) $("#tsWindow").removeClass("active")
}

// toggle the help block
const toggle_help = function (e) {
  let target = e.target
  if (e.target.nodeName != "ARTICLE") return
  $(target).toggleClass("ts-help")
}