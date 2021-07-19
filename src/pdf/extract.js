import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import zipcelx from 'zipcelx'
import worker from 'pdfjs-dist/build/pdf.worker.entry'

import helpers from '../helpers/index.js'

GlobalWorkerOptions.workerSrc = worker

const pageContent = async page => {
  const textContent = await page.getTextContent()
  const { items } = textContent

  return items
}

const usefulData = content => {
  return content
    .filter(helpers.emptyString)
    .filter(helpers.uppercaseOnlyOrNumbersString)
    .filter(helpers.uselessString)
}

const citiesData = collection => {
  const cities = []
  const auxiliaryMap = new Map()

  for (let item of collection) {
    const key = item.transform[5] // position on y axis (row)

    if (auxiliaryMap.has(key)) {
      const valueOnKey = auxiliaryMap.get(key)

      if (valueOnKey.length === 4) {
        const [city, cases, deaths, first_doses] = valueOnKey
        const data = { city, cases, deaths, first_doses, second_doses: item.str }

        cities.push(data)
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

export default {
  pageContent,
  usefulData,
  citiesData
}