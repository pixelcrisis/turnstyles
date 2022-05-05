// patron.js | add styling for patrons

module.exports = App => {

  App.findPatron = function (e) {
    if (!e.userid in this.gold) return false
    let message = this.linkMessage(e.name, e.text)
    if (message) $(message).addClass("patron")
  }

  App.linkMessage = function (name, text) {
    let find = $(`.message:contains("${ name }"):contains("${ text }")`)
    if (find.length) find = find[find.length - 1]
    return find
  }

  App.bindPatron = function () {
    this.Bind("speak", this.findPatron)
  }

}