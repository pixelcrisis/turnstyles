// Bookmarklet Access To Plugin

let path = "https://etc.pixelcrisis.co/build"
window.localStorage.setItem("tsBase", path)

// inject the main turnStyles script
const main = document.createElement('script')
main.type = 'text/javascript'
main.src = `${ path }/turnStyles.js?v=${ Math.random() }`
document.body.append(main)