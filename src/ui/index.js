import Input from "./input";
import DropArea from "./drop-area";

class UI {
  constructor() {
    this._input = new Input()
    this._dropArea = new DropArea()
  }

  start() {
    this._input.bindEvents()
    this._dropArea.bindEvents()
  }
}

export default UI