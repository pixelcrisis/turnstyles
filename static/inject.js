const ext = browser || chrome
const url = ext.runtime.getURL('turnStyles.js')

// inject url base into the window
// this tells the script we're an extension
const path = url.split('turnStyles.js')[0]
const base = document.createElement('script')
base.textContent = `window.tsBase = "${path}"`
base.type = 'text/javascript'
document.body.append(base)

// inject the main turnStyles script
const main = document.createElement('script')
main.type = 'text/javascript'
main.src = url
document.body.append(main)