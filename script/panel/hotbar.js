// bind hotbar on attach
const hotbarLoad = function () {
  $("#tsHotbar, .ts-menu").remove()
  $(".header-bar").append(this.hotbarMake())
  $("#settings .dropdown ul li").first().before(make_button())
  $("#tsHotbar *[data-opt]").on("change", this.panelSave.bind(this))
  $("#tsHotbar *[data-for]").on("click", this.panelSave.bind(this))
  $(".ts-menu").on("click", this.panelShow)
  this.bodyClass("hb-qtbtn1", !this.config["hb.qtbtn1"])
  this.bodyClass("hb-qtbtn2", !this.config["hb.qtbtn2"])
  this.bodyClass("hb-qtbtn3", !this.config["hb.qtbtn3"])
  this.bodyClass("hb-autobop", !this.config["hb.autobop"])
  this.bodyClass("hb-afk-idle", !this.config["hb.afk.idle"])
  this.bodyClass("hb-dj-auto", !this.config["hb.dj.auto"])
  this.bodyClass("hb-dj-next", !this.config["hb.dj.next"])
  this.bodyClass("hb-dj-done", !this.config["hb.dj.done"])
  this.bodyClass("hb-people", !this.config["hb.people"])
  this.bodyClass("hb-player", !this.config["hb.player"])
  this.bodyClass("hb-bubble", !this.config["hb.bubble"])
  this.bodyClass("hb-share", !this.config["hb.share"])
}

// update hotbar on value change
const hotbarSave = function (key) {
  let qt = key.indexOf("qt") == 0
  let hb = key.indexOf("hb") == 0
  if (!qt && !hb) return false
  return this.hotbarLoad()
}

// hotbar templating
const hotbarMake = function () { return `
  <div id="tsHotbar">
    <div class="wrap">
      <span id="tsMenu" class="ts-menu">☰</span>
      <img src="${ this.icon }" id="tsLogo" class="ts-menu">
      ${ this.$bool("AFK", "afk.idle", "hbIdle") }
      ${ this.$bool("Autobop", "autobop", "hbBop") }
      ${ this.$bool("AutoQueue", "dj.auto", "hbAutoDJ") }
      ${ this.$bool("Next DJ", "dj.next", "hbNextDJ") }
      ${ this.$bool("Escort", "dj.done", "hbDoneDJ") }
      ${ this.$qt("1") } ${ this.$qt("2") } ${ this.$qt("3") }
      ${ this.$bool("Bubbles", "show.bubble", "hbBubble") }
      ${ this.$bool("People", "show.people", "hbPeople") }
      ${ this.$bool("Player", "show.player", "hbPlayer") }
    </div>
  </div>
`}

export default app => {
  app.on("save", hotbarSave)
  app.on([ "lobby", "attach" ], hotbarLoad)
  Object.assign(app, { hotbarLoad, hotbarMake, hotbarSave })
}

const make_button = function () { return `
  <li class="option link ts-menu">
    <a><strong><em>turnStyles Config</em></strong></a>
  </li>
`}