import cn from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HeaderLanguagePopup } from 'src/components/shared/languages/components/HeaderLanguagePopup'
import { Languages } from 'src/components/shared/languages/languages'
import style from 'src/components/shared/popups/selecting-language/selecting-language.module.scss'
import { LANGUAGES } from 'src/constants/languages.constants'
import { useAppDispatch } from 'src/hooks/redux'
import { updateLanguage } from 'src/redux/createModule/createModule.slice'
import { popupDataSelector } from 'src/redux/general/common.selectors'
import { HIDE_POPUP } from 'src/redux/general/common.slice'

export const SelectingLanguage = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen] = useState<boolean>(null)
  const { animation, languageKey } = useSelector(popupDataSelector)

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
      setOpen(false)
      setTimeout(() => {
        dispatch(HIDE_POPUP())
      }, animation.animationSpeed)
    },
    [animation.animationSpeed, languageKey, dispatch],
  )

  const animations = {
    open: {
      transform: `translate(${isOpen ? '0' : '100%'})`,
      transition: `${animation.animationSpeed ?? 600}ms`,
    },
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  return (
    <div className={cn(style.container, style.animation)} style={animations.open}>
      <HeaderLanguagePopup>Язык определения</HeaderLanguagePopup>
      <Languages title="основные языки" languages={LANGUAGES} onClick={handleSelectLanguage} />
    </div>
  )
}
