
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import worker from 'pdfjs-dist/build/pdf.worker.entry'

import helpers from '../helpers'
import citiesSet from '../helpers/cities-set'
import xlsx from './xlsx'

GlobalWorkerOptions.workerSrc = worker

class PDF {
  _pagesToExtract = [5, 6]

  constructor() {}

  async _extractPageContent(page) {
    const textContent = await page.getTextContent()
    const { items } = textContent
  
    return items
  }

  _toCleanData(content) {
    return content
      .filter(helpers.emptyString)
      .filter(helpers.uppercaseOnlyOrNumbersString)
      .filter(helpers.uselessString)
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

  async _onFileLoad(e) {
    const pdf = await getDocument(e.target.result).promise
    const pages = this._pagesToExtract.map(pageNumber => pdf.getPage(pageNumber))
    const promises = await Promise.all(pages);
    const rawPagesContent = await Promise.all(promises.map(this._extractPageContent))
    const cleanPagesContent = rawPagesContent.map(this._toCleanData)

    const citiesMap = cleanPagesContent
      .map(this._toCitiesData)
      .reduce(helpers.toSingleCollection, new Map())

    const cities = []

    for (let city of citiesSet) {
      if (citiesMap.has(city)) {
        cities.push(citiesMap.get(city))
      }
    }

    xlsx.download(cities)
  }

  read(file) {
    const reader = new FileReader()
    reader.onload = this._onFileLoad.bind(this)

    reader.readAsArrayBuffer(file)
  }
}

export default PDF

