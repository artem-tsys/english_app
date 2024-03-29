import { reject } from 'lodash'
import { ERROR_ID_IS_NOT_FOUND, ERROR_INCORRECT_VALUE, ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { IAnswer } from 'src/types/terms'
import { getElById } from 'src/utils/getElById'
import { getObjectsById } from 'src/utils/getObjectsById'

const prepareAnswers = (list, language) =>
  list.map((el) => ({
    id: el.id,
    value: el[language],
  }))

export function generateAnswersById<T extends { id: string }>(
  list: T[],
  rightAnswerId: string,
  language: string,
  amount: number,
): IAnswer[] {
  if (!Array.isArray(list)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  if (list.length === 0 || amount === 0) {
    return []
  }

  if (typeof rightAnswerId !== 'string') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  const hasLanguageField = list[0][language]
  if (!hasLanguageField) {
    throw new Error(ERROR_INCORRECT_VALUE)
  }
  if (typeof amount !== 'number' || amount < 0) {
    throw new Error(ERROR_INCORRECT_VALUE)
  }

  const preparedListAnswers = prepareAnswers(list, language)
  const rightAnswer = getElById(preparedListAnswers, rightAnswerId)

  if (rightAnswer === undefined) {
    throw new Error(ERROR_ID_IS_NOT_FOUND)
  }

  if (preparedListAnswers.length <= amount) {
    // must be after all checks
    return preparedListAnswers
  }

  const answersWithoutCurrent = reject(preparedListAnswers, { id: rightAnswer.id })
  const quantityWrongAnswers = amount - 1
  const wrongAnswers = getObjectsById({
    collection: answersWithoutCurrent,
    amount: quantityWrongAnswers,
    isRandomOrder: true,
  })
  return [rightAnswer, ...wrongAnswers]
}
