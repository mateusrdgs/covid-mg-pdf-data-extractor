import Element from './element'

import Helpers from '../helpers'

class DropArea extends Element {

  constructor(onDropFile) {
    const selector = '.droparea'
    const events = ['dragenter', 'dragleave', 'dragover', 'drop']
    const handlers = ['_highlight', '_removeHighlight', '_mouseOver', '_dropFile']

    super(selector, events, handlers)

    this.onDropFile = onDropFile
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

  async _dropFile(e) {
    this.preventDefault(e)
    this._removeHighlight()

    const file = Array.prototype.find.call(e.dataTransfer.items, Helpers.isPDFFile)

    if (file) {
      this.onDropFile(file.getAsFile())
    }
  }

  hide() {
    this._element.classList.add('-hidden');
  }
}

export default DropArea