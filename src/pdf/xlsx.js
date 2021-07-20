import zipcelx from 'zipcelx'

const download = cities => {
  const header = [
    { value: 'Cidade', type: 'string' },
    { value: 'Casos', type: 'string' },
    { value: 'Mortes', type: 'string' },
    { value: 'Dose 1', type: 'string' },
    { value: 'Dose 2', type: 'string' }
  ]

  const toXLSX = cities.map(({ name, cases, deaths, first_doses, second_doses }) => {
    return [
      { value: name, type: 'string' },
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

export default {
  download
}

