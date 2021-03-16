const Options = () => {
  let options = [ 'theme', 'style', 'autos' ]
  chrome.storage.sync.get(options, data => {
    addButton()
    addStyles()
    addWindow(data)
    window.autobop = data.autos
  })
}

const addButton = () => {
  const menu = document.querySelectorAll('.option.link.avatar')[0]
  if (!menu) return setTimeout(addButton, 1000)
  const link = document.createElement('li')

  link.classList.add('link')
  link.classList.add('option')
  link.innerHTML = `<a href="#">Turnstyles</a>`

  link.addEventListener('click', () => {
    const panel = document.querySelectorAll('#ts_panel')[0]
    panel.classList.toggle('active')
  })
  
  menu.insertAdjacentElement('afterend', link)
  console.info(`turnstyles :: added options button`)
}

const addStyles = () => {
  const style = document.createElement('style')
  style.textContent = `
    #ts_panel {
      width: 250px;
      z-index: 100;
      padding: 25px;
      border-radius: 5px;
      border: 3px solid #676767;
      position: absolute;
      margin-left: -150px;
      top: 80px; left: 50%;
      background: #2f2f2f;
      color: #eaeaea;
    }
    #ts_panel:not(.active) {
      display: none;
    }
    #ts_panel label { 
      display: block;
      margin-top: 10px; 
      font-weight: bold;
    }
    #ts_panel select {
      color: #ffffff;
      padding: 5px 10px;
      border-radius: 5px;
      background: transparent;
      border: 1px solid #666666;
    }
    #ts_panel button {
      margin-top: 15px;
      margin-right: 5px;
      border: 1px solid;
      padding: 5px 10px;
      border-radius: 5px;
      background: transparent;
    }
    #ts_close { color: #aaaaaa; }
    #ts_saved { color: gold; }
  `
  document.head.append(style)
}

const addWindow = (data) => {
  const panel = document.createElement('div')
  panel.setAttribute('id', 'ts_panel')

  const title = document.createElement('h2')
  title.innerHTML = `turnstyles options`
  panel.appendChild(title)

  const themeSelect = document.createElement('label')
  themeSelect.innerHTML = `
    Theme: 
    <select id="ts_theme" value="${data.theme}">
      ${ addSelect(data.theme, "No Theme", "") }
      ${ addSelect(data.theme, "Dark Mode", "dark") }
    </select>`
  panel.appendChild(themeSelect)

  const autobopBox = document.createElement('label')
  autobopBox.innerHTML = `
    <input id="ts_autos" type="checkbox" checked="${data.autos}" />
    Autobop`
  panel.appendChild(autobopBox)

  const closeButton = document.createElement('button')
  closeButton.setAttribute('id', 'ts_close')
  closeButton.innerHTML = `Cancel`
  closeButton.addEventListener('click', closePane)
  panel.appendChild(closeButton)

  const saveButton = document.createElement('button')
  saveButton.setAttribute('id', 'ts_saved')
  saveButton.innerHTML = `Save`
  saveButton.addEventListener('click', savePanel)
  panel.appendChild(saveButton)

  document.body.append(panel)
  console.info(`turnstyles :: loaded options panel`)
}

const closePane = () => {
  const panel = document.querySelectorAll('#ts_panel')[0]
  panel.classList.remove('active')
}

const savePanel = () => {
  const theme = document.querySelectorAll('#ts_theme')[0].value
  const autos = document.querySelectorAll('#ts_autos')[0].checked

  chrome.storage.sync.set({ theme, autos }, () => {
    window.autobop = autos
    Theming() // refresh theme
    return closePane()
  })
}

const addSelect = (data, name, key) => {
  let active = data == key ? 'selected' : ''
  return `<option value="${key}" ${active}>${name}</option>`
}

Options()