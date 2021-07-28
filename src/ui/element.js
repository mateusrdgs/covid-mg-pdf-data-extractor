class Element {
  _element
  events = []

  constructor(selector, events, handlers) {
    this._element = document.querySelector(selector)
    this._bindEvents(this._element, events, handlers)
  }

  preventDefault(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  _bindEvents(element, events, handlers) {
    events.forEach((event, index) => {
      const handlerName = handlers[index]
      const handler = this[handlerName].bind(this)
      element.addEventListener(event, handler)
    })
  }

  on(type, callback) {
    this.events.push({ type, callback })
  }
}

export default Element