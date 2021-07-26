import zipcelx from 'zipcelx'

class XLSX {
  constructor() {}

  download(header, collection) {
    const filename = `covid-mg-${Date.now()}`

    const config = {
      filename,
      sheet: {
        data: [ header, ...collection ]
      }
    }

    zipcelx(config)
  }
}

export default XLSX