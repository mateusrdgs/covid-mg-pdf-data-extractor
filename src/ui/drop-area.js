import Element from './element'

import Helpers from '../helpers'

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

  async _dropFile(e) {
    this.preventDefault(e)
    this._removeHighlight()

    const file = Array.prototype.find.call(e.dataTransfer.items, Helpers.isPDFFile)
    const event = this.events.find(event => event.type === e.type)

    if (file && event) {
      event.callback(file.getAsFile())
    }
  }

  hide() {
    this._element.classList.add('-hidden');
  }
}

export default DropArea