// config.js | handles storage, defaults, options

module.exports = tS => {

  tS.prototype.default = {
    theme: "dark",
    style: "",

    autobop: true,

    nextdj: false,
    pingdj: false,

    has_vol: false,

    no_aud: true,
    no_vid: true,

    ping_pm: false,
    ping_song: false,
    ping_chat: false,

    chat_song: false,
    chat_spun: false,
    chat_snag: false,
    chat_join: false,
    chat_left: false
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
      purple: "Purple"
    }
  }

  tS.prototype.loadConfig = function () { 
    this.buildCache()
    this.chrome = !!window.tsBase // check if we're an extension
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