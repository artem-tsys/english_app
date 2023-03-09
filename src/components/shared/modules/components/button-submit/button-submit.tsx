import { useFormikContext } from 'formik'
import React, { FC } from 'react'
import style from './button-submit.module.scss'

export const ButtonSubmit: FC = () => {
  const formik = useFormikContext()

  return (
    <button type="button" className={style.button} onClick={formik.submitForm} data-testid="btn-submit-form">
      готово
    </button>
  )
}
