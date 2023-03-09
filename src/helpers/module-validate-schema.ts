import { ERROR_VALIDATION } from 'src/constants/errors.constants'
import * as yup from 'yup'

export const validateSchema = yup.object().shape({
  title: yup.string().required(ERROR_VALIDATION.required),
  terms: yup.array().of(
    yup.object({
      lang1: yup.string().required(ERROR_VALIDATION.required),
      lang2: yup.string().required(ERROR_VALIDATION.required),
    }),
  ),
})
