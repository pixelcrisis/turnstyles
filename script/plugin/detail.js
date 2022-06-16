const events = {
  user: function linkStat (e) {
    if ($(user_stats).length) return
    let html = $stat_link(e.user.id)
    $(user_links).show()
    $(user_after).append(html)
  },

  drop: function postSpun (e) {
    if (!e.stat || !this.get("post.spun")) return
    let head = $stat_line(e.stat)
    let name = `<strong>${ e.user.name }</strong>`
    let text = `${ name } is done spinning!`
    if (head)  this.post({ head, text, type: "stat" })
  },

  song: function postLast (e) {
    if (!e.last || !this.get("post.song")) return
    let head = $stat_line(e.last)
    let text = `${ e.last.song } by ${ e.last.artist }`
    if (head)  this.post({ head, text, type: "stat" })
  }
}

const user_after = ".profile.modal .website"
const user_stats = ".profile.modal .ts-stats"
const user_links = ".profile.modal .section.web-links"

const $stat_link = function (id) {
  let base = `https://thompsn.com/turntable/leaderboard/thing/`
  let done = `onclick="$('.modal .close-x')[0].click()"`
  let flag = `class="ts-stats" target="_blank"`
  let href = `href="${ base }?id=${ id }"`
  return `<a ${ flag } ${ href } ${ done }>Leaderboard</a>`
}
const $stat_line = (obj = {}, str = "") => {
  if ("yay" in obj) str += `${obj.yay}❤️ `
  if ("meh" in obj) str += `${obj.meh}💔 `
  if ("snag" in obj) str += `${obj.snag}💖 `
  if ("spun" in obj) str += `${obj.spun}▶️`
  return str
}

export default { events }