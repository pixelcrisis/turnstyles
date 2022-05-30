module.exports = TS => {

  TS.tabbed = [
    { name: "Room", body: require("./tabs/tab-room.js") },
    { name: "Style", body: require("./tabs/tab-style.js") },
    { name: "DJ + AFK", body: require("./tabs/tab-djafk.js") },
    { name: "HotBar",  body: require("./tabs/tab-hotbar.js") },
    { name: "Alerts",  body: require("./tabs/tab-alerts.js") },
    { name: "Help",    body: require("./tabs/tab-help.js") },
    { name: "About",   body: require("./tabs/tab-about.js") },
  ]

  TS.tabList = function () {
    // get the list of tab head elements
    return this.tabbed.map(tab => {
      let show = tab.name == "Room" ? "active" : ""
      let flag = `class="ts-tab ${ show }" data-tab="${ tab.name }"`
      return `<div ${ flag }>${ tab.name }</div>`
    }).join("")
  }

  TS.tabBody = function () {
    // get the generated tab body elements
    return this.tabbed.map(tab => {
      let body = tab.body.bind(this)
      let show = tab.name == "Room" ? "active" : ""
      let flag = `class="ts-tabbed ${ show }" data-tab="${ tab.name }"`
      return `<div ${ flag }>${ body() }</div>`
    }).join("")
  }

  TS.tabMove = function (e) {
    // simple switch tab
    let target = e.target.dataset.tab
    $("#tsPanels .active").removeClass("active")
    $(`*[data-tab="${ target }"]`).addClass("active")
  }

}