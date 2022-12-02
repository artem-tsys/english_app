type Arg = number | string | null | undefined

export const isEqual = (first: Arg, second: Arg) => {
  if (typeof first === typeof second) {
    return first === second
  }
  throw Error()
}
