// Bookmarklet Access To Plugin

const path = "http://localhost:8080/turnstyles/build/"
window.localStorage.setItem("tsBase", path)

// inject the main turnStyles script
const main = document.createElement('script')
main.type = 'text/javascript'
main.src = `${ path }/turnStyles.js?v=${ Math.random() }`
document.body.append(main)