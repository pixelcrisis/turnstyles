// config.js | handles storage, defaults, options

module.exports = tS => {

  tS.prototype.default = {
    theme: "dark",
    style: "",

    autobop: true,

    nextdj: false,
    pingdj: false,

    has_vol: false,

    ping_pm: false,
    ping_song: false,
    ping_chat: false,

    chat_stat: true,
    chat_snag: true,
    chat_join: true,
    chat_left: true
  }

  tS.prototype.options = {
    theme: {
      dark: "Dark Mode",
      night: "Night Mode",
    },
    style: {
      pink: "Pink",
      blue: "Blue",
      teal: "Teal",
      green: "Green",
    }
  }

  tS.prototype.loadConfig = function () {
    // check to see if we're an extension
    this.chrome = !!window.tsBase
    this.__base = window.tsBase || 'https://ts.pixelcrisis.co/build'
    // fetch any saved configs 
    let storage = window.localStorage.getItem("tsdb")
    let configs = storage ? JSON.parse(storage) : {}
    // apply our defaults 
    this.config = { ...this.default, ...configs }
    this.log('loaded config')
  }

  tS.prototype.saveConfig = function (e) {
    let toggle = e.target.type == "checkbox"
    let option = e.target.id.split('ts_').join('')
    let saving = toggle ? e.target.checked : e.target.value

    // mirror values between hot bar and main option window
    let mirror = $(`#ts_panel #${e.target.id}, #ts_window #${e.target.id}`)
    mirror.prop(toggle ? 'checked' : 'value', saving)

    this.config[option] = saving
    let stored = JSON.stringify(this.config)
    window.localStorage.setItem("tsdb", stored)
    this.log('saved config')
    this.handleSave(option)
  }

}