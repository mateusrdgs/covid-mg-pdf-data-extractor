import Input from "./input";
import DropArea from "./drop-area";
import Form from "./form";

import XLSX from '../xlsx'
import PDF from '../pdf'
import Helpers from "../helpers";

class UI {
  _file

  constructor() {
    this._xlsx = new XLSX()
    this._pdf = new PDF()
    this._input = new Input(this._pdf, this._inputFile.bind(this))
    this._dropArea = new DropArea(this._pdf, this._inputFile.bind(this))
    this._form = new Form(this._formSubmit.bind(this))
  }

  start() {
    const elements = [ this._input, this._dropArea, this._form ]

    elements.forEach(element => {
      element.bindEvents()
    })
  }

  _inputFile(file) {
    this._file = file

    this._hideDropArea()
    this._showForm()
  }

  async _formSubmit(payload) {
    const schema = Helpers.formPayloadToSchema(payload)
    const header = Helpers.schemaToHeader(schema)
    const rawFileContent = await this._getRawFileContent(this._file)
    const collection = this._mapFileContent(rawFileContent, schema)

    this._downloadPDF(header, collection)
  }

  async _getRawFileContent(file) {
    return await this._pdf.read(file)
  }

  _mapFileContent(fileContent, schema) {
    const mappedFileContent = fileContent.map(city => {
      return Object.keys(city)
        .filter(key => schema.has(key))
        .reduce((acc, key) => {
          return [
            ...acc,
            { value: city[key], type: 'string' }
          ]
        }, [])
    })

    return mappedFileContent
  }

  async _downloadPDF(header, collection) {
    await this._xlsx.download(header, collection)
  }

  _hideDropArea() {
    this._dropArea.hide()
  }

  _showForm() {
    this._form.show()
  }
}

export default UI