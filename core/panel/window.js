module.exports = TS => {

  TS.$on([ "lobby", "attach" ], function attachWindow () {
    $("#tsWindow").remove()
    $("body").append( this.makeWindow() )

    TS.$on("esc", this.hidePanel)
    $(".ts-tab").on("click", this.tabMove)
    $("#tsClose").on("click", this.hidePanel)
    $("#tsWindow").on("click", CLOSE_FROM_WINDOW)
    $("#tsPanels article").on("click", TOGGLE_HELP)
    $("#tsBackup input").on("change", this.uploadData.bind(this))
    $("#tsPanels *[data-for]").on("click", this.savePanel.bind(this))
    $("#tsPanels *[data-opt]").on("change", this.savePanel.bind(this))
  })


  TS.makeWindow = function () { return `
    <div id="tsWindow">
      <div id="tsPanels">
        <header>
          <img id="tsLogo2" src="${ this.icon }" alt="turnStyles">
          <h2>turnStyles Config</h2><span id="tsClose">✖</span>
        </header>
        <nav>${ this.tabList() }</nav> ${ this.tabBody() }
      </div>
    </div>` 
  }

}

const CLOSE_FROM_WINDOW = function (e) {
  let clicked = e.target == this
  // close panels if clicked outside of panel
  if (clicked) $("#tsWindow").removeClass("active")
}

const TOGGLE_HELP = function (e) {
  let target = e.target
  if (e.target.nodeName != "ARTICLE") return
  $(target).toggleClass("ts-help")
}