// hide / show the panel
const panelShow = () => $("#tsWindow").addClass("active")
const panelHide = () => $("#tsWindow").removeClass("active")

// mirror the config values 
const panelSync = function (key, val) {
  let prop = typeof val == "boolean" ? "checked" : "value"
  return $(`*[data-opt="${ key }"]`).prop(prop, val)
}

// save panel values to config
const panelSave = function (e) {
  let option = this.panelFind(e)
  if (!option) return false
  let { key, val } = option
  this.set(key, val)
  // only visual updates in lobby
  if (!this.panelSend(key)) return false
  return this.emit("save", key, val)
}

// find changed element from event
const panelFind = function (e) {
  let item = e.target.dataset
  if (!item.opt && !item.for) return
  // figure out which item it is
  let name = item.for || item.opt
  let bool = e.target.type == "checkbox"
  let data = bool ? e.target.checked : e.target.value
  if (item.for) data = $(`*[data-opt="${ name }"]`).val()
  return { key: name, val: data }
}

// check if we can send updates
const panelSend = function () {
  if (!this.lobby) return true
  let has = [ "theme", "color", "style" ].includes(key)
  if (!has) has = key.indexOf("hb.") == 0
  if (!has) has = key.indexOf("hide.") == 0
  if (!has) has = key.indexOf("show.") == 0
  return key.indexOf("qtbtn") == 0
}

import apply_inputs from "../panel/inputs.js"
import apply_hotbar from "../panel/hotbar.js"
import apply_tabbed from "../panel/tabbed.js"
import apply_window from "../panel/window.js"

export default app => {
  Object.assign(app, { 
    panelShow, panelHide, panelSync, 
    panelSave, panelFind, panelSend
  })
  apply_inputs(app)
  apply_hotbar(app)
  apply_tabbed(app)
  apply_window(app)
}