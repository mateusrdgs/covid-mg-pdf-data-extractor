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
}

export default Helpers