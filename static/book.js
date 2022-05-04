// Bookmarklet Access To Plugin

const path = "https://ts.pixelcrisis.co/build"
window.localStorage.setItem("tsBase", path)

// inject the main turnStyles script
const book = document.createElement('script')
book.type = 'text/javascript'
book.src = `${ path }/turnStyles.js?v=${ Math.random() }`
document.body.append(book)