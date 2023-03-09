import { useFormikContext } from 'formik'
import React, { FC, useEffect } from 'react'
import { LanguageButton } from 'src/components/shared/buttons/Language.button'
import Term from 'src/components/shared/modules/components/term'
import style from 'src/components/shared/modules/module-form/module-form.module.scss'
import { LANGUAGES } from 'src/constants/languages.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { SHOW_MODAL } from 'src/redux/general/common.slice'
import { ITerm } from 'src/types/terms'

type IModulesGroup = FC<{ term: ITerm; fieldName: string }>

export const ModulesGroup: IModulesGroup = ({ term, fieldName }) => {
  const dispatch = useAppDispatch()
  const formik = useFormikContext()
  const languages = useAppSelector(createModuleLanguage)
  const handleSelectLang = (node) => {
    dispatch(
      SHOW_MODAL({
        name: POPUPS.SELECTING_LANGUAGE,
        data: {
          languageKey: node.target.dataset.langkey,
        },
        animate: true,
      }),
    )
  }

  useEffect(() => {
    formik.setFieldValue('languages', languages)
  }, [languages])

  return (
    <div className={style.form__group} data-testid="term-group" key={term.id}>
      <Term title="термин" nameField={`${fieldName}.lang1`}>
        <LanguageButton
          onClick={handleSelectLang}
          text={LANGUAGES[languages.lang1] ?? 'select language'}
          langKey="lang1"
        />
      </Term>
      <Term title="определение" nameField={`${fieldName}.lang2`}>
        <LanguageButton
          onClick={handleSelectLang}
          text={LANGUAGES[languages.lang2] ?? 'select language'}
          langKey="lang2"
        />
      </Term>
    </div>
  )
}
