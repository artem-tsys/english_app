import { Languages } from 'src/types/terms'
import { getObjById } from 'src/utils/getObjById'
import { getObjectsFromArrayById } from 'src/utils/getRandomElementsFromArray'

export function generateAnswersById<T extends { id: string }>(
  list: T[],
  amount: number,
  rightAnswerId: string,
  language: Languages,
) {
  const preparedListAnswers = list.map((el) => ({
    id: el.id,
    value: el[language],
  }))

  if (preparedListAnswers.length <= amount) {
    return preparedListAnswers
  }

  const rightAnswer = getObjById(preparedListAnswers, rightAnswerId)
  if (rightAnswer === undefined) {
    return []
  }

  const answersWithoutCurrent = preparedListAnswers.filter((el) => el.id !== rightAnswer.id)
  const quantityWrongAnswers = amount - 1
  const wrongAnswers = getObjectsFromArrayById({
    collection: answersWithoutCurrent,
    amount: quantityWrongAnswers,
    isRandomOrder: true,
  })
  return [rightAnswer, ...wrongAnswers]
}
