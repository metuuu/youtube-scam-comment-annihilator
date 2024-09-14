const sumByProperty = <T>(arr: T[], property: keyof T) =>
  arr.reduce((prev, o) => prev + (o[property] as number), 0)

export default sumByProperty
