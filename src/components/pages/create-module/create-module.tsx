import { Formik } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addModule } from 'src/api/modules.api'
import { ButtonCreate } from 'src/components/pages/create-module/components/button-create'
import { CreateModuleHeader } from 'src/components/pages/create-module/components/header'
import { CreateModulesForm } from 'src/components/pages/create-module/create-module-form'
import style from 'src/components/pages/create-module/create-module.module.scss'
import { ERROR_VALIDATION } from 'src/constants/errors.constants'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { resetLanguage } from 'src/redux/createModule/createModule.slice'
import { SHOW_MODAL } from 'src/redux/general/common.slice'
import { IModuleInitial } from 'src/types/modules'
import { ITerm, ITermInitial } from 'src/types/terms'
import { updateKeyInObjects } from 'src/utils/changeNameKeyInObjects'
import { v4 as uuidv4 } from 'uuid'
import * as yup from 'yup'

const validateSchema = yup.object({
  title: yup.string().required(ERROR_VALIDATION.required),
  terms: yup.array().of(
    yup.object({
      [INITIAL_LANGUAGES[0]]: yup.string().required(ERROR_VALIDATION.required),
      [INITIAL_LANGUAGES[1]]: yup.string().required(ERROR_VALIDATION.required),
    }),
  ),
})

export const createTerm = (langFirst, langSecond): ITermInitial =>
  ({
    id: uuidv4(),
    [langFirst]: '',
    [langSecond]: '',
  } as ITermInitial)

const createTermWithInitialLanguages = () => createTerm(INITIAL_LANGUAGES[0], INITIAL_LANGUAGES[1])

const initialTerm = [createTermWithInitialLanguages(), createTermWithInitialLanguages()]

const defaultParams = {
  exercises: {
    memorization: {
      round: 0,
      learnedIds: [],
    },
  },
}

const createNewModule = (values, languages) => {
  const preparedTerms: ITerm[] = updateKeyInObjects(
    updateKeyInObjects(values.terms, INITIAL_LANGUAGES[0], languages[0]),
    INITIAL_LANGUAGES[1],
    languages[1],
  )

  return Object.assign(values, { terms: preparedTerms }, defaultParams)
}

const handleSubmit =
  (dispatch, languages, callback) =>
  async (values: IModuleInitial, { setSubmitting }) => {
    if (languages[0] === INITIAL_LANGUAGES[0] || languages[1] === INITIAL_LANGUAGES[1]) {
      setSubmitting(false)
      dispatch(
        SHOW_MODAL({
          name: POPUPS.REMINDER_SELECT_LANGUAGE,
        }),
      )
      return false
    }

    const newModule = createNewModule(values, languages)
    addModule(newModule)
      .then(() => {
        setSubmitting(false)
        dispatch(resetLanguage)
        callback()
      })
      .catch((error) => {
        setSubmitting(false)
        console.error(error.message)
      })
  }

export const CreateModule = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [terms, setTerms] = useState<ITermInitial[]>(initialTerm)
  const languages = useAppSelector(createModuleLanguage)

  const handleAddTerm = useCallback(
    (values) => {
      setTerms([...values.terms, createTermWithInitialLanguages()])
    },
    [setTerms],
  )

  const formikConfig = useMemo(
    () => ({
      enableReinitialize: true,
      validationSchema: validateSchema,
      validateOnMount: false,
      validateOnChange: false,
      initialValues: {
        title: '',
        terms,
        languages,
      },
      onSubmit: handleSubmit(dispatch, languages, () => navigate('/')),
    }),
    [terms, languages],
  )

  return (
    <div className={style.container}>
      <Formik {...formikConfig}>
        <>
          <CreateModuleHeader />
          <CreateModulesForm terms={terms} />
          <div className={style.footer}>
            <ButtonCreate handleAddTerm={handleAddTerm} />
          </div>
        </>
      </Formik>
    </div>
  )
}
