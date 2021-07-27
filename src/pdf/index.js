
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import worker from 'pdfjs-dist/build/pdf.worker.entry'

import Helpers from '../helpers'

import citiesSet from '../constants/cities-set'

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

  _onFileLoad(file) {
    return new Promise(async (resolve) => {
      const pdf = await getDocument(file).promise
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
          citiesCollection.push(citiesMap.get(city))
        }
      }

      resolve(citiesCollection)
    })
  }

  read(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.onload = async e => {
        const collection = await this._onFileLoad(e.target.result)

        resolve(collection)
      }

      reader.readAsArrayBuffer(file)
    })
  }
}

export default PDF

