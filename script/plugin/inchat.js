const tools = {
  qtbtn1 () { this.quickText("qtbtn1") },
  qtbtn2 () { this.quickText("qtbtn2") },
  qtbtn3 () { this.quickText("qtbtn3") },

  quickText (btn) {
    let data = this.get(btn)
    let [ n, text ] = this.prefix(data)
    let list = this.strArr(text, ";;")
    this.batch(list)
  }
}

const events = {
  chat: function timeChat (e) {
    if (!e.target || !this.get("use.stamps")) return
    if (e.target.has(".ts-time").length) return
    e.target.prepend($ts_time(this.getTime()))
  },

  text: function fadeChat (e) {
    let fade = msg => $(msg).addClass("stat")
    e.target.children(now_playing).each((i, msg) => fade(msg))
  }
}

const system_msg = `.message:has(> .text):not(.stat)`
const now_playing = `${ system_msg }:contains("started playing")`
const $ts_time = time => `<div class="ts-time">${ time }</div>`

export default { tools, events }