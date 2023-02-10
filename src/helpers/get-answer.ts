import { find, includes } from 'lodash'
import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { ITerm } from 'src/types/terms'

type IGetAnswer = (terms: ITerm[], questionValue: string) => string | undefined

export const getAnswer: IGetAnswer = (terms, questionValue) => {
  if (!Array.isArray(terms) || typeof questionValue !== 'string') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  const term = find(terms, (o) => includes(o, questionValue))

  if (!term) return term

  let answer
  const entries = Object.entries(term)

  entries.forEach(([key, value]) => {
    if (key !== 'id' && value !== questionValue) {
      answer = value
    }
  })

  return answer
}
