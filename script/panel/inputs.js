const tools = {
  $a (text, link, name) {
    let flag = `class="ts-button" target="_blank"`
    if (name) flag += ` id="${ name }"`
    if (link) flag += ` href="${ link }"`
    return `<a ${ flag }>${ text }</a>`
  },

  $btn (text, item, func, name) {
    let flag = `class="ts-button"`
    if (name) flag += ` id="${ name }"`
    if (item) flag += ` data-for="${ item }"`
    if (func) flag += ` onclick="$ts.${ func }()"`
    return `<button ${ flag }>${ text }</button>`
  },

  $bool (text, item, name) {
    let data = this.get(item)
    let flag = `type="checkbox"`
    let wrap = `class="ts-button ts-toggle"`
    if (name) wrap += ` id="${ name }"`
    if (item) flag += ` data-opt="${ item }"`
    if (data) flag += ` checked`
    let html = `<input ${ flag } /><span></span>`
    return `<label ${ wrap }> ${ html } ${ text }</label>`
  },

  $str (text, item) {
    let data = this.get(item)
    let html = this.$btn(text, item)
    let flag = `type="text" class="ts-inputs"`
    if (item) flag += `data-opt="${ item }"`
    if (item) flag += `value="${ data }"`
    return `<input ${ flag } /> ${ html }`
  },

  $text (text, item) {
    let data = this.get(item)
    let html = this.$btn(text, item)
    let flag = `rows="10" class="ts-inputs"`
    if (item) flag += ` data-opt="${ item }"`
    return `<textarea ${ flag }>${ data }</textarea> ${ html }`
  },

  $list (item, type) {
    let data = this.get(item)
    let list = this.options[type || item]
    let make = item => this.$item(list[item], data)
    let html = Object.keys(list).map(item => make(item))
    let flag = `class="ts-button ts-choice"`
    if (item) flag += ` data-opt="${ item }"`
    return `<select ${ flag }>${ html }</select>`
  },

  $item (opt, data) {
    let { label, value } = opt
    let conf = value == data
    let flag = `value="${ value }"`
    if (conf) flag += ` selected`
    return `<option ${ flag }>${ label }</option>`
  },

  $qt (i) {
    let item = `qtbtn${ i }`
    let data = this.get(item)
    let [ name ] = this.prefix(data, `QT${ i }`)
    return this.$btn(name, false, item, item)
  }
}

export default { tools }