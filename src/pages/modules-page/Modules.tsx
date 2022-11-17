import cn from 'classnames'
import { Link } from 'react-router-dom'
import { CardButton } from '../../components/buttons/card-button/card.button'
import styleCard from '../../components/buttons/card-button/card.button.module.scss'
import { PhrasesSlider } from '../../components/slider/Phrases-slider'
import { useAppSelector } from '../../hooks/redux'
import { modulesSelectors } from '../../store/app.selectors'
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

export function Modules() {
  const modules = useAppSelector(modulesSelectors.selectAll)
  const phrases = modules[0]?.phrases

  return (
    <div className={style.module}>
      <PhrasesSlider data={phrases} />
      <RenderGroupButtons />
    </div>
  )
}
