export const tools = {
  resize_at: 0,

  textResize() {
    let opt = this.get("size.text")
    this.injectStyle(text_css(opt), "ts_text_css")
  },

  chatResize() {
    let has = $("#tsDrag").length
    let use = this.get("use.resize")
    this.bodyClass("ts-resize", use)
    if (!use) return this.hideDrag()
    if (!has) this.showDrag()
    let css = chat_css(this.get("size.chat"))
    this.injectStyle(css, "ts_chat_css")
  },

  showDrag() {
    $("body").append($ts_drag)
    $("#tsDrag").on("mousedown", this.initDrag.bind(this))
  },

  hideDrag() {
    $("#tsDrag").remove()
    $("#ts_chat_css").remove()
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
    $("#tsDrag").css("margin-right", val)
  },

  stopDrag(e) {
    e.preventDefault()
    $("#tsDrag").css("margin-right", 0)
    this.bodyClass("ts-resizing", false)
    $("body").off("mouseup", this.drag_end)
    $("body").off("mousemove", this.dragging)
    let opt = this.get("size.chat")
    let val = this.resize_at - e.pageX
    this.set("size.chat", px_math(opt, val))
    this.resize_at = 0
    this.chatResize()
  }
}

const events = {
  data: function loadVisual (config) {
    this.textResize()
    this.chatResize()
    this.bodyClass("ts-recent", config["use.recent"])
    this.bodyClass("ts-resize", config["use.resize"])
    this.bodyClass("ts-logger", config["show.logger"])
    this.bodyClass("ts-no-bub", config["hide.bubble"])
    this.bodyClass("ts-no-vid", config["hide.player"])
    this.bodyClass("ts-no-ppl", config["hide.people"])
    this.debugging = config.debug
  },

  save: function saveVisual (key, val) {
    if (key == "size.text")   this.textResize()
    if (key == "use.resize")  this.chatResize()
    if (key == "use.recent")  this.bodyClass("ts-recent", val)
    if (key == "show.logger") this.bodyClass("ts-logger", val)
    if (key == "hide.bubble") this.bodyClass("ts-no-bub", val)
    if (key == "hide.player") this.bodyClass("ts-no-vid", val)
    if (key == "hide.people") this.bodyClass("ts-no-ppl", val)
    if (key == "debug") this.debugging = val
  },

  attach: tools.chatResize
}

const $ts_drag = `<div id="tsDrag"></div>`

const chat_css = size => `
  body .chrome .header-bar, 
  .room-viewport, #tsDrag { right: ${ size }; }
  body .chrome .right-panel { width: ${ size }; }
  .chat-image-container .chat-image { width: auto; }
`
const text_css = size => `
  .chat .messages .default-message, .chat .messages .message {
    font-size: ${ size };
    line-height: ${ px_math(size, 2) };
  } 
  .chat .messages .ts-time { 
    font-size: ${ px_math(size, -2) }; 
    line-height: ${ size };
  }
`
const px_math = (a,b) => (parseInt(a.replace(/px/,"")) + b) + "px"

export default { tools, events }