module.exports = TS => {

  TS.$on("chat", function checkPatron (event) {
    let elem = event.target
    let gold = this.patrons[event.userid]
    if (gold && elem) elem.addClass("patron")
  })

}