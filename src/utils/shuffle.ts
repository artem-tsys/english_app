import { randomIntFromInterval } from 'src/utils/RandomNumber'

export const shuffle = <T>(arr: T[]) => {
  const result = [...arr]
  let currentIndex = result.length
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = randomIntFromInterval(0, result.length - 1)
    currentIndex--

    const accumulate = result[randomIndex]
    result[randomIndex] = result[currentIndex]
    result[currentIndex] = accumulate
  }

  return result
}
