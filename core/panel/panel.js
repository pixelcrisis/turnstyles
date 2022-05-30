module.exports = TS => {

  // quick toggles to hide/show
  TS.showPanel = () => $("#tsWindow").addClass("active")
  TS.hidePanel = () => $("#tsWindow").removeClass("active")

  TS.syncPanel = function (name, data) {
    // mirror config values inside the panel
    let type = typeof data == "boolean" ? "checked" : "value"
    $(`*[data-opt="${ name }"]`).prop(type, data)
  }
  
  TS.savePanel = function (event) {
    let option = this.getOption(event)
    if (!option) return false
    // save config updates from panel
    let { name, data } = option
    this.setConfig(name, data)
    // only emit visual updates in lobby
    let update = !this.lobby || !VISUAL.includes(name)
    if (update) this.$emit("update", name, data)
  }

  TS.getOption = function (event) {
    let elem = event.target, item = elem.dataset
    if (!item.opt && !item.for) return false
    // figure out which item we need to save
    let name = item.for || item.opt
    let bool = elem.type == "checkbox"
    let data = bool ? elem.checked : elem.value
    // fetch a value if we're saving a "for"
    if (item.for) data = $(`*[data-opt="${ name }"]`).val()
    return { name, data }
  }

}

const VISUAL = [ "style", "theme", "u_css", "hotbar" ]