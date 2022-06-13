// load toggled ui elements
const uiLoad = function (config) {
  this.debugging = config["debug"]
  this.bodyClass("ts-recent", config["use.recent"])
  this.bodyClass("ts-logger", config["show.logger"])
  this.bodyClass("ts-logger", config["show.logger"])
  this.bodyClass("ts-no-bub", config["hide.bubble"])
  this.bodyClass("ts-no-ppl", config["hide.people"])
  this.bodyClass("ts-no-vid", config["hide.player"])
}

// update toggled ui elements
const uiSave = function (key, val) {
  if (key == "debug") this.debugging = val
  if (key == "use.recent") this.bodyClass("ts-played", val)
  if (key == "show.logger") this.bodyClass("ts-logger", val)
  if (key == "hide.bubble") this.bodyClass("ts-no-bub", val)
  if (key == "hide.player") this.bodyClass("ts-no-vid", val)
  if (key == "hide.people") this.bodyClass("ts-no-ppl", val)
}

export default app => {
  app.on("save", uiSave)
  app.on("data", uiLoad)
}