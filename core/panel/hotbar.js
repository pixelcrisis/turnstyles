module.exports = TS => {

  TS.loadHotBar = function () {
    $("#tsHotBar, .ts-menu").remove()
    $(".header-bar").append( this.makeHotBar() )
    $("#settings .dropdown ul li").first().before( this.makeButton() )

    $(".ts-menu").on("click", this.showPanel)
    $("#tsHotBar *[data-for]").on("click", this.savePanel.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.savePanel.bind(this))

    this.$body("hb-qtbtn1", !this.config["hb.qtbtn1"])
    this.$body("hb-qtbtn2", !this.config["hb.qtbtn2"])
    this.$body("hb-qtbtn3", !this.config["hb.qtbtn3"])
    this.$body("hb-autobop", !this.config["hb.autobop"])
    this.$body("hb-afk-idle", !this.config["hb.afk.idle"])
    this.$body("hb-dj-auto", !this.config["hb.dj.auto"])
    this.$body("hb-dj-next", !this.config["hb.dj.next"])
    this.$body("hb-dj-done", !this.config["hb.dj.done"])
    this.$body("hb-people", !this.config["hb.people"])
    this.$body("hb-player", !this.config["hb.player"])
    this.$body("hb-bubble", !this.config["hb.bubble"])
    this.$body("hb-share", !this.config["hb.share"])
  }

  TS.$on("lobby", TS.loadHotBar)
  TS.$on("attach", TS.loadHotBar)
  TS.$on("update", function updateHotBar (key) {
    let qt = key.indexOf("qt") === 0
    let hb = key.indexOf("hb") === 0
    if (!qt && !hb) return false
    else return this.loadHotBar()
  })

  TS.makeHotBar = function () { return `
    <div id="tsHotBar">
      <div class="wrap">
        <span id="tsMenu" class="ts-menu">☰</span>
        <img src="${ this.icon }" alt="turnstyles" id="tsLogo" class="ts-menu">
        ${ this._bool_("afk.idle", "AFK", "hbIdle") }
        ${ this._bool_("autobop", "Autobop", "hbBop") }
        ${ this._bool_("dj.auto", "AutoQueue", "hbAutoDJ") }
        ${ this._bool_("dj.next", "Next DJ", "hbNextDJ") }
        ${ this._bool_("dj.done", "Escort", "hbDoneDJ") }

        ${ this._qtbtn_("1") } ${ this._qtbtn_("2") } ${ this._qtbtn_("3") }

        ${ this._bool_("show.bubble", "Bubbles", "hbBubble") }
        ${ this._bool_("show.people", "People",  "hbPeople") }
        ${ this._bool_("show.player", "Player",  "hbPlayer") }
        ${ this._btn_("Share", false, "hbShare", "Share") }
      </div>
    </div>
  ` }

  TS.makeButton = function () { return `
    <li class="option link ts-menu">
      <a><strong><em>turnStyles Config</em></strong></a>
    </li>
  ` }

}