// check for sent patron messages
const patronScan = function (e) {
  let sent = e.target
  let gold = this.patrons[e.user.id]
  if (gold && sent) sent.addClass("patron")
}

export default app => {
  app.on("chat", patronScan)
}