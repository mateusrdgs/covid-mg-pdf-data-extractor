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

    if (this._isFormValid) {
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
    const everyInputIsUnchecked = Array.prototype.every.call(inputs, input => !input.checked)

    this.isValid = everyInputIsUnchecked

    this._changeDownloadButtonState(everyInputIsUnchecked)
  }

  _changeDownloadButtonState(everyInputIsUnchecked) {
    const downloadButton = this._element.querySelector('button')

    if (everyInputIsUnchecked) {
      downloadButton.classList.add('-disabled');
    } else {
      downloadButton.classList.remove('-disabled');
    }
  }

  show() {
    this._element.classList.add('-show')
  }
}

export default Form