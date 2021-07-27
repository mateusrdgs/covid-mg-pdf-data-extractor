import Element from "./element"

class Form extends Element {
  constructor(onSubmit) {
    const selector = '.form'
    const events = ['submit']
    const handlers = ['_submit']

    super(selector, events, handlers)

    this.onSubmit = onSubmit
  }

  _submit(e) {
    this.preventDefault(e)

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData.entries())

    this.onSubmit(payload)
  }

  show() {
    this._element.classList.add('-show')
  }
}

export default Form