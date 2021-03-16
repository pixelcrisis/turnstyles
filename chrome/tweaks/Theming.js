const Theming = () => {
  chrome.storage.sync.get(['theme'], data => {
    
    addCSS(data.theme, 'theme')
    addCSS(data.style, 'style')

    console.info(`turnstyles :: loaded theming`)
  })
}

const addCSS = (theme, id) => {
  const curr = document.querySelectorAll(`link#${id}_src`)[0]
  if (!theme) return curr ? curr.remove() : false

  let path = chrome.runtime.getURL(`themes/${theme}.css`)

  if (curr) curr.href = path
  else {
    const style = document.createElement('link')
    style.setAttribute('id', `${id}_src`)
    style.rel = 'stylesheet'; style.type = 'text/css';
    style.href = chrome.runtime.getURL(`themes/${theme}.css`)
    document.head.append(style)
  }
}

Theming()