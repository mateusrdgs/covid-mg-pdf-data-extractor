import Input from "./input";
import DropArea from "./drop-area";

import XLSX from '../xlsx'
import PDF from '../pdf'

class UI {
  constructor() {
    const xlsx = new XLSX()
    const pdf = new PDF(xlsx)

    this._input = new Input(pdf)
    this._dropArea = new DropArea(pdf)
  }

  start() {
    this._input.bindEvents()
    this._dropArea.bindEvents()
  }
}

export default UI