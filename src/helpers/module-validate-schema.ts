import { ERROR_VALIDATION } from 'src/constants/errors.constants'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import * as yup from 'yup'

export const validateSchema = yup.object({
  title: yup.string().required(ERROR_VALIDATION.required),
  terms: yup.array().of(
    yup.object({
      [INITIAL_LANGUAGES[0]]: yup.string().required(ERROR_VALIDATION.required),
      [INITIAL_LANGUAGES[1]]: yup.string().required(ERROR_VALIDATION.required),
    }),
  ),
  languages: yup.array().length(2).of(yup.string().required()),
})
