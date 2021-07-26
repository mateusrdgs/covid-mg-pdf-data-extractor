import Element from './element'

class Input extends Element {
  constructor(pdf) {
    const selector = '.input'
    const events = [ 'change', 'click' ]
    const handlers = ['_change', '_click']

    super(selector, events, handlers, pdf)
  }

  _change(e) {
    const file = e.target.files[0]

    if (file) {
      this.read(file)
    }
  }

  _click() {
    this._element.value = null
  }

  click() {
    this._element.click()
  }
}

export default Input