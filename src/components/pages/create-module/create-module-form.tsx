import { ErrorMessage, Field, Form } from 'formik'
import React, { FC } from 'react'
import style from 'src/components/pages/create-module/create-module.module.scss'
import { CreateModulesTerms } from 'src/components/pages/create-module/create-modules-terms'
import { ErrorMessageWrapper } from 'src/components/shared/error-message-wrapper'
import { ITerm, ITermInitial } from 'src/types/terms'

type CreateModulesFormProps = {
  terms: ITerm[] | ITermInitial[]
}

export const CreateModulesForm: FC<CreateModulesFormProps> = ({ terms }) => (
  <Form className={style.form}>
    <div className={style.term}>
      <label className={style.label}>
        <Field
          type="text"
          name="title"
          className={style.field}
          placeholder="Предмет, глава, раздел"
          data-testid="module-title"
        />
        <ErrorMessage name="title" component={ErrorMessageWrapper} />
      </label>
      <div className={style.termName}>название</div>
    </div>
    <div className={style.cards}>
      {terms.map((term, index) => (
        <CreateModulesTerms key={index} term={term} fieldName={`terms[${index}]`} />
      ))}
    </div>
  </Form>
)
