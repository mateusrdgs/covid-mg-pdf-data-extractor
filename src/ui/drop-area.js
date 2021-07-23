import Element from './element'

import pdf from '../pdf'
import helpers from '../helpers'

class DropArea extends Element {
  constructor() {
    const selector = '.droparea'
    const events = ['dragenter', 'dragleave', 'dragover', 'drop']
    const handlers = ['_highlight', '_removeHighlight', '_mouseOver', '_dropFile']

    super(selector, events, handlers)
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