import { ErrorMessage, Field, useFormikContext } from 'formik'
import React, { FC, ReactNode } from 'react'
import style from 'src/components/pages/create-module/create-module.module.scss'
import { ErrorMessageWrapper } from 'src/components/shared/error-message-wrapper'

interface ITermProps {
  title: string
  nameField: string
  children?: ReactNode
}

export const Term: FC<ITermProps> = ({ title, nameField, children }) => {
  const formik = useFormikContext()

  return (
    <div className={style.term} data-testid="term">
      <label className={style.label} data-testid="term-name">
        <Field
          type="text"
          name={nameField}
          className={style.field}
          onChange={formik.handleChange}
          data-testid="term-name-field"
          value={formik.values[nameField]}
        />
        {children}
      </label>
      <ErrorMessage name={nameField} component={ErrorMessageWrapper} />
      <div className={style.termName}>{title}</div>
    </div>
  )
}
