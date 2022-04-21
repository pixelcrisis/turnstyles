// visual.js | changing and toggling elements

module.exports = App => {

	App.loadClass = function (config) {
		this.bodyClass("ts-logger", config.logger)
		this.bodyClass("ts-no-bub", !config.bubble)
		this.bodyClass("ts-no-ppl", !config.people)
		this.bodyClass("ts-no-vid", !config.player)

    this.bodyClass("hb-is-afk", !config.hotbar.is_afk)
    this.bodyClass("hb-auto-b", !config.hotbar.auto_b)
    this.bodyClass("hb-auto-q", !config.hotbar.auto_q)
    this.bodyClass("hb-nextdj", !config.hotbar.nextdj)
    this.bodyClass("hb-escort", !config.hotbar.escort)
    this.bodyClass("hb-bubble", !config.hotbar.bubble)
    this.bodyClass("hb-people", !config.hotbar.people)
    this.bodyClass("hb-shared", !config.hotbar.shared)
    this.bodyClass("hb-player", !config.hotbar.player)
    this.bodyClass("hb-qtbtn1", !config.hotbar.qtbtn1)
    this.bodyClass("hb-qtbtn2", !config.hotbar.qtbtn2)
    this.bodyClass("hb-qtbtn3", !config.hotbar.qtbtn3)
	}

  App.bindClass = function () {
    this.Bind("update", function (key, val, grp) {
      if (key == "bubble") this.bodyClass("ts-no-bub", !val)
      if (key == "player") this.bodyClass("ts-no-vid", !val)
      if (key == "people") this.bodyClass("ts-no-ppl", !val)
      if (key == "logger") this.bodyClass("ts-logger", val)

      if (grp == "hotbar") {
        if (key == "is_afk") this.bodyClass("hb-is-afk", !val)
        if (key == "auto_b") this.bodyClass("hb-auto-b", !val)
        if (key == "auto_q") this.bodyClass("hb-auto-q", !val)
        if (key == "nextdj") this.bodyClass("hb-nextdj", !val)
        if (key == "escort") this.bodyClass("hb-escort", !val)
        if (key == "bubble") this.bodyClass("hb-bubble", !val)
        if (key == "people") this.bodyClass("hb-people", !val)
        if (key == "shared") this.bodyClass("hb-shared", !val)
        if (key == "player") this.bodyClass("hb-player", !val)
        if (key == "qtbtn1") this.bodyClass("hb-qtbtn1", !val)
        if (key == "qtbtn2") this.bodyClass("hb-qtbtn2", !val)
        if (key == "qtbtn3") this.bodyClass("hb-qtbtn3", !val)
      }

      if (grp == "hotbar" || grp == "qtbtns") this.bindHotBar()
    })
  }

}