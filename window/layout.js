// layout.js | internal templating

module.exports = App => {

  App.$button = (name, item, id, func) => `
    <button class="ts-button" ${ id ? `id="${ id }"` : '' }
      ${ item ? `data-for="${ item }"` : '' }
      ${ func ? `onclick="$tS.${ func }()"` : '' }>
      ${ name }
    </button>
  `

  App.$toggle = function (item, name, group, id) { 
    return `
    <label class="ts-toggle" ${ id ? `id="${ id }"` : '' }>
      <input type="checkbox" 
        data-opt="${ item }" data-cat="${ group || '' }"
        ${ getValue(this.config, item, group) ? 'checked' : ''} />
      <span></span> ${ name }
    </label>`
  }

  App.$string = function (item, name, group) { return `
    <input type="text" class="ts-inputs"
      data-opt="${ item }" data-cat="${ group || '' }"
      value="${ getValue(this.config, item, group) }" />
    ${ this.$button(name, item) }`
  }

  App.$field = function (item, name, group) { return `
    <textarea class="ts-inputs" rows="10"
      data-opt="${ item }" data-cat=${ group || '' }>
      ${ getValue(this.config, item, group) }
    </textarea>
    ${ this.$button(name, item) }`
  }

  App.$select = function (list, group) { return `
    <select class="ts-choice"
      data-opt="${ list }" data-cat="${ group || '' }">
      <option value="">No ${ this.cap(list) }</option>
      ${ getOptions(this.options, this.config, list, group) }
    </select>`
  }

  App.$qtbtn = function (i) {
    let name = `qtbtn${i}`
    let data = this.config.qtbtns[name]
    let text = `QT${i}`
    // parse label
    if (data.indexOf('||') > -1) {
      data = data.split('||')
      text = data.shift()
      data = data.join(' ')
    }
    return this.$button(text, false, name, name)
  }

}

const getValue = function (config, item, group) {
  return group ? config[group][item] : config[item]
}

const getOptions = function (options, config, list, group) {
  let value = getValue(config, list, group)
  return Object.keys(options[list]).map(data => {
    let name = options[list][data]
    let curr = data == value ? 'selected' : ''
    return `<option value="${ data }" ${ curr }>${ name }</option>`
  }).join('')
}