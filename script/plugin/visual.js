const events = {
  attach: function loadVisual (config) {
    this.bodyClass("ts-recent", config["use.recent"])
    this.bodyClass("ts-resize", config["use.resize"])
    this.bodyClass("ts-logger", config["show.logger"])
    this.bodyClass("ts-no-bub", config["hide.bubble"])
    this.bodyClass("ts-no-vid", config["hide.player"])
    this.bodyClass("ts-no-ppl", config["hide.people"])
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