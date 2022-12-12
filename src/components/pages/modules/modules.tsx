import cn from 'classnames'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import style from 'src/components/pages/modules/modules.module.scss'
import styleCard from 'src/components/shared/buttons/buttons.module.scss'
import { CardButton } from 'src/components/shared/buttons/Card.button'
import { MoreButton } from 'src/components/shared/buttons/More.button'
import { ShareButton } from 'src/components/shared/buttons/Share.button'
import { HeaderWithBack } from 'src/components/shared/headers/Header-with-back'
import { TermsSlider } from 'src/components/shared/slider/Terms-slider'
import { useAppDispatch, useTerms } from 'src/hooks/redux'
import { UPDATE_MODULE_ID } from 'src/redux/general/common'
import styleMain from 'src/styles/main.module.scss'

const generatePathExercises = (type: string) => (id: string | number) => `/module/${id}/${type}`

const RoutesButtons = [
  {
    createPath: generatePathExercises('cards'),
    title: 'Карточки',
    description: 'Повторите термины и определения',
    image: `${process.env.PUBLIC_URL}/cards.png`,
    disable: false,
  },
  {
    createPath: generatePathExercises('exercises'),
    title: 'Заучивание',
    description: 'Не повторяйте мои ошибки',
    image: `${process.env.PUBLIC_URL}/repeat.png`,
    disable: false,
  },
  {
    createPath: generatePathExercises(''),
    title: 'Правописание',
    description: 'Учитесь писать правильно',
    image: `${process.env.PUBLIC_URL}/hand-with-pen.png`,
    disable: true,
  },
]

const GroupLinks = ({ moduleId }: { moduleId: string }) => (
  <div className={style.buttonsGroup}>
    {RoutesButtons.map(({ createPath, ...card }) => (
      <Link to={createPath(moduleId)} className={cn(styleCard.link, style.mb_sm)} key={card.title}>
        <CardButton {...card} />
      </Link>
    ))}
  </div>
)

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
        <div className={styleMain.ms_auto}>
          <ShareButton styleName={styleMain.me_sm} />
          <MoreButton />
        </div>
      </HeaderWithBack>
      <div className="wrapper">
        <TermsSlider data={terms} />
        <GroupLinks moduleId={moduleId} />
      </div>
    </div>
  )
}
