export const tools = {
  sizeChat() {
    let size = this.get("size.text")
    this.injectStyle(resized(size), "ts_text_size")
  }
}

const events = {
  data: function loadVisual (config) {
    this.sizeChat()
    this.bodyClass("ts-recent", config["use.recent"])
    this.bodyClass("ts-logger", config["show.logger"])
    this.bodyClass("ts-no-bub", config["hide.bubble"])
    this.bodyClass("ts-no-vid", config["hide.player"])
    this.bodyClass("ts-no-ppl", config["hide.people"])
    this.debugging = config.debug
  },

  save: function saveVisual (key, val) {
    if (key == "size.text") this.sizeChat()
    if (key == "use.recent")  this.bodyClass("ts-recent", val)
    if (key == "show.logger") this.bodyClass("ts-logger", val)
    if (key == "hide.bubble") this.bodyClass("ts-no-bub", val)
    if (key == "hide.player") this.bodyClass("ts-no-vid", val)
    if (key == "hide.people") this.bodyClass("ts-no-ppl", val)
    if (key == "debug") this.debugging = val
  },
}

const add_pix = (a ,b) => (parseInt(a.replace(/px/, "")) + b) + "px"
const resized = size => `.chat .messages .default-message, .chat .messages .message { font-size: ${ size }; } .chat .messages .ts-time { font-size: ${ add_pix(size, -2) }; }`

export default { tools, events }