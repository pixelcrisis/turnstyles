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

  // ts UI
  app.$_tab = (name, on) => `
    <span data-tab="${ name }" class="ts-tab ${ on ? 'active' : '' }">
      ${ name }
    </span>
  `

  app.$_button = (item, name) => `
    <button class="ts-button" data-for="ts_${ item }">${ name }</button>
  `

  app.$_firing = (func, name) => `
    <button class="ts-button" onclick="$tS.${func}()">${ name }</button>
  `

  app.$_string = function (item, name) { return `
    <input type="text" class="ts-inputs"
      id="ts_${ item }" value="${ this.config[item] }" />
    ${ this.$_button(item, name) }`
  }

  app.$_field = function (item, name, rows) { return `
    <textarea class="ts-inputs" id="ts_${ item }" rows="${ rows }">${ this.config[item] }</textarea>
    ${ this.$_button(item, name) }`
  }

  app.$_select = function (list) { return `
    <select data-for="${list}" class="ts-choice ts_switch">
      <option value="">No ${ this._cap(list) }</option>
      ${ Object.keys(this.options[list]).map(key => `
          <option value="${ key }" 
            ${ this.config[list] == key ? 'selected' : ''}>
            ${ this.options[list][key] }
          </option>
        `).join('') }
    </select>`
  }

  app.$_toggle = function (item, name) { return `
    <label class="ts-toggle">
      <input type="checkbox" class="ts_switch"
        data-for="${ item }" ${ this.config[item] ? 'checked' : '' } />
      <span class="ts-state"></span> ${ name }
    </label>`
  }

}