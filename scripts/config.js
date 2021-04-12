// config.js | handles saving, defaults, options

module.exports = tS => {

  tS.default = {
    logging: false,
    
    theme: "dark",
    style: "",

    autobop: true,

    nextdj: false,
    pingdj: false,

    has_vol: false,

    no_aud: false,
    no_vid: false,
    no_bub: false,

    ping_pm: false,
    ping_song: false,
    ping_chat: false,

    chat_song: false,
    chat_spun: false,
    chat_snag: false,
    chat_join: false,
    chat_left: false,

    is_afk: false,
    afk_ping: `I'm AFK - Back in a sec!`,

    beats: 0,
    remind: 0,
    reminder: '',

    user_css: ''
  }

  tS.options = {
    theme: {
      dark: "Dark Mode",
      night: "Night Mode",
      forest: "Forest",
      cosmic: "Cosmic",
      midnight: "Midnight"
    },
    style: {
      pink: "Pink",
      blue: "Blue",
      teal: "Teal",
      green: "Green",
      purple: "Purple"
    },
    remind: {
      0: "Don't Remind",
      15: "Every 15m",
      30: "Every 30m",
      60: "Every 1h",
      120: "Every 2h"
    }
  }

  tS.saveConfig = function saveConfig (e) {
    let toggle = e.target.type == "checkbox"
    let option = e.target.id.split('ts_').join('')
    let saving = toggle ? e.target.checked : e.target.value

    // interpret button presses
    if (option.indexOf('btn_') === 0) {
      option = option.split('btn_').join('')
      saving = $(`#ts_${option}`).val()
    }

    this.writeConfig(option, saving)

    // emit update for rooms, update themes in lobby
    let visual = option == "style" || option == "theme" || option == 'user_css'

    if (!this.lobby) this.emit('update', option, saving)
    else if (visual) this.updateThemes(option, saving)
  }

  tS.writeConfig = function writeConfig (opt, val) {
    this.config[opt] = val
    let stored = JSON.stringify(this.config)
    window.localStorage.setItem("tsdb", stored)
    this.mirroredOpt(opt, val)
    this.Log(`saved config`)
  }

  tS.mirroredOpt = function mirrorOption (opt, val) {
    let toggle = typeof val === 'boolean'
    let mirror = $(`#ts_quick #ts_${opt}, .ts_tab #ts_${opt}`)
    mirror.prop(toggle ? 'checked' : 'value', val)
  }

}