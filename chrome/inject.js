// inject our URL base into the window
let base = chrome.runtime.getURL('themes/dark.css')
const urlBase = document.createElement('script')
urlBase.textContent = `window.tsBase = "${base.split('/themes')[0]}"`
urlBase.type = "text/javascript"
document.body.append(urlBase)

// inject the main turnStyles script
const turnStyles = document.createElement('script')
turnStyles.type = "text/javascript"
turnStyles.src = chrome.runtime.getURL('turnStyles.js')
document.body.append(turnStyles)
console.info(`turnStyles :: injected`)
