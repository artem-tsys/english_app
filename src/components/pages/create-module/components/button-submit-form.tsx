import { useFormikContext } from 'formik'
import React from 'react'
import style from 'src/components/pages/create-module/create-module.module.scss'

export const ButtonSubmitForm = (): JSX.Element => {
  const formik = useFormikContext()
  return (
    <button type="button" className={style.buttonSubmit} onClick={formik.submitForm} data-testid="btn-submit-form">
      готово
    </button>
  )
}
