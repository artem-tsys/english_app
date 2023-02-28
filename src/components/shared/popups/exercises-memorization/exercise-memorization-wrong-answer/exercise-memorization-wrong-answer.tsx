import cn from 'classnames'
import { FC } from 'react'
import { SadEmoji } from 'src/components/shared/icons/sad.emoji'
import style from 'src/components/shared/popups/exercises-memorization/exercise-memorization-wrong-answer/exercise-memorization-wrong-answer.module.scss'
import { Substrate } from 'src/components/shared/popups/substrate'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { activeTermForward } from 'src/redux/exercises/exercises.slice'
import { modalDataSelector } from 'src/redux/general/common.selectors'
import stylePopup from 'src/styles/popups.module.scss'

export const SelectedWrongAnswer: FC = () => {
  const dispatch = useAppDispatch()
  const { item, answer, questionLanguage, answerLanguage } = useAppSelector(modalDataSelector)

  const nextStep = () => {
    dispatch(activeTermForward())
  }

  return (
    <>
      <div className={stylePopup.popup}>
        <div className={cn(stylePopup.popupHeader, style.header)}>
          <SadEmoji className={style.emoji} />
          <p className={style.title}>выучите этот термин!</p>
        </div>
        <div className={cn(stylePopup.popupContent, style.content)}>
          <div className={cn(style.section, style.offsetBottom)}>
            <p className={style.desc}>{item[questionLanguage]}</p>
          </div>
          <div className={style.section}>
            <span className={cn(style.helperTitle, style.helperColorSuccess)}>правильный ответ:</span>
            <p className={style.desc}>{item[answerLanguage]}</p>
          </div>
          <span className={stylePopup.divider} />
          <div className={style.section}>
            <span className={cn(style.helperTitle, style.helperColorFailed)}>вы ответили: </span>
            <p className={style.desc}>{answer.value}</p>
          </div>
          <button onClick={nextStep} className={cn(style.buttonNext, style.buttonCenter)}>
            продолжить
          </button>
        </div>
      </div>
      <Substrate />
    </>
  )
}
