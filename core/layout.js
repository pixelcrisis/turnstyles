// layout.js | internal templating

module.exports = app => {

  app.$_post = obj => `
    <div class="message ${ obj.type || '' }"><em>
      <span class="subject">${ obj.head || '' }</span>
      <span class="text">${ obj.body || '' }</span>
    </em></div>
  `

  app.$_volume = val => `
    <div id="tsVolume">
      <span id="tsMute"></span>
      <input id="tsSlider" type="range" min="0" max="100" value="${ val }" />
      <em id="tsMuted">Muted For One Song</em>
    </div>
  `

  app.$_userLink = id => `
    <a target="_blank" class="statslink"
      onclick="$('.modal .close-x')[0].click()"
      href="https://thompsn.com/turntable/leaderboard/thing/?id=${ id }">
      Leaderboard
    </a>
  `

  // panel ui
  app.$_toggle = function (item, name, group, id) { 
    let value = group ? this.config[group][item] : this.config[item]
    return `
    <label class="ts-toggle" ${ id ? `id="${ id }"` : '' }>
      <input type="checkbox"
        data-opt="${ item }" 
        data-cat="${ group || "" }"
        ${ value ? 'checked' : '' } />
      <span></span> ${ name }
    </label>`
  }

  app.$_string = function (item, name, group) { 
    let value = group ? this.config[group][item] : this.config[item]
    return `
    <input type="text" class="ts-inputs"
      data-opt="${ item }" 
      data-cat="${ group || "" }" 
      value="${ value }" />
    ${ this.$_button(name, item) }`
  }

  app.$_bigtxt = function (item, name, group) {
    let value = group ? this.config[group][item] : this.config[item]
    return `
    <textarea class="ts-inputs" rows="10" 
      data-opt="${ item }" data-cat="${ group || "" }">${ value }</textarea>
    ${ this.$_button(name, item) }`
  }

  app.$_select = function (list, group) {
    let options = this.options[list]
    let current = group ? this.config[group][list] : this.config[list]
    return `
    <select class="ts-choice"
      data-opt="${ list }" data-cat="${ group || "" }">
      <option value="">No ${ this._cap(list) }</option>
      ${ Object.keys(options).map(opt => `
        <option value="${ opt }" ${ current == opt ? 'selected' : ''}>
          ${ options[opt] }
        </option>
      `).join('') }
    </select>`
  }

  app.$_qt_btn = function (i) { 
    let which = `qtbtn${i}`
    let qtext = this.config.qtbtns[which]
    let label = qtext.indexOf('||') > -1
    if (label) {
      qtext = qtext.split('||')
      label = qtext.shift()
      qtext = qtext.join(' ')
    } else {
      label = `QT${i}`
    }
    return this.$_button(label, false, which, which)
  }

  app.$_button = function (name, item, id, func) { return `
    <button class="ts-button" ${ id ? `id="${ id }"` : `` }
      ${ item ? `data-for="${ item }"` : `` }
      ${ func ? `onclick="$tS.${ func }()"` : `` }>
      ${ name }
    </button>`
  }

}