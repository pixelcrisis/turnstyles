const tools = {
  showPanel: () => $("#tsWindow").addClass("active"),
  hidePanel: () => $("#tsWindow").removeClass("active"),

  syncPanel (key, val) { // mirror the config values
    let prop = typeof val == "boolean" ? "checked" : "value"
    $(`*[data-opt="${ key }"]`).prop(prop, val)
  },

  savePanel (e) { // save panel changes to config
    let option = this.findPanel(e)
    if (!option) return
    this.set(option.key, option.val)
    if (!this.emitPanel(option.key)) return
    // emit save events only in rooms (mostly)
    this.emit("save", key, val)
  },

  findPanel (e) { // find config from element
    let cfg = e.target.dataset
    if (!cfg.opt && !cfg.for) return
    let key = cfg.for || cfg.opt
    let txt = e.target.type != "checkbox"
    let val = e.target[txt ? "value" : "checked"]
    if (cfg.for) val = $(`*[data-opt="${ key }"]`).val()
    return { key, val }
  },

  emitPanel () { // can we emit the save event?
    if (!this.lobby) return true // not in the lobby
    // only emit visual changes in the lobby
    let has = [ "theme", "color", "style" ].includes(key)
    if (!has) has = key.indexOf("hb.") === 0
    if (!has) has = key.indexOf("hide.") === 0
    if (!has) has = key.indexOf("show.") === 0
    return has || key.indexOf("qtbtn") === 0
  }
}

const events = {
  esc: tools.hidePanel
}

export default { tools, events }