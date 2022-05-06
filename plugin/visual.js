// visual.js | changing and toggling elements

module.exports = App => {

	App.loadClass = function (config) {
		this.bodyClass("ts-logger", config.logger)
		this.bodyClass("ts-no-bub", !config.bubble)
		this.bodyClass("ts-no-ppl", !config.people)
		this.bodyClass("ts-no-vid", !config.player)
	}

  App.bindClass = function () {
    this.Bind("update", function (key, val, grp) {
      if (key == "bubble") this.bodyClass("ts-no-bub", !val)
      if (key == "player") this.bodyClass("ts-no-vid", !val)
      if (key == "people") this.bodyClass("ts-no-ppl", !val)
      if (key == "logger") this.bodyClass("ts-logger", val)
    })
  }

}