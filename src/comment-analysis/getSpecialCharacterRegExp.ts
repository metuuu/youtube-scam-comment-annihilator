export default function getSpecialCharacterRegExp(props?: { allowedCharacters?: RegExp[], flags?: string }) {
  const { allowedCharacters = [], flags = 'gm' } = props || {}
  return new RegExp(`[^ A-Za-z0-9${allowedCharacters?.join('')}]`, flags)
}
