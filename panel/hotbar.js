// hotbar.js | our hover menu bar

module.exports = App => {

  App.bindHotBar = function () {
    $("#tsHotBar").remove()
    $(".header-bar").append( HotBar() )

    $("#tsOpenBtn").on("click", this.showPanel)
    $("#tsHotBar *[data-for]").on("click",  this.saveConfig.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.saveConfig.bind(this))
  }

  const HotBar = () => `
    <img id="tsLogo" src="${ App.logo }">
    <div id="tsHotBar">
      <div class="wrap">
        ${ App.$button("☰", false, "tsOpenBtn") }
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

}