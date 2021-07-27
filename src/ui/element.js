class Element {
  _element
  _events
  _handlers

  constructor(selector, events, handlers) {
    this._element = document.querySelector(selector)
    this._events = events
    this._handlers = handlers
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
}

export default Element