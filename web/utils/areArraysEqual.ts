const areArraysEqual = <T>(a: T[], b?: T[]) =>
  a.length === b?.length && a.every((v, i) => v === b[i])

export default areArraysEqual
