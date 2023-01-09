import { find, includes } from 'lodash'
import { ITerm } from 'src/types/terms'

type IGetAnswer = (terms: ITerm[], questionValue: string) => string

export const getAnswer: IGetAnswer = (terms, questionValue) => {
  const term = find(terms, (o) => includes(o, questionValue))
  const entries = Object.entries(term)

  const result = entries.reduce((acc, [key, value]) => {
    if (key !== 'id' && value !== questionValue) {
      return value
    }
  }, '')
  return result
}
