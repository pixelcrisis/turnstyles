// Bookmarklet Access To Plugin

const path = "http://localhost:8080/turnstyles/build/"
window.localStorage.setItem("tsBase", path)

// inject the main turnStyles script
const self = document.createElement('script')
self.type = 'text/javascript'
self.src = `${ path }/turnStyles.js?v=${ Math.random() }`
document.body.append(self)