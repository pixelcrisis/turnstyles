// storage.js | saving our configs

module.exports = tS => {

  // the main saveConfig handler
  // called on all option items
  tS.saveConfig = function saveConfig (e) {
    // parse the key and data
    let which = e.target.dataset.for
    let check = e.target.type == "checkbox"
    let value = check ? e.target.checked : e.target.value

    // if we are using a button func, parse it
    if (which.indexOf('ts_') === 0) {
      value = $(`#${which}`).val()
      which = which.split('ts_').join('')
    }

    // save the update
    this.writeConfig(which, value)

    // only emit update if in room or a visual update
    let visual = ['style', 'theme', 'user_css'].includes(which)
    if (visual || !this.lobby) this.emit('update', which, value)
  }

  // update the config object and write to "db"
  tS.writeConfig = function writeConfig (opt, val) {
    this.config[opt] = val
    // save the updated config locally
    let stored = JSON.stringify(this.config)
    window.localStorage.setItem('tsdb', stored)
    // check if a checkbox or text input
    let toggle = typeof val === 'boolean'
    // mirror the option between window/hotbar
    let mirror = $(`*[data-for="${opt}"]`)
    mirror.prop(toggle ? 'checked' : 'value', val)
  }

}