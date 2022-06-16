const tools = {
  loadWindow () {
    $("#tsWindow").remove()
    $("body").append(this.makeWindow())
    $(".ts-tab").on("click", this.moveTabs)
    $("#tsClose").on("click", this.hidePanel)
    $(ts_panels).on("click", this.toggleHelp)
    $("#tsWindow").on("click", this.hideWindow.bind(this))
    $(ts_backup).on("change", this.uploadData.bind(this))
    $(ts_option).on("change", this.savePanel.bind(this))
    $(ts_button).on("click", this.savePanel.bind(this))
  },

  hideWindow (e) {
    if (e.target == e.currentTarget) this.hidePanel()
  },

  toggleHelp (e) {
    if (e.target.nodeName != "ARTICLE") return
    $(e.target).toggleClass("ts-help")
  },

  makeWindow () {
    return $ts_window(this.icon, `
      ${ this.listTabs() }${ this.makeTabs() }
    `)
  }
}

const events = {
  lobby: tools.loadWindow,
  attach: tools.loadWindow
}

const ts_panels = "#tsPanels article"
const ts_backup = "#tsBackup input"
const ts_option = "#tsHotbar *[data-opt]"
const ts_button = "#tsHotbar *[data-for]"

const $ts_window = (icon, body) => `
  <div id="tsWindow">
    <div id="tsPanels">
      <header>
        <img id="tsLogo2" src="${ icon }">
        <h2>turnStyles Config</h2><span id="tsClose">✖</span>
      </header>
      ${ body }
    </div>
  </div>
`

export default { tools, events }