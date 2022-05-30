module.exports = TS => {

  TS._a_ = function (text, path) {
    let flag = `class="ts-button" target="_blank"`
    let href = `href="${ path || "#" }"`
    return `<a ${ flag } ${ href }>${ text }</a>`
  }

  TS._btn_ = function (text, item, name, func) {
    let flag = `class="ts-button"`
    if (name) flag += ` id="${ name }"`
    if (item) flag += ` data-for="${ item }"`
    if (func) flag += ` onclick="$ts.${ func }()"`
    return `<button ${ flag }>${ text }</button>`
  }

  TS._bool_ = function (item, text, name) {
    let data = this.config[item]
    let type = `type="checkbox"`
    let flag = `class="ts-button ts-toggle"`
    if (name) flag += ` id="${ name }"`
    if (item) type += ` data-opt="${ item }"`
    if (data) type += ` checked`
    let html = `<input ${ type } /><span></span>`
    return `<label ${ flag }>${ html }${ text }</label>`
  }

  TS._str_ = function (item, text) {
    let data = this.config[item]
    let done = this._btn_(text, item)
    let flag = `type="text" class="ts-inputs"`
    if (item) flag += `data-opt="${ item }" value="${ data }"`
    return `<input ${ flag } /> ${ done }`
  }

  TS._text_ = function (item, text) {
    let data = this.config[item]
    let done = this._btn_(text, item)
    let flag = `class="ts-inputs" rows="10"`
    if (item) flag += `data-opt="${ item }"`
    return `<textarea ${ flag }>${ data }</textarea> ${ done }`
  }

  TS._list_ = function (item, type) {
    let data = this.config[item]
    let list = this.options[type || item]
    let flag = `class="ts-button ts-choice"`
    if (item) flag += ` data-opt="${ item }"`
    let make = item => this._item_(list, item, data)
    let html = Object.keys( list ).map( item => make(item) )
    return `<select ${ flag }>${ html }</select>`
  }

  TS._item_ = function (list, item, data) {
    let { label, value } = list[item]
    let flag = `value="${ value }"`
    if (value == data) flag += ` selected`
    return `<option ${ flag }>${ label }</option>`
  }

  TS._qtbtn_ = function (i) {
    let name = `qtbtn${ i }`
    let data = this.config[name]
    let text = data.indexOf("||") > -1
    if (!text) text = `QT${ i }`
    else {
      data = data.split("||")
      text = data.shift().trim()
      data = data.join(" ")
    }
    return this._btn_(text, false, name, name)
  }

}