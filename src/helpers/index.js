import { headerMap } from '../constants/xlsx-header'

class Helpers {

  static emptyString({ str }) {
    return !!str.trim()
  }

  static uppercaseOnlyOrNumbersString({ str }) {
    return /[A-Z]+[A-Z]/g.test(str) || /^[0-9.]*$/.test(str)
  }

  static dirtyString({ str }) {
    return !/^DISTRIBUIÇÃO|^\s\*/.test(str)
  }

  static isPDFFile({ type }) {
    return /application\/pdf/.test(type)
  }

  static toSingleMap(acc, collection) {
    return new Map([...acc, ...collection])
  }

  static formPayloadToSchema(payload) {
    const schema = new Set()

    for (let key in payload) {
      const value = payload[key]
      if (value === 'on') {
        schema.add(key)
      }
    }

    return schema
  }

  static schemaToHeader(schema) {
    const header = []

    for(let key of schema) {
      header.push({ value: headerMap[key], type: 'string' })
    }

    return header
  }
}

export default Helpers