// Bookmarklet Access To Plugin

const path = "https://beta.turnstyles.xyz/build"
window.localStorage.setItem("tsBase", path)

// inject the main turnStyles script
const beta = document.createElement('script')
beta.type = 'text/javascript'
beta.src = `${ path }/turnStyles.js?v=${ Math.random() }`
document.body.append(beta)