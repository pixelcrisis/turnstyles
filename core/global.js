// global.js | helpers and utilities

module.exports = app => {

  app._now = () => new Date().toLocaleTimeString('en-us')
  app._cap = s => s[0].toUpperCase() + s.substring(1)

  // create a link element
  app._link = (id, url) => {
    let el = document.createElement('link'); el.id = id; 
    el.type = "text/css"; el.rel = "stylesheet"; el.href = url;
    return el
  }

  // create our user style element
  app._css = style => {
    let el = document.createElement('style'); el.id = "ts_css";
    el.type = "text/css"; el.innerHTML = style;
    return el
  }
  
  // toggle classes on the DOM
  app._class = (name, on) => {
    let has = $('body').hasClass(name)
    if (on && !has) $('body').addClass(name)
    if (has && !on) $('body').removeClass(name)
  }

  // fake click an element
  app._click = el => {
    $(window).focus()
    const opts = { bubbles: true, cancelable: true, view: window }
    const elem = document.querySelectorAll(el)[0]
    const fire = new MouseEvent('click', opts)
    return !elem.dispatchEvent(fire)
  }

  // clean strings
  app._clean = str => {
    // trim inserted URL file paths
    if (str.indexOf('inserted:') == 0) {
      let path = str.split('/')
      return `inserted: ${path[path.length - 1]}`
    }
    return str
  }

  // find prop by key in object
  app._findKey = (obj, key) => {
    const exists = o => o !== null && typeof o != "undefined" && o[key]
    for (let prop in obj) if (exists(obj[prop])) return obj[prop]
  }

}