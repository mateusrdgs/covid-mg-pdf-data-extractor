import Element from './element'

import pdf from '../pdf'
import helpers from '../helpers'

class DropArea extends Element {
  _input

  constructor(input) {
    const selector = '.droparea'
    const events = ['dragenter', 'dragleave', 'dragover', 'drop', 'click']
    const handlers = ['_highlight', '_removeHighlight', '_mouseOver', '_dropFile', '_click']

    super(selector, events, handlers)

    this._input = input
  }

  // instead of dropping, user choose to manually upload the file
  _click() {
    this._input.click()
  }

  _highlight() {
    this._element.classList.add('-highlight')
  }

  _removeHighlight() {
    this._element.classList.remove('-highlight')
  }

  _mouseOver(e) {
    this.preventDefault(e)
    this._highlight()
  }

  _dropFile(e) {
    this.preventDefault(e)
    this._removeHighlight()

    const file = Array.prototype.find.call(e.dataTransfer.items, helpers.isPDF)

    if (file) {
      pdf.read(file.getAsFile())
    }
  }
}

export default DropArea