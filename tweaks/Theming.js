const Theming = () => {
  let style = document.createElement('link')

  style.rel  = 'stylesheet'
  style.type = 'text/css'
  style.href = chrome.runtime.getURL('themes/Dark.css')

  document.head.append(style)
  
  console.info(`Turntable Tweaks: Started Theming.`)
}