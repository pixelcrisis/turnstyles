// hotbar.js | our hover menu bar

module.exports = App => {

  App.bindHotBar = function () {
    $("#tsHotBar, .ts-menu").remove()
    $(".header-bar").append( HotBar() )
    $("#settings .dropdown ul li").first().before( MenuOption() )

    $("#tsLogo, .ts-menu").on("click", this.showPanel)
    $("#tsHotBar *[data-for]").on("click",  this.saveConfig.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.saveConfig.bind(this))
  }

  App.bindToggle = function () {
    let conf = this.config.hotbar
    this.Body("hb-is-afk", !conf.is_afk)
    this.Body("hb-auto-b", !conf.auto_b)
    this.Body("hb-auto-q", !conf.auto_q)
    this.Body("hb-nextdj", !conf.nextdj)
    this.Body("hb-escort", !conf.escort)
    this.Body("hb-bubble", !conf.bubble)
    this.Body("hb-people", !conf.people)
    this.Body("hb-shared", !conf.shared)
    this.Body("hb-player", !conf.player)
    this.Body("hb-qtbtn1", !conf.qtbtn1)
    this.Body("hb-qtbtn2", !conf.qtbtn2)
    this.Body("hb-qtbtn3", !conf.qtbtn3)

    this.Bind("update", function (key, val, grp) {
      if (grp == "qtbtns") return this.bindHotBar()
      if (grp != "hotbar") return
      if (key == "is_afk") this.Body("hb-is-afk", !val)
      if (key == "auto_b") this.Body("hb-auto-b", !val)
      if (key == "auto_q") this.Body("hb-auto-q", !val)
      if (key == "nextdj") this.Body("hb-nextdj", !val)
      if (key == "escort") this.Body("hb-escort", !val)
      if (key == "bubble") this.Body("hb-bubble", !val)
      if (key == "people") this.Body("hb-people", !val)
      if (key == "shared") this.Body("hb-shared", !val)
      if (key == "player") this.Body("hb-player", !val)
      if (key == "qtbtn1") this.Body("hb-qtbtn1", !val)
      if (key == "qtbtn2") this.Body("hb-qtbtn2", !val)
      if (key == "qtbtn3") this.Body("hb-qtbtn3", !val)
      this.bindHotBar()
    })
  }

  const HotBar = () => `
    <div id="tsHotBar">
      <div class="wrap">
        <span id="tsMenu" class="ts-menu">☰</span>
        <img id="tsLogo" src="${ App.logo }?v=${ Math.random() }">
        ${ App.$toggle("is_afk", "AFK",       false, 'hbIsAfk') }
        ${ App.$toggle("auto_b", "Autobop",   false, 'hbAutoB') }
        ${ App.$toggle("auto_q", "AutoQueue", false, 'hbAutoQ') }
        ${ App.$toggle("nextdj", "Next DJ",   false, 'hbNextDJ') }
        ${ App.$toggle("escort", "Escort",    false, 'hbEscort') }

        ${ App.$qtbtn("1") } ${ App.$qtbtn("2") } ${ App.$qtbtn("3") }

        ${ App.$toggle("bubble", "Bubbles", false, "hbBubbles") }
        ${ App.$toggle("people", "People",  false, "hbPeople") }
        ${ App.$toggle("player", "Player",  false, "hbPlayer") }
        ${ App.$button("Share", false, "hbShare", "Share") }
      </div>
    </div>
  `

  const MenuOption = () => `
    <li class="option link ts-menu">
      <a><strong><em>turnStyles Config</em></strong></a>
    </li>
  `

}