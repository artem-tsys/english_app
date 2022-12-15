import { reject } from 'lodash'
import { ERROR_ID_IS_NOT_FOUND, ERROR_IS_NOT_CORRECT_TYPE, ERROR_UNKNOWN_VALUE } from 'src/constants/errors.constants'
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
  if (!Array.isArray(list)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  if (list.length <= 0) {
    return []
  }

  if (typeof rightAnswerId !== 'string') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  const hasLanguageField = list[0][language]
  if (!hasLanguageField) {
    throw new Error(ERROR_UNKNOWN_VALUE)
  }
  if (amount <= 0) {
    return []
  }

  const preparedListAnswers = prepareAnswers(list, language)
  const rightAnswer = getObjById(preparedListAnswers, rightAnswerId)

  if (rightAnswer === undefined) {
    throw new Error(ERROR_ID_IS_NOT_FOUND)
  }

  if (preparedListAnswers.length <= amount) {
    // must be after all checks
    return preparedListAnswers
  }

  const answersWithoutCurrent = reject(preparedListAnswers, { id: rightAnswer.id })
  const quantityWrongAnswers = amount - 1
  const wrongAnswers = getObjectsFromArrayById({
    collection: answersWithoutCurrent,
    amount: quantityWrongAnswers,
    isRandomOrder: true,
  })
  return [rightAnswer, ...wrongAnswers]
}
