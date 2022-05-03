// layout.js | internal templating

module.exports = App => {

  App.$button = function (name, opt, id, func) {
    let does = `${ func ? `onclick="$tS.${ func }()"` : "" }`
    let item = `${ opt ? `data-for="${ opt }"` : "" }`
    let flag = `${ id ? `id="${ id }"` : "" } ${ item } ${ does }`
    return `<button class="ts-button" ${ flag }>${ name }</button>`
  }

  App.$linkto = function (name, path) {
    let flag = `class="ts-button" target="_blank"`
    return `<a ${ flag } href="${ path }">${ name }</a>`
  }

  App.$toggle = function (opt, name, cat = "", id) {
    let data = this.getConfig(opt, cat)
    let main = `class="ts-toggle" ${ id ? `id="${ id }"` : "" }`
    let flag = `data-opt="${ opt }" data-cat="${ cat || "" }"`
    let html = `type="checkbox" ${ data ? "checked" : "" }`
    return `<label ${ main }><input ${ html } ${ flag }> <span></span>${ name }</label>`
  }

  App.$string = function (opt, name, cat = "") {
    let done = this.$button(name, opt)
    let data = this.getConfig(opt, cat)
    let flag = `data-opt="${ opt }" data-cat="${ cat || "" }" value="${ data }"`
    return `<input type="text" class="ts-inputs" ${ flag } /> ${ done }`
  }

  App.$field = function (opt, name, cat = "") {
    let done = this.$button(name, opt)
    let data = this.getConfig(opt, cat)
    let main = `class="ts-inputs" rows="10"`
    let flag = `data-opt="${ opt }" data-cat="${ cat || "" }"`
    return `<textarea ${ main } ${ flag }>${ data }</textarea> ${ done }`
  }

  App.$select = function (opt, cat = "", off) {
    let list = this.options[opt]
    let data = this.getConfig(opt, cat)
    let flag = `data-opt="${ opt }" data-cat="${ cat || "" }"`
    let none = `<option value="">${ off || `No ${ this.cap(opt) }` }</option>`
    let html = Object.keys( list ).map( item => this.$option(list, item, data) )
    return `<select class="ts-choice" ${ flag }>${ none }${ html }</select>`
  }

  App.$option = function (list, item, data) {
    let name = list[item]
    let flag = item == data ? "selected" : ""
    return `<option value="${ item }" ${ flag }>${ name }</option>`
  }

  App.$qtbtn = function (i) {
    let name = `qtbtn${i}`, text = `QT${i}`
    let data = this.config.qtbtns[name]
    // parse label
    if (data.indexOf('||') > -1) {
      data = data.split('||')
      text = data.shift()
      data = data.join(' ')
    }
    return this.$button(text, false, name, name)
  }

}