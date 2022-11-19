import cn from 'classnames'
import { Link, useParams } from 'react-router-dom'
import { modulesSelectById } from 'src/redux/modules/modules.selectors'
import { CardButton } from '../../components/buttons/card-button/card.button'
import styleCard from '../../components/buttons/card-button/card.button.module.scss'
import { HeaderModules } from '../../components/headers/Header-modules'
import { PhrasesSlider } from '../../components/slider/Phrases-slider'
import { useAppSelector } from '../../hooks/redux'
import style from './modules.module.scss'

const RoutesButtons = [
  {
    path: '/',
    title: 'Карточки',
    description: 'Повторите термины и определения',
    image: '',
    disable: false,
  },
  {
    path: '/',
    title: 'Заучивание',
    description: 'Не повторяйте мои ошибки',
    image: '',
    disable: false,
  },
  {
    path: '/',
    title: 'Правописание',
    description: 'Учитесь писать правильно',
    image: '',
    disable: true,
  },
]

const RenderGroupButtons = () => (
  <div className={style.buttonsGroup}>
    {RoutesButtons.map(({ path, ...card }) => (
      <Link
        to={path}
        className={cn(styleCard.link, style.mb_sm)}
        key={path + card.title}
      >
        <CardButton {...card} />
      </Link>
    ))}
  </div>
)

export function ModulesPage() {
  const { moduleId } = useParams()
  const module = useAppSelector(modulesSelectById(moduleId ?? ''))
  const phrases = module?.phrases ?? []

  return (
    <div className={style.module}>
      <HeaderModules />
      <div className="wrapper">
        <PhrasesSlider data={phrases} />
        <RenderGroupButtons />
      </div>
    </div>
  )
}
