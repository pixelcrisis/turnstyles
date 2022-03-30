// hotbar.js | our hover menu bar

module.exports = App => {

  App.bindHotBar = function () {
    $("#tsHotBar").remove()
    $(".header-bar").append( HotBar() )

    $("#tsOpen").on("click", () => $("#tsWindow").addClass("active"))
    $("#tsHotBar *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsHotBar *[data-opt]").on("change", this.saveConfig.bind(this))
  }

  const HotBar = () => `
    <div id="tsHotBar">
      ${ App.$button("☰", false, "tsOpen") }
      ${ App.$toggle("is_afk", "AFK", false, 'hbIsAfk') }
      ${ App.$toggle("auto_b", "Autobop", false, 'hbAutoB') }
      ${ App.$toggle("auto_q", "AutoQueue", false, 'hbAutoQ') }
      ${ App.$toggle("nextdj", "Next DJ", false, 'hbNextDJ') }

      ${ App.$qtbtn("1") } ${ App.$qtbtn("2") } ${ App.$qtbtn("3") }

      ${ App.$toggle("bubble", "Bubbles", false, "hbBubbles") }
      ${ App.$toggle("people", "People", false, "hbPeople") }
      ${ App.$toggle("player", "Player", false, "hbPlayer") }
      ${ App.$button("Share", false, "hbShare", "Share") }
    </div>
  `

}