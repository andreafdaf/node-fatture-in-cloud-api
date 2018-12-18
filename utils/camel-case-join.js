const capitalizeFirstLetter = require('./capitalize-first-letter')

function camelCaseJoin (words) {
  const joint = words.reduce((acc, word = '', index) => {
    const current = index ? capitalizeFirstLetter(word) : word
    const str = acc + current
    return str
  }, '')
  return joint
}

module.exports = camelCaseJoin
