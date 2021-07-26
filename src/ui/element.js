class Element {
  _element
  _events
  _handlers
  _pdf

  constructor(selector, events, handlers, pdf) {
    this._element = document.querySelector(selector)
    this._events = events
    this._handlers = handlers
    this._pdf = pdf
  }

  preventDefault(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  bindEvents() {
    this._events.forEach((event, index) => {
      const handlerName = this._handlers[index]
      const handler = this[handlerName].bind(this)
      this._element.addEventListener(event, handler)
    })
  }

  async read(file) {
    await this._pdf.read(file)
  }
}

export default Element