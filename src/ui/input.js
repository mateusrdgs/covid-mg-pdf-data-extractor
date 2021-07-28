import Element from './element'

class Input extends Element {
  constructor() {
    const selector = '.input'
    const events = [ 'change', 'click' ]
    const handlers = ['_change', '_click']

    super(selector, events, handlers)
  }

  _change(e) {
    const file = e.target.files[0]
    const event = this.events.find(event => event.type === e.type)

    if (file && event) {
      event.callback(file)
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