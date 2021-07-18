
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import zipcelx from 'zipcelx'
import worker from 'pdfjs-dist/build/pdf.worker.entry'

import helpers from '../helpers/index.js'

GlobalWorkerOptions.workerSrc = worker

const cities = []

const getPagesContent = async page => {
  const textContent = await page.getTextContent()
  const { items } = textContent

  return items
}

const extractPageContent = content => {
  return content
    .filter(helpers.emptyString)
    .filter(helpers.uppercaseOnlyOrNumbersString)
    .filter(helpers.uselessString)
}

const populateCitiesMap = collection => {
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
}

const onFileLoad = async e => {
  const pagesToExtract = [5, 6]

  const pdf = await getDocument(e.target.result).promise
  const pages = await Promise.all(pagesToExtract.map(pageNumber => pdf.getPage(pageNumber)))
  const rawPagesContent = await Promise.all(pages.map(getPagesContent))
  const cleanPagesContent = rawPagesContent.map(extractPageContent)

  cleanPagesContent.forEach(populateCitiesMap)

  const header = [
    { value: 'Cidade', type: 'string' },
    { value: 'Casos', type: 'string' },
    { value: 'Mortes', type: 'string' },
    { value: 'Dose 1', type: 'string' },
    { value: 'Dose 2', type: 'string' }
  ]

  const toXLSX = cities.map(({ city, cases, deaths, first_doses, second_doses }) => {
    return [
      { value: city, type: 'string' },
      { value: cases, type: 'string' },
      { value: deaths, type: 'string' },
      { value: first_doses, type: 'string' },
      { value: second_doses, type: 'string' }
    ]
  })

  const config = {
    filename: `covid-mg-${Date.now()}`,
    sheet: {
      data: [
        header,
        ...toXLSX
      ]
    }
  }

  zipcelx(config)
}

const read = file => {
  const reader = new FileReader()
  reader.onload = onFileLoad
  reader.readAsArrayBuffer(file)
}

export default {
  read
}

