import Counterparts from './Counterparts.js'
import getSpecialCharacterRegExp from './getSpecialCharacterRegExp.js'
import removeAccentsAndDiacritics from './removeAccentsAndDiacritics.js'

/**
 * Remove all kind of special characters,
 * @param {string} str
 * @param {*} options
 */
export default function normalizeString(str, {
  // removeNumbers = false,
  // removeAccentsAndDiacritics = true,
  // removeSpecialCharacters = true,
  // removeWhitespace = false,
} = {}) {
  return [...removeAccentsAndDiacritics(str)]
    .map((char) => String(Counterparts[char]?.counterpart ?? char).toLowerCase()) // Convert all kind of special characters to their normal letter counterpart
    .join('')
    .replace(getSpecialCharacterRegExp(), '') // Remove special characters
    .toLowerCase()
}
