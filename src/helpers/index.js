const emptyString = ({ str }) => !!str.trim()
const uppercaseOnlyOrNumbersString = ({ str }) => /[A-Z]+[A-Z]/g.test(str) || /^[0-9.]*$/.test(str)
const uselessString = ({ str }) => ({ str }) => !/^DISTRIBUIÇÃO|^\s\*/.test(str)
const isPDF = ({ type }) => /application\/pdf/.test(type)

export default {
  uppercaseOnlyOrNumbersString,
  emptyString,
  uselessString,
  isPDF
}