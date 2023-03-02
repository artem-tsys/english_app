import React, { FC } from 'react'
import { LanguageButton } from 'src/components/shared/buttons/Language.button'
import { Term } from 'src/components/shared/modules/components/term/term'
import style from 'src/components/shared/modules/module-form/module-form.module.scss'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { SHOW_MODAL } from 'src/redux/general/common.slice'
import { ITerm } from 'src/types/terms'

type IModulesGroup = FC<{ term: ITerm; fieldName: string }>

export const ModulesGroup: IModulesGroup = ({ term, fieldName }) => {
  const dispatch = useAppDispatch()
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

  // eslint-disable-next-line no-console
  console.log('languages', languages)

  return (
    <div className={style.form__group} data-testid="term-group" key={term.id}>
      <Term title="термин" nameField={`${fieldName}.${languages[0]}`}>
        <LanguageButton onClick={handleSelectLang} text={languages[0]} langKey={0} />
      </Term>
      <Term title="определение" nameField={`${fieldName}.${languages[1]}`}>
        <LanguageButton onClick={handleSelectLang} text={languages[1]} langKey={1} />
      </Term>
    </div>
  )
}
