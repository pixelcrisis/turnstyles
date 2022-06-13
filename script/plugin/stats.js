// add leaderboard link to user profile
const statLink = function (e) {
  if ($(".profile.modal .statslink").length) return
  let html = $stat_link(e.userid)
  $(".profile.modal .section.web-links").show()
  $(".profile.modal .website").append(html)
}

// post last song stats
const postLast = function (e) {
  if (!this.get("post.song") || !e.last) return
  let head = $stat_line(e.last)
  let text = `${ e.last.song } by ${ e.last.artist }`
  if (head) return this.post({ head, text, type: "stat" })
}

// post last DJ stats
const postSpun = function (e) {
  if (!this.get("post.spun")) return
  let head = $stat_line(e.stat)
  let name = `<strong>${ e.user.name}</strong>` 
  let text = `${ name } is done spinning!`
  if (head) return this.post({ head, text, type: "stat" })
}

export default app => {
  app.on("user", statLink)
  app.on("song", postLast)
  app.on("drop", postSpun)
}

// generate a leaderboard link
const $stat_link = function (id) {
  let base = `https://thompsn.com/turntable/leaderboard/thing/`
  let done = `onclick="$('.modal .close-x')[0].click()"`
  let flag = `class="statslink" target="_blank"`
  let href = `href="${ base }?id=${ id }"`
  return `<a ${ flag } ${ href } ${ done }>Leaderboard</a>`
}

const $stat_line = (obj = {}, str = "") => {
  if ("yay" in obj) str += `${obj.yay}❤️`
  if ("meh" in obj) str += `${obj.meh}💔`
  if ("snag" in obj) str += `${obj.snag}💖`
  if ("spun" in obj) str += `${obj.spun}▶️`
  return str
}