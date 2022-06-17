export const tools = {
  resize_at: 0,

  textResize() {
    let opt = this.get("size.text")
    this.injectStyle(text_css(opt), "ts_text_css")
  },

  chatResize(e) {
    let show = $("#tsDragR").length
    let conf = this.get("use.resize")
    this.bodyClass("ts-resize", conf)
    if (!conf) return this.hideDrag()
    if (!show) this.showDrag()
    let size = this.get("size.chat")
    let send = chat_css(size)
    this.injectStyle(send, "ts_chat_css")
    this.debug(`Resized Chat Panel`, size)
    let fire = () => window.dispatchEvent(new Event("resize"))
    return e && e.room ? setTimeout(fire, 500) : fire()
  },

  showDrag() {
    $("body").append($ts_drag)
    $("#tsDragR").on("mousedown", this.initDrag.bind(this))
  },

  hideDrag() {
    $("#tsDragR").remove()
    $("#ts_chat_css").remove()
    window.dispatchEvent(new Event("resize"))
  },

  initDrag(e) {
    e.preventDefault()
    this.resize_at = e.pageX
    this.bodyClass("ts-resizing", true)
    this.drag_end = this.stopDrag.bind(this) 
    this.dragging = this.saveDrag.bind(this)
    $("body").on("mousemove", this.dragging)
    $("body").on("mouseup", this.drag_end)
  },

  saveDrag(e) {
    let val = this.resize_at - e.pageX
    $("#tsDragR").css("margin-right", val)
  },

  stopDrag(e) {
    e.preventDefault()
    $("#tsDragR").css("margin-right", 0)
    this.bodyClass("ts-resizing", false)
    $("body").off("mouseup", this.drag_end)
    $("body").off("mousemove", this.dragging)
    let opt = this.get("size.chat")
    let val = this.resize_at - e.pageX
    this.set("size.chat", px_add(opt, val))
    this.resize_at = 0
    this.chatResize()
  }
}

const events = {
  data: function loadResize (config) {
    this.textResize()
    this.chatResize()
  },

  save: function saveVisual (key, val) {
    if (key == "size.text")   this.textResize()
    if (key == "use.resize")  this.chatResize()
  },

  attach: tools.chatResize
}

const $ts_drag = `<div id="tsDragR"></div>`

const chat_css = size => `
  body .chrome .header-bar, 
  .room-viewport, #tsDragR { right: ${ size }; }
  body .chrome .right-panel { width: ${ size }; }
  .chat-image-container .chat-image { width: auto; }
`
const text_css = size => `
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