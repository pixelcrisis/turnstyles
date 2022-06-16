import roomTab from "./tabs/tab-room.js"
import styleTab from "./tabs/tab-style.js"
import djafkTab from "./tabs/tab-djafk.js"
import hotbarTab from "./tabs/tab-hotbar.js"
import alertsTab from "./tabs/tab-alerts.js"
import aboutTab from "./tabs/tab-about.js"
import helpTab from "./tabs/tab-help.js"

const tools = {
  moveTabs (e) { // simple switch tab
    let tab = e.target.dataset.tab
    $("#tsPanels .active").removeClass("active")
    $(`*[data-tab="${ tab }"]`).addClass("active")
  },

  listTabs () { // generate the tab list
    return `<nav>${ this.tabs.map(tab => {
      let self = `data-tab="${ tab.name }"`
      let flag = `class="ts-tab ${ tab.active && "active" }"`
      return `<div ${ self } ${ flag }>${ tab.name }</div>`
    }).join("") }</nav>`
  },

  makeTabs () { // generate the tab content
    return this.tabs.map(tab => {
      let make = tab.make.bind(this)
      let self = `data-tab="${ tab.name }"`
      let flag = `class="ts-tabbed ${ tab.active && "active"}"`
      return `<div ${ self } ${ flag }>${ make() }</div>`
    }).join("")
  },

  tabs: [
    { name: "Room",     make: roomTab,     active: true },
    { name: "Style",    make: styleTab },
    { name: "DJ + AFK", make: djafkTab },
    { name: "Hotbar",   make: hotbarTab },
    { name: "Alerts",   make: alertsTab },
    { name: "Help",     make: helpTab },
    { name: "About",    make: aboutTab }
  ]
}

export default { tools }