import { Select } from 'src/components/shared/exercises/memorization/select'

export const exercises = (type) => {
  switch (type) {
    case 'select':
      return Select
    default:
      return Select
  }
}
