// Bookmarklet Access To Plugin

const path = "https://turnstyles.xyz/build"
window.localStorage.setItem("tsBase", path)

// inject the main turnStyles script
const book = document.createElement('script')
book.type = 'text/javascript'
book.src = `${ path }/index.js?v=${ Math.random() }`
document.body.append(book)