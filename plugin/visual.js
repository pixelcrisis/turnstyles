// visual.js | changing and toggling elements

module.exports = App => {

	App.loadClasses = function (config) {
		this.classes("logger", config.logger)
		this.classes("no_bub", !config.bubble)
		this.classes("no_aud", !config.people)
		this.classes("no_vid", !config.player)

    this.classes("hb-is_afk", !config.hotbar.is_afk)
    this.classes("hb-auto_b", !config.hotbar.auto_b)
    this.classes("hb-auto_q", !config.hotbar.auto_q)
    this.classes("hb-nextdj", !config.hotbar.nextdj)
    this.classes("hb-bubble", !config.hotbar.bubble)
    this.classes("hb-people", !config.hotbar.people)
    this.classes("hb-shared", !config.hotbar.shared)
    this.classes("hb-player", !config.hotbar.player)
    this.classes("hb-qtbtn1", !config.hotbar.qtbtn1)
    this.classes("hb-qtbtn2", !config.hotbar.qtbtn2)
    this.classes("hb-qtbtn3", !config.hotbar.qtbtn3)
	}

	App.updateClasses = function (key, val, grp) {
    if (key == 'bubble') this.classes('no_bub', !val)
    if (key == 'player') this.classes('no_vid', !val)
    if (key == 'people') this.classes('no_aud', !val)
    if (key == 'logger') this.classes('logger', val)

    if (grp == "hotbar") {
      if (key == "is_afk") this.classes('hb-is_afk', !val)
      if (key == "auto_b") this.classes('hb-auto_b', !val)
      if (key == "auto_q") this.classes('hb-auto_q', !val)
      if (key == "nextdj") this.classes('hb-nextdj', !val)
      if (key == "bubble") this.classes('hb-bubble', !val)
      if (key == "people") this.classes('hb-people', !val)
      if (key == "shared") this.classes('hb-shared', !val)
      if (key == "player") this.classes('hb-player', !val)
      if (key == "qtbtn1") this.classes('hb-qtbtn1', !val)
      if (key == "qtbtn2") this.classes('hb-qtbtn2', !val)
      if (key == "qtbtn3") this.classes('hb-qtbtn3', !val)
    }

    if (grp == "hotbar" || grp == "qtbtns") {
      this.bindHotBar()
    }
	}

	App.on("update", App.updateClasses)

}