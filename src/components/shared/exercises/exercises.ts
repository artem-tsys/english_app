import { SelectAnswers } from 'src/components/shared/exercises/memorization/select'

export const exercises = (type: string) => {
  switch (type) {
    case 'select':
      return SelectAnswers
    default:
      return SelectAnswers
  }
}
