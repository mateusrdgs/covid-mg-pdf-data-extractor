import zipcelx from 'zipcelx'

class XLSX {
  constructor() {}

  async download(header, collection) {
    const filename = `covid-mg-${Date.now()}`

    const config = {
      filename,
      sheet: {
        data: [ header, ...collection ]
      }
    }

    await zipcelx(config)
  }
}

export default XLSX