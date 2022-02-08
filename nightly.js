// Bookmarklet Access To Plugin

const path = "https://etc.pixelcrisis.co/build"
const base = document.createElement('script')
base.textContent = `window.tsBase = "${path}"`
base.type = 'text/javascript'
document.body.append(base)

// inject the main turnStyles script
const main = document.createElement('script')
main.type = 'text/javascript'
main.src = `${ path }/turnStyles.js?v=${ Math.random() }`
document.body.append(main)