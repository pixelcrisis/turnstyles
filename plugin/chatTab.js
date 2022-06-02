module.exports = TS => {

  TS.$on("chat", function timeStamp (event) {
    if (!this.config["use.stamps"]) return
    let chat = event.target, time = this.getTime(true)
    if (!chat || chat.has(".ts-time").length) return
    chat.prepend(`<div class="ts-time">${ time }</div>`)
  })

  TS.$on("text", function textFade (event) {
    // fade out the new song message
    let flag = `.message:not(.stat)`
    let find = `${ flag }:contains(' started playing "')`
    let list = event.target.children(find)
    list.each((i, msg) => $(msg).addClass("stat"))
  })

  TS.$on("song", function postSong (event) {
    if (!this.config["post.song"] || !event.last) return
    let head = STAT_LINE(event.last)
    let text = `${ event.last.song } by ${ event.last.artist }`
    if (head) this.$post({ head, text, type: "stat" })
  })

  TS.$on("drop", function postDrop (event) {
    if (!this.config["post.spun"]) return
    let head = STAT_LINE(event.stat)
    let text = `<strong>${ event.user.name }</strong> is done spinning!`
    return this.$post({ head, text, type: "stat" })
  })

  TS.quickText = function (btn) {
    let data = REMOVE_LABEL(this.config[btn])
    let text = this.getWords(data, ";;")
    if (text) this.$batch( text )
  }

  // easy inline quicktext onlick access
  TS.qtbtn1 = function () { this.quickText('qtbtn1') }
  TS.qtbtn2 = function () { this.quickText('qtbtn2') }
  TS.qtbtn3 = function () { this.quickText('qtbtn3') }

}

const REMOVE_LABEL = function (str) {
  if (str.indexOf("||") < 0) return str
  else return str.split("||")[1].trim()
}

const STAT_LINE = (obj = {}, str = "") => {
  if ("love" in obj) str += `${obj.love}❤️`
  if ("hate" in obj) str += `${obj.hate}💔`
  if ("snag" in obj) str += `${obj.snag}💖`
  if ("spun" in obj) str += `${obj.spun}▶️`
  return str
}