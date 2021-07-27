import Element from './element'

class Input extends Element {

  constructor(onInputFile) {
    const selector = '.input'
    const events = [ 'change', 'click' ]
    const handlers = ['_change', '_click']

    super(selector, events, handlers)

    this.onInputFile = onInputFile
  }

  _change(e) {
    const file = e.target.files[0]

    if (file) {
      this.onInputFile(file)
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