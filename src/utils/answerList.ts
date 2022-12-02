import { getObjById } from 'src/utils/getObjById'
import { ObjectsFromArrayById } from 'src/utils/getRandomElementsFromArray'

export function getAnswersListById<T extends { id: string }>(
  list: T[],
  countAnswer: number,
  rightAnswerId: string,
): T[] {
  if (list.length <= countAnswer) {
    return list
  }

  const rightAnswer = getObjById(list, rightAnswerId)
  if (rightAnswer === undefined) {
    return []
  }

  const answersWithoutCurrent = list.filter((el) => el.id !== rightAnswer.id)
  const constructorAnswers = new ObjectsFromArrayById('random')
  const quantityWrongAnswers = countAnswer - 1
  const wrongAnswers = constructorAnswers.create<T>(answersWithoutCurrent, quantityWrongAnswers)
  return [rightAnswer, ...wrongAnswers]
}
