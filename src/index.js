import pdf from './pdf'
import helpers from './helpers'

import './index.css'

(() => {
  const dropArea = document.querySelector('.droparea')
  const input = document.querySelector('.input')

  const preventDefault = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  const onDropAreaClick = () => input.click()

  const highlightDropArea = () => dropArea.classList.add('-highlight')
  const removeHighlightDropArea = () => dropArea.classList.remove('-highlight')

  const onDropAreaDragOver = e => {
    preventDefault(e)
    highlightDropArea()
  }

  const onDropAreaDrop = e => {
    preventDefault(e)

    const file = Array.prototype.find.call(e.dataTransfer.items, helpers.isPDF)

    if (file) {
      pdf.read(file.getAsFile())
    }

    removeHighlightDropArea()
  }

  const onInputChange = e => {
    const file = e.target.files[0]

    if (file) {
      pdf.read(file)
    }
  }

  const onInputClick = e => {
    e.target.value = null
  }

  const dropAreaEvents = {
    'dragenter': highlightDropArea,
    'dragleave': removeHighlightDropArea,
    'dragover': onDropAreaDragOver,
    'drop': onDropAreaDrop,
    'click': onDropAreaClick,
  }

  const inputEvents = {
    'change': onInputChange,
    'click': onInputClick
  }

  Object.entries(dropAreaEvents)
    .forEach(([event, callback]) => dropArea.addEventListener(event, callback))

  Object.entries(inputEvents)
    .forEach(([event, callback]) => input.addEventListener(event, callback))
})()