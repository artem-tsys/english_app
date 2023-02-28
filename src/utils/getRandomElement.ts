import { random } from 'lodash'
import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'

type GetRandomElement = <T>(types: T[]) => T

export const getRandomElement: GetRandomElement = (types) => {
  if (!Array.isArray(types)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  if (types.length === 0) {
    return undefined
  }

  const index = random(0, types.length - 1)
  return types[index]
}
