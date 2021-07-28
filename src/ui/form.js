import Element from "./element"

class Form extends Element {
  constructor() {
    const selector = '.form'
    const events = ['submit']
    const handlers = ['_submit']

    super(selector, events, handlers)
  }

  _submit(e) {
    this.preventDefault(e)

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData.entries())

    const event = this.events.find(event => event.type === e.type)

    if (event) {
      event.callback(payload)
    }
  }

  show() {
    this._element.classList.add('-show')
  }
}

export default Form