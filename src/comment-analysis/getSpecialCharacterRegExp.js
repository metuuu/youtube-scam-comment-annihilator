/**
 * @param {object} props
 * @param {RegExp[]} [props.allowedCharacters]
 * @returns
 */
export default function getSpecialCharacterRegExp(props = {}) {
  const { allowedCharacters = [], flags = 'gm' } = props
  return new RegExp(`[^ A-Za-z0-9${allowedCharacters?.join('')}]`, flags)
}
