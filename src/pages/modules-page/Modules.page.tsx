import cn from 'classnames'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HeaderWithBack } from 'src/components/headers/Header-with-back'
import { CardButton } from 'src/components/shared/buttons/Card.button'
import { MoreButton } from 'src/components/shared/buttons/More.button'
import { ShareButton } from 'src/components/shared/buttons/Share.button'
import { actionSetModuleId } from 'src/redux/general/common'
import { modulesSelectById } from 'src/redux/modules/modules.selectors'
import styleMain from 'src/styles/main.module.scss'
import styleCard from '../../components/shared/buttons/buttons.module.scss'
import { PhrasesSlider } from '../../components/slider/Phrases-slider'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import style from './modules.module.scss'

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

export function ModulesPage() {
  const dispatch = useAppDispatch()
  const params = useParams<{ moduleId: string }>()
  const common = useAppSelector((state) => state.common)
  const moduleId = common.moduleId ?? params.moduleId

  const module = useAppSelector(modulesSelectById(moduleId ?? ''))
  const phrases = module?.phrases ?? []

  useEffect(() => {
    dispatch(actionSetModuleId(moduleId))
  }, [moduleId])

  if (!moduleId) {
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
        <PhrasesSlider data={phrases} />
        <GroupLinks moduleId={moduleId} />
      </div>
    </div>
  )
}
