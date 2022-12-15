import { Languages } from 'src/types/terms'
import { getObjById } from 'src/utils/getObjById'
import { getObjectsFromArrayById } from 'src/utils/getRandomElementsFromArray'

const prepareAnswers = (list, language) =>
  list.map((el) => ({
    id: el.id,
    value: el[language],
  }))

export function generateAnswersById<T extends { id: string }>(
  list: T[],
  rightAnswerId: string,
  language: Languages,
  amount: number,
) {
  const preparedListAnswers = prepareAnswers(list, language)

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
