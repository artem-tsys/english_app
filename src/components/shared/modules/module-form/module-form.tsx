import { Form } from 'formik'
import React, { FC } from 'react'
import Term from 'src/components/shared/modules/components/term'
import { ModulesGroup } from 'src/components/shared/modules/module-form/module-form-group'
import style from 'src/components/shared/modules/module-form/module-form.module.scss'
import { ITerm, ITermInitial } from 'src/types/terms'

type CreateModulesFormProps = {
  terms: ITerm[] | ITermInitial[]
}

export const ModulesForm: FC<CreateModulesFormProps> = ({ terms }) => (
  <Form className={style.form}>
    <Term title="название" nameField="title" />
    <div className={style.form__groups}>
      {terms.map((term, index) => (
        <ModulesGroup key={index} term={term} fieldName={`terms[${index}]`} />
      ))}
    </div>
  </Form>
)
