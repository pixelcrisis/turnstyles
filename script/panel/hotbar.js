const tools = {
  loadHotbar () {
    $(ts_hotbar).remove()
    $(tt_header).append(this.makeHotbar())
    $(tt_option).first().before($ts_button())
    $(ts_option).on("change", this.savePanel.bind(this))
    $(ts_button).on("mouseup", this.savePanel.bind(this))
    $(".ts-menu").on("mouseup", this.showPanel)
    this.bodyClass("hb-qtbtn1", !this.get("hb.qtbtn1"))
    this.bodyClass("hb-qtbtn2", !this.get("hb.qtbtn2"))
    this.bodyClass("hb-qtbtn3", !this.get("hb.qtbtn3"))
    this.bodyClass("hb-dj-auto", !this.get("hb.dj.auto"))
    this.bodyClass("hb-dj-next", !this.get("hb.dj.next"))
    this.bodyClass("hb-dj-done", !this.get("hb.dj.done"))
    this.bodyClass("hb-autobop", !this.get("hb.autobop"))
    this.bodyClass("hb-afk-idle", !this.get("hb.afk.idle"))
    this.bodyClass("hb-share", !this.get("hb.share"))
  },

  saveHotbar (key) {
    if (key.indexOf("qt") !== 0) return
    if (key.indexOf("hb") !== 0) return
    this.loadHotbar()
  },

  makeHotbar () {
    return $ts_hotbar(this.icon, `
      ${ this.$bool("AFK", "afk.idle", "hbIdle") }
      ${ this.$bool("Autobop", "autobop", "hbBop") }
      ${ this.$bool("AutoQueue", "dj.auto", "hbAutoDJ") }
      ${ this.$bool("Next DJ", "dj.next", "hbNextDJ") }
      ${ this.$bool("Escort", "dj.done", "hbDoneDJ") }
      ${ this.$qt("1") } ${ this.$qt("2") }
      ${ this.$qt("3") } ${ this.$qt("4") }
      ${ this.$btn("Share", false, "share", "hbShare") }
    `)
  }
}

const events = {
  save: tools.saveHotbar,
  lobby: tools.loadHotbar,
  attach: tools.loadHotbar
}

const tt_header = ".header-bar"
const tt_option = "#settings .dropdown ul li"
const ts_hotbar = "#tsHotbar, .ts-menu"
const ts_option = "#tsHotbar *[data-opt]"
const ts_button = "#tsHotbar *[data-for]"

const $ts_hotbar = (icon, body) => `
  <div id="tsHotbar">
    <div class="wrap">
      <span id="tsMenu" class="ts-menu">☰</span>
      <img src="${ icon }" id="tsLogo" class="ts-menu">
      ${ body }
    </div>
  </div>
`
const $ts_button = () => `
  <li class="option link ts-menu">
    <a><strong><em>turnStyles Config</em></strong></a>
  </li>
`

export default { tools, events }