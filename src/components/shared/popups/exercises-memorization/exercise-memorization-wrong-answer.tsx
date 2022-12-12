import cn from 'classnames'
import { SadEmoji } from 'src/components/shared/icons/sad.emoji'
import style from 'src/components/shared/popups/exercises-memorization/exercise-memorization.module.scss'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { IncrementActiveTermIndex } from 'src/redux/exercises/exercises.slice'
import { popupDataSelector } from 'src/redux/general/common.selectors'
import stylePopup from 'src/styles/popups.module.scss'

export const ExerciseMemorizationWrongAnswer = () => {
  const dispatch = useAppDispatch()
  const { item, answer, questionLanguage, answerLanguage } = useAppSelector(popupDataSelector)

  const nextStep = () => {
    dispatch(IncrementActiveTermIndex())
  }

  return (
    <div className={stylePopup.popup}>
      <div className={cn(stylePopup.popupHeader, style.backgroundFailed)}>
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
  )
}
