export default function removeAccentsAndDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
