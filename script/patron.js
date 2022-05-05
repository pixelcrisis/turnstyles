// patron.js | add styling for patrons

module.exports = App => {

  App.findPatron = function (e) {
    if (this.gold.indexOf(e.userid) < 0) return false
    let $message = this.linkMessage(e.name, e.text)
    if ($message) $message.addClass("patron")
  }

  App.linkMessage = function (name, text) {
    let find = `.message:contains("${ name }")`
    if (text) find = `${ find }:contains("${ text }")`
    return $( find ).last()
  }

  App.bindPatron = function () {
    this.Bind("speak", this.findPatron)
  }

}