import { randomIntFromInterval } from 'src/utils/RandomNumber'

export const getRandomElement = (types) => {
  const index = randomIntFromInterval(0, types.length)
  return types[index]
}
