// add timestamps to chat
const chatTime = function (e) {
  if (!this.get("use.stamps")) return
  if (!e.target || e.target.has(".ts-time").length) return
  e.target.prepend(`<div class="ts-time">${ this.getTime() }</div>`)
}

// fade new song messages
const chatFade = function (e) {
  let chat = `.message:not(.stat):has(.text)` 
  let find = `${ chat }:contains("started playing")`
  let fade = msg => $(msg).addClass("stat")
  e.target.children(find).each((i, msg) => fade(msg))
}

// handle quicktext buttons
const quickText = function (btn) {
  let data = this.get(btn)
  let [ n, text ] = this.labeled(data)
  let list = this.strArr(text, ";;")
  return this.batch(list)
}
// inline quicktext access
const qtbtn1 = function () { this.quickText("qtbtn1") }
const qtbtn2 = function () { this.quickText("qtbtn2") }
const qtbtn3 = function () { this.quickText("qtbtn3") }

export default app => {
  app.on("chat", chatTime)
  app.on("text", chatFade)
  Object.assign(app, { quickText, qtbtn1, qtbtn2, qtbtn3 })
}