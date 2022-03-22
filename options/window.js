// window.js | our settings window

module.exports = App => {

  App.bindWindow = function () {
    $("#tsWindow").remove()
    $("body").append(`<div id="tsWindow">${ Options() }</div>`)

    $("#tsClose").on("click", () => $("#tsWindow").removeClass("active"))
    $("#tsWindow *[data-for]").on("click", this.saveConfig.bind(this))
    $("#tsWindow *[data-opt]").on("change", this.saveConfig.bind(this))

    $(".ts-tab").on("click", e => {
      let target = e.target.dataset.tab
      $("#tsWindow .active").removeClass("active")
      $(`*[data-tab="${ target }"]`).addClass("active")
    })

    $("#tsBackup input").on("change", this.uploadData)
    $("#tsWindow").on("click", function (event) {
      let click = event.target == this
      if (click) $("#tsWindow").removeClass("active")
    })
  }
  
  const Options = () => `
    <div id="tsConfig">
      <nav>
        <h2><span id="tsClose">✖</span>turnStyles</h2>
        ${ App.tabs.map(tab => `
            <div data-tab="${ tab }" 
              class="ts-tab ${ tab == "General" ? "active" : "" }">
              ${ tab }
            </div>`).join('') }
      </nav>
      ${ App.tabs.map(tab => App.tabbed[tab]()).join('') }
    </div>
  `

}