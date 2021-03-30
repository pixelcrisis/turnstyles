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

  tS.prototype.saveConfig = function () {
    this.config.theme     = $("#ts_theme").val()
    this.config.style     = $("#ts_style").val()

    this.config.autobop   = $("#ts_autobop").is(':checked')

    this.config.nextdj    = $('#ts_nextdj').is(':checked')
    this.config.pingdj    = $('#ts_pingdj').is(':checked')
    
    this.config.has_vol   = $('#ts_has_vol').is(':checked')

    this.config.ping_pm   = $('#ts_ping_pm').is(':checked')
    this.config.ping_chat = $('#ts_ping_chat').is(':checked')
    this.config.ping_song = $('#ts_ping_song').is(':checked')

    this.config.chat_stat = $('#ts_chat_stat').is(':checked')
    this.config.chat_snag = $('#ts_chat_snag').is(':checked')
    this.config.chat_join = $('#ts_chat_join').is(':checked')
    this.config.chat_left = $('#ts_chat_left').is(':checked')

    let stored = JSON.stringify(this.config)
    window.localStorage.setItem("tsdb", stored)
    this.log('saved config')
    this.onSave()
  }

}