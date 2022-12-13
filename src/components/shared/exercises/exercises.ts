import { SelectAnswers } from 'src/components/shared/exercises/memorization/select'

export const exercises = (type) => {
  switch (type) {
    case 'select':
      return SelectAnswers
    default:
      return SelectAnswers
  }
}
