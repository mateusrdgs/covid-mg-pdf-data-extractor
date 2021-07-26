import Input from "./input";
import DropArea from "./drop-area";

import PDF from '../pdf'

class UI {
  constructor() {
    const pdf = new PDF()

    this._input = new Input(pdf)
    this._dropArea = new DropArea(pdf)
  }

  start() {
    this._input.bindEvents()
    this._dropArea.bindEvents()
  }
}

export default UI