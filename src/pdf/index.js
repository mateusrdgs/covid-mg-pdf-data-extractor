
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import worker from 'pdfjs-dist/build/pdf.worker.entry'

import Helpers from '../helpers'

import header from '../constants/xlsx-header'
import citiesSet from '../constants/cities-set'

GlobalWorkerOptions.workerSrc = worker

class PDF {
  _pagesToExtract = [5, 6]
  _xlsx

  constructor(xlsx) {
    this._xlsx = xlsx
  }

  async _extractPageContent(page) {
    const textContent = await page.getTextContent()
    const { items } = textContent
  
    return items
  }

  _toCleanData(content) {
    return content
      .filter(Helpers.emptyString)
      .filter(Helpers.uppercaseOnlyOrNumbersString)
      .filter(Helpers.dirtyString)
  }

  _toCitiesData = collection => {
    const cities = new Map()
    const auxiliaryMap = new Map()
  
    for (let item of collection) {
      const key = item.transform[5] // position on y axis (row)
  
      if (auxiliaryMap.has(key)) {
        const valueOnKey = auxiliaryMap.get(key)
  
        if (valueOnKey.length === 4) {
          const [name, cases, deaths, first_doses] = valueOnKey
          const data = { name, cases, deaths, first_doses, second_doses: item.str }
  
          cities.set(name, data)
          auxiliaryMap.delete(key)
        } else {
          auxiliaryMap.set(key, [...valueOnKey, item.str])
        }
      } else {
        auxiliaryMap.set(key, [item.str])
      }
    }
  
    return cities
  }

  _toXLSXFormat({ name, cases, deaths, first_doses, second_doses }) {
    return [
      { value: name, type: 'string' },
      { value: cases, type: 'string' },
      { value: deaths, type: 'string' },
      { value: first_doses, type: 'string' },
      { value: second_doses, type: 'string' }
    ]
  }

  async _onFileLoad(e) {
    const pdf = await getDocument(e.target.result).promise
    const pages = this._pagesToExtract.map(pageNumber => pdf.getPage(pageNumber))
    const pagesPromises = await Promise.all(pages);
    const rawPagesContent = await Promise.all(pagesPromises.map(this._extractPageContent))
    const cleanPagesContent = rawPagesContent.map(this._toCleanData)

    const citiesMap = cleanPagesContent
      .map(this._toCitiesData)
      .reduce(Helpers.toSingleMap, new Map())

    const citiesCollection = []

    for (let city of citiesSet) {
      if (citiesMap.has(city)) {
        cities.push(citiesMap.get(city))
      }
    }

    const formattedCollection = citiesCollection.map(this._toXLSXFormat)

    this._xlsx.download(header, formattedCollection)
  }

  read(file) {
    const reader = new FileReader()
    reader.onload = this._onFileLoad.bind(this)

    reader.readAsArrayBuffer(file)
  }
}

export default PDF

