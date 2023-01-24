import { ErrorMessage, Field, Form } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addModule } from 'src/api/modules.api'
import { ButtonAddTerm } from 'src/components/pages/create-module/components/buttonAddTerm'
import { CreateModuleHeader } from 'src/components/pages/create-module/components/header'
import { CreateModulesForm } from 'src/components/pages/create-module/create-module-form'
import style from 'src/components/pages/create-module/create-module.module.scss'
import { CreateModulesTerms } from 'src/components/pages/create-module/create-modules-terms'
import { ErrorMessageWrapper } from 'src/components/shared/ErrorMessageWrapper'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { resetLanguage } from 'src/redux/createModule/createModule.slice'
import { SHOW_POPUP } from 'src/redux/general/common.slice'
import { IModuleInitial } from 'src/types/modules'
import { ITerm, ITermInitial } from 'src/types/terms'
import { updateKeyInObjects } from 'src/utils/changeNameKeyInObjects'
import { v4 as uuidv4 } from 'uuid'

export const createTerm = (langFirst, langSecond): ITermInitial =>
  ({
    id: uuidv4(),
    [langFirst]: '',
    [langSecond]: '',
  } as ITermInitial)

const createTermWithInitialLanguages = () => createTerm(INITIAL_LANGUAGES[0], INITIAL_LANGUAGES[1])

const initialTerm = [createTermWithInitialLanguages(), createTermWithInitialLanguages()]

export const CreateModule = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [terms, setTerms] = useState<ITermInitial[]>(initialTerm)
  const languages = useAppSelector(createModuleLanguage)

  const handleSubmit = useCallback(
    async (values: IModuleInitial, { setSubmitting }) => {
      if (languages[0] === INITIAL_LANGUAGES[0] || languages[1] === INITIAL_LANGUAGES[1]) {
        setSubmitting(false)
        dispatch(
          SHOW_POPUP({
            popup: POPUPS.REMINDER_SELECT_LANGUAGE,
          }),
        )
        return false
      }

      const preparedTerms: ITerm[] = updateKeyInObjects(
        updateKeyInObjects(values.terms, INITIAL_LANGUAGES[0], languages[0]),
        INITIAL_LANGUAGES[1],
        languages[1],
      )
      const result: IModuleInitial = Object.assign(values, { terms: preparedTerms })

      addModule(result)
        .then(() => {
          setSubmitting(false)
          dispatch(resetLanguage)
          navigate('/')
        })
        .catch((error) => {
          setSubmitting(false)
          console.error(error.message)
        })
    },
    [languages],
  )

  const handleAddTerm = useCallback(
    (values) => {
      setTerms([...values.terms, createTermWithInitialLanguages()])
    },
    [setTerms],
  )

  const initialState = useMemo<IModuleInitial>(
    () => ({
      title: '',
      terms,
      languages,
    }),
    [terms],
  )

  return (
    <div className={style.container}>
      <CreateModulesForm initialValues={initialState} onSubmit={handleSubmit}>
        <>
          <CreateModuleHeader />
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
                <ErrorMessageWrapper>
                  <ErrorMessage name="title" />
                </ErrorMessageWrapper>
              </label>
              <div className={style.termName}>название</div>
            </div>
            <CreateModulesTerms terms={terms} />
          </Form>
          <div className={style.footer}>
            <ButtonAddTerm handleAddTerm={handleAddTerm} />
          </div>
        </>
      </CreateModulesForm>
    </div>
  )
}
