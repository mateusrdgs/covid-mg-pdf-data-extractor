
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import worker from 'pdfjs-dist/build/pdf.worker.entry'

import helpers from '../helpers'
import extract from './extract'
import xlsx from './xlsx'

GlobalWorkerOptions.workerSrc = worker

const onFileLoad = async e => {
  const pagesToExtract = [5, 6]

  const pdf = await getDocument(e.target.result).promise
  const pages = await Promise.all(pagesToExtract.map(pageNumber => pdf.getPage(pageNumber)))
  const rawPagesContent = await Promise.all(pages.map(extract.pageContent))
  const cleanPagesContent = rawPagesContent.map(extract.usefulData)

  const cities = cleanPagesContent
    .map(extract.citiesData)
    .reduce(helpers.toSingleCollection, [])

  xlsx.download(cities)
}

const read = file => {
  const reader = new FileReader()
  reader.onload = onFileLoad
  reader.readAsArrayBuffer(file)
}

export default {
  read
}

