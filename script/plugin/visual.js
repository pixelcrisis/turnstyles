const events = {
  attach: function loadVisual () {
    this.bodyClass("ts-recent", this.get("use.recent"))
    this.bodyClass("ts-resize", this.get("use.resize"))
    this.bodyClass("ts-logger", this.get("show.logger"))
    this.bodyClass("ts-no-bub", this.get("hide.bubble"))
    this.bodyClass("ts-no-vid", this.get("hide.player"))
    this.bodyClass("ts-no-ppl", this.get("hide.people"))
  },

  data: function loadDebug (config) {
    this.debugging = config.debug
  },

  save: function saveVisual (key, val) {
    if (key == "use.recent")  this.bodyClass("ts-recent", val)
    if (key == "show.logger") this.bodyClass("ts-logger", val)
    if (key == "hide.bubble") this.bodyClass("ts-no-bub", val)
    if (key == "hide.player") this.bodyClass("ts-no-vid", val)
    if (key == "hide.people") this.bodyClass("ts-no-ppl", val)
    if (key == "debug") this.debugging = val
  }
}

export default { events }