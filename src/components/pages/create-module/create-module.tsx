import { Formik, FormikHelpers } from 'formik'
import React, { FC, useCallback, useMemo, useState } from 'react'
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
import { AppDispatch } from 'src/redux/app'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { resetLanguage } from 'src/redux/createModule/createModule.slice'
import { SHOW_MODAL } from 'src/redux/general/common.slice'
import { InitialType, LanguagesInitial } from 'src/types/languages'
import { IModuleInitial } from 'src/types/modules'
import { ITermInitial } from 'src/types/terms'
import { arrayContaining } from 'src/utils/arrayContaining'
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
  languages: yup.array().length(2).of(yup.string().required()),
})

type CreateTerm = (langFirst: InitialType, langSecond: InitialType) => ITermInitial
export const createTerm: CreateTerm = (langFirst, langSecond) =>
  ({
    id: uuidv4(),
    [langFirst]: '',
    [langSecond]: '',
  } as ITermInitial)

const initialTerm: ITermInitial[] = [createTerm(...INITIAL_LANGUAGES), createTerm(...INITIAL_LANGUAGES)]

const defaultParams = {
  exercises: {
    memorization: {
      round: 0,
      learnedIds: [],
    },
  },
}

type CreateNewModule = (values: IModuleInitial, languages: LanguagesInitial) => IModuleInitial
const createNewModule: CreateNewModule = (values, languages) => {
  const preparedTerms: ITermInitial[] = updateKeyInObjects<ITermInitial>(
    updateKeyInObjects<ITermInitial>(values.terms, INITIAL_LANGUAGES[0], languages[0]),
    INITIAL_LANGUAGES[1],
    languages[1],
  )

  return Object.assign(values, { terms: preparedTerms }, defaultParams)
}

type HandleSubmit = (
  dispatch: AppDispatch,
  languages: LanguagesInitial,
  callback: () => void,
) => (values: IModuleInitial, { setSubmitting }: FormikHelpers<IModuleInitial>) => void

const handleSubmit: HandleSubmit =
  (dispatch, languages, callback) =>
  async (values: IModuleInitial, { setSubmitting }) => {
    if (arrayContaining(Object.keys(languages), INITIAL_LANGUAGES)) {
      setSubmitting(false)
      dispatch(
        SHOW_MODAL({
          name: POPUPS.REMINDER_SELECT_LANGUAGE,
        }),
      )
    } else {
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
  }

export const CreateModule: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [terms, setTerms] = useState<ITermInitial[]>(initialTerm)
  const languages = useAppSelector(createModuleLanguage)

  const handleAddTerm = useCallback(
    (values) => {
      setTerms([...values.terms, createTerm(...INITIAL_LANGUAGES)])
    },
    [setTerms],
  )
  const initialValues: IModuleInitial = {
    title: '',
    terms,
    languages,
  }
  const formikConfig = useMemo(
    () => ({
      enableReinitialize: true,
      validationSchema: validateSchema,
      validateOnMount: false,
      validateOnChange: false,
      initialValues,
      onSubmit: handleSubmit(dispatch, languages, () => navigate('/')),
    }),
    [dispatch, terms, languages],
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
