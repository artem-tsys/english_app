import { Formik, FormikHelpers } from 'formik'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateModule } from 'src/api/modules.api'
import style from 'src/components/pages/edit-module/edit-module.module.scss'
import ButtonCreate from 'src/components/shared/modules/components/button-create'
import ModuleHeader from 'src/components/shared/modules/components/header'
import { ModulesForm } from 'src/components/shared/modules/module-form/module-form'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { createTerm } from 'src/helpers/create-term'
import { validateSchema } from 'src/helpers/module-validate-schema'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { useModule } from 'src/hooks/useModule'
import { AppDispatch } from 'src/redux/app'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { resetLanguage } from 'src/redux/createModule/createModule.slice'
import { SHOW_MODAL } from 'src/redux/general/common.slice'
import { Languages } from 'src/types/languages'
import { IModule } from 'src/types/modules'
import { ITerm } from 'src/types/terms'
import { updateKeyInObjects } from 'src/utils/changeNameKeyInObjects'

type PrepareModule = (moduleId: string, values: IModule, languages: Languages) => IModule
const prepareModule: PrepareModule = (moduleId, values, languages) => {
  const preparedTerms: ITerm[] = updateKeyInObjects<ITerm>(
    updateKeyInObjects<ITerm>(values.terms, INITIAL_LANGUAGES[0], languages[0]),
    INITIAL_LANGUAGES[1],
    languages[1],
  )
  const module: IModule = Object.assign(values, { terms: preparedTerms })

  const preparedModule: IModule = {
    ...module,
    languages,
    exercises: {
      memorization: {
        round: 1,
        isLearned: false,
        learnedIds: [],
      },
    },
  }

  return preparedModule
}

type HandleSubmit = (
  dispatch: AppDispatch,
  languages: Languages,
  module: IModule,
  callback: () => void,
) => (values: IModule, { setSubmitting }: FormikHelpers<IModule>) => void

const handleSubmit: HandleSubmit =
  (dispatch, languages, module, callback) =>
  async (values: IModule, { setSubmitting }) => {
    if (languages.lang1 && languages.lang2) {
      const preparedModule = prepareModule(module.id, values, languages)

      updateModule(module.id, preparedModule)
        .then(() => {
          setSubmitting(false)
          dispatch(resetLanguage)
          callback()
        })
        .catch((error) => {
          setSubmitting(false)
          console.error(error.message)
        })
    } else {
      setSubmitting(false)
      dispatch(
        SHOW_MODAL({
          name: POPUPS.REMINDER_SELECT_LANGUAGE,
        }),
      )
    }
  }

export const EditModule: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const languages = useAppSelector(createModuleLanguage)
  const module = useModule()
  const [terms, setTerms] = useState<ITerm[]>(module.terms)

  const handleAddTerm = useCallback(
    (values) => {
      setTerms([...values.terms, createTerm(INITIAL_LANGUAGES)])
    },
    [setTerms],
  )

  const initialValues: IModule = {
    ...module,
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
      onSubmit: handleSubmit(dispatch, languages, module, () => navigate('/')),
    }),
    [dispatch, terms, languages],
  )

  useEffect(() => {
    if (!module) {
      navigate('/')
    }
  }, [])

  return (
    <div className={style.container}>
      <Formik {...formikConfig}>
        <>
          <ModuleHeader title="Редактировать модуль" />
          <ModulesForm terms={terms} />
          <div className={style.footer}>
            <ButtonCreate handleAddTerm={handleAddTerm} />
          </div>
        </>
      </Formik>
    </div>
  )
}
