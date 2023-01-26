import React from 'react'
import { Term } from 'src/components/pages/create-module/components/termField'
import { LanguageButton } from 'src/components/shared/buttons/Language.button'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { createModuleLanguage } from 'src/redux/createModule/createModule.selectors'
import { SHOW_POPUP } from 'src/redux/general/common.slice'
import { ITerm } from 'src/types/terms'
import style from './create-module.module.scss'

type ICreateModulesTerms = ({ terms }: { terms: ITerm[] }) => JSX.Element

export const CreateModulesTerms: ICreateModulesTerms = ({ terms }) => {
  const dispatch = useAppDispatch()
  const languages = useAppSelector(createModuleLanguage)
  const handleSelectLang = (node) => {
    dispatch(
      SHOW_POPUP({
        popup: POPUPS.SELECTING_LANGUAGE,
        popupData: {
          languageKey: node.target.dataset.langkey,
        },
      }),
    )
  }

  return (
    <div className={style.cards}>
      {terms.map((term, index) => (
        <div className={style.card} data-testid="term-group" key={term.id}>
          <Term title="термин" nameField={`terms[${index}].${INITIAL_LANGUAGES[0]}`}>
            <LanguageButton onClick={handleSelectLang} text={languages[0]} langKey={0} />
          </Term>
          <Term title="определение" nameField={`terms[${index}].${INITIAL_LANGUAGES[1]}`}>
            <LanguageButton onClick={handleSelectLang} text={languages[1]} langKey={1} />
          </Term>
        </div>
      ))}
    </div>
  )
}
