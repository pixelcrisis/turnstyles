// config.js | handles saving, defaults, options

module.exports = tS => {

  tS.default = {
    theme: "dark",
    style: "",

    autobop: true,

    nextdj: false,
    pingdj: false,

    has_vol: false,

    no_aud: false,
    no_vid: false,

    ping_pm: false,
    ping_song: false,
    ping_chat: false,

    chat_song: false,
    chat_spun: false,
    chat_snag: false,
    chat_join: false,
    chat_left: false
  }

  tS.options = {
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

  tS.saveConfig = function (e) {
    let toggle = e.target.type == "checkbox"
    let option = e.target.id.split('ts_').join('')
    let saving = toggle ? e.target.checked : e.target.value

    // mirror values between hot bar and main option window
    let mirror = $(`#ts_hotbar #${e.target.id}, #ts_window #${e.target.id}`)
    mirror.prop(toggle ? 'checked' : 'value', saving)

    this.config[option] = saving
    let stored = JSON.stringify(this.config)
    window.localStorage.setItem("tsdb", stored)

    this.Log('saved config')
    this.emit('update', option, saving)
  }

}