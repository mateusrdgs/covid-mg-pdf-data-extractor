import Element from "./element"

class Form extends Element {
  _isValid = true

  constructor() {
    const selector = '.form'
    const events = ['submit']
    const handlers = ['_submit']

    super(selector, events, handlers)

    this._listenToInputsCheck()
  }

  set isValid(isValid) {
    this._isValid = isValid
  }

  _submit(e) {
    this.preventDefault(e)

    if (this._isValid) {
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData.entries())

      const event = this.events.find(event => event.type === e.type)

      if (event) {
        event.callback(payload)
      }
    }
  }

  _listenToInputsCheck() {
    const inputs = this._element.querySelectorAll('input[type="checkbox"]')

    inputs.forEach(input => input.addEventListener('click', this._inputCheck.bind(this)))
  }

  _inputCheck() {
    const inputs = this._element.querySelectorAll('input[type="checkbox"]')
    const someInputIsChecked = Array.prototype.some.call(inputs, input => input.checked)

    this._isValid = someInputIsChecked
    this._changeDownloadButtonState()
  }

  _changeDownloadButtonState() {
    const downloadButton = this._element.querySelector('button')

    if (this._isValid) {
      downloadButton.classList.remove('-disabled');
    } else {
      downloadButton.classList.add('-disabled');
    }
  }

  show() {
    this._element.classList.add('-show')
  }
}

export default Form