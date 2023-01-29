/**
 * @param {RegExp[]} allowedCharacters
 * @returns
 */
export default function getSpecialCharacterRegExp({ allowedCharacters }) {
  return new RegExp(`[^ A-Za-z0-9${allowedCharacters.join('')}]`)
}
