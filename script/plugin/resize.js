export const tools = {
  resize_at: 0,
  drag_left: 0,

  resizeText () {
    let data = css_text(this.get("size.text"))
    this.injectStyle(data, "tsResizeText")
  },

  resizeTabs (e) {
    let conf = this.get("use.resize")
    this.bodyClass("ts-resize", conf)
    if (!conf) return this.hideDrag()
    else this.showDrag()
    let tab1 = this.get("size.tab1")
    let tab2 = this.get("size.tab2")
    this.injectStyle(css_tab1(tab1), "tsResizeTab1")
    this.injectStyle(css_tab2(tab2), "tsResizeTab2")
    this.debug(`Resized Room Tabs`, { tab1, tab2 })
    let fire = () => new Event("resize")
    let done = () => window.dispatchEvent(fire())
    let load = e && e.room // detect attach
    return load ? setTimeout(done, 500) : done()
  },

  showDrag () {
    $("body").append($ts_drag)
    let init = this.initDrag.bind(this)
    $("#tsDragL, #tsDragR").on("mousedown", init)
  },

  hideDrag () {
    $("#tsDragL, #tsDragR").remove()
    $("#tsResizeTab1, #tsResizeTab2").remove()
    window.dispatchEvent(new Event("resize"))
  },

  initDrag (e) {
    e.preventDefault()
    this.resize_at = e.pageX
    this.drag_left = e.target.id == "tsDragL"
    this.stop_drag = this.stopDrag.bind(this)
    this.save_drag = this.saveDrag.bind(this)
    $("body").on("mousemove", this.save_drag)
    $("body").on("mouseup", this.stop_drag)
    this.bodyClass("ts-resizing", true)
  },

  saveDrag (e) {
    let left = this.drag_left
    let math = this.resize_at - e.pageX
    if (left) $("#tsDragL").css("margin-left", -(math))
    else $("#tsDragR").css("margin-right", math)
  },

  stopDrag (e) {
    e.preventDefault()
    let left = this.drag_left
    let math = this.resize_at - e.pageX
    let drag = left ? "size.tab1" : "size.tab2"
    let data = px_add(this.get(drag), left ? -(math) : math)
    $("body").off("mousemove", this.save_drag)
    $("body").off("mouseup", this.stop_drag)
    this.bodyClass("ts-resizing", false)
    $("#tsDragR").css("margin-right", 0)
    $("#tsDragL").css("margin-left", 0)
    this.set(drag, data)
    this.resizeTabs()
  }
}

const events = {
  data: function resizeLoad (config) {
    this.resizeText()
    this.resizeTabs()
  },

  save: function resizeSave (key, val) {
    if (key == "size.text")   this.resizeText()
    if (key == "use.resize")  this.resizeTabs()
  },

  attach: tools.resizeTabs
}

const $ts_drag = `<div id="tsDragL"></div><div id="tsDragR"></div>`

const css_tab2 = size => `
  body .chrome .header-bar, 
  .room-viewport, #tsDragR { right: ${ size }; }
  body .chrome .right-panel { width: ${ size }; }
  .chat-image-container .chat-image { width: auto; }
`
const css_tab1 = size => `
  body .chrome .header-bar,
  .room-viewport, #tsDragL { left: ${ size }; }
  body .chrome .left-panel { width: ${ size }; }
`
const css_text = size => `
  .chat .messages .message,
  #songs .songs .song .title,
  .chat .messages .default-message {
    font-size: ${ px_add(size, 1) };
    line-height: 1.5em;
  } 
  #songs .songs .song .title { 
    height: 1.5em; 
    margin-top: -${ px_add(px_div(size, 3), px_top(size)) };
  }
  #songs .songs .song .details {
    line-height: 1.5em;
    font-size: ${ size };
    margin-top: -${ px_div(size, 3) };
  }
  .chat .messages .ts-time { font-size: ${ px_add(size, -2) }; }
  #songs .songs .song .details { font-size: ${ size }; }
`
const px_get = (str) => parseInt(str.replace(/px/, ""))
const px_add = (a,b) => Math.floor(px_get(a) + b) + "px"
const px_div = (a,b) => Math.floor(px_get(a) / b) + "px"
const px_top = (opt) => px_get(opt) > 18 ? 0 : -2

export default { tools, events }