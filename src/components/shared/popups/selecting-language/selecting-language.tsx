import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { HeaderLanguagePopup } from 'src/components/shared/languages/components/HeaderLanguagePopup'
import { Languages } from 'src/components/shared/languages/languages'
import style from 'src/components/shared/popups/selecting-language/selecting-language.module.scss'
import { LANGUAGES } from 'src/constants/languages.constants'
import { useAppDispatch } from 'src/hooks/redux'
import { updateLanguage } from 'src/redux/createModule/createModule.slice'
import { popupDataSelector } from 'src/redux/general/common.selectors'
import { HIDE_POPUP_ANIMATE } from 'src/redux/general/common.slice'

export const SelectingLanguage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { languageKey } = useSelector(popupDataSelector)

  const handleSelectLanguage = useCallback(
    (event: React.SyntheticEvent<EventTarget>) => {
      if (!(event.target instanceof HTMLButtonElement)) {
        return
      }

      const language = event.target.dataset.value
      dispatch(
        updateLanguage({
          languageKey,
          value: language,
        }),
      )
      dispatch(HIDE_POPUP_ANIMATE())
    },
    [languageKey, dispatch],
  )

  return (
    <div className={style.container}>
      <HeaderLanguagePopup>Язык определения</HeaderLanguagePopup>
      <Languages title="основные языки" languages={LANGUAGES} onClick={handleSelectLanguage} />
    </div>
  )
}
