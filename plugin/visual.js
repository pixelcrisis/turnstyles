// visual.js | changing and toggling elements

module.exports = App => {

	App.loadVisual = function (config) {
		this.Body("ts-logger", config.logger)
		this.Body("ts-no-bub", !config.bubble)
		this.Body("ts-no-ppl", !config.people)
		this.Body("ts-no-vid", !config.player)
	}

  App.bindVisual = function () {
    this.Bind("update", function (key, val) {
      if (key == "bubble") this.Body("ts-no-bub", !val)
      if (key == "player") this.Body("ts-no-vid", !val)
      if (key == "people") this.Body("ts-no-ppl", !val)
      if (key == "logger") this.Body("ts-logger", val)
    })
  }

}