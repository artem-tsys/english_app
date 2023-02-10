import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LinksExercises } from 'src/components/pages/modules/exercisesLinks'
import style from 'src/components/pages/modules/modules.module.scss'
import { MoreButton } from 'src/components/shared/buttons/More.button'
import { ShareButton } from 'src/components/shared/buttons/Share.button'
import { HeaderWithBack } from 'src/components/shared/headers/Header-with-back'
import { TermsSlider } from 'src/components/shared/slider/Terms-slider'
import { useAppDispatch } from 'src/hooks/redux'
import { useTerms } from 'src/hooks/useTerms'
import { UPDATE_MODULE_ID } from 'src/redux/general/common.slice'

export const Modules = () => {
  const dispatch = useAppDispatch()
  const { moduleId } = useParams()
  const terms = useTerms()

  useEffect(() => {
    dispatch(UPDATE_MODULE_ID(moduleId))
  }, [moduleId])

  if (!terms) {
    return null
  }

  return (
    <div className={style.module}>
      <HeaderWithBack>
        <div className={style.headerButtonsGroup}>
          <ShareButton styleName={style.buttonOffset} />
          <MoreButton />
        </div>
      </HeaderWithBack>
      <div className={style.container}>
        <TermsSlider data={terms} />
        <LinksExercises moduleId={moduleId} />
      </div>
    </div>
  )
}
