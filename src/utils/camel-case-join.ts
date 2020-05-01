import capitalizeFirstLetter from './capitalize-first-letter'

function camelCaseJoin (words: string[]) {
  const joint = words.reduce((acc, word = '', index) => {
    const current = index ? capitalizeFirstLetter(word) : word
    const str = acc + current
    return str
  }, '')
  return joint
}

export default camelCaseJoin
