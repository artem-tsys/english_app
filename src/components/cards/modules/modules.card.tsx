import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import style from 'src/components/cards/modules/modules.card.module.scss'
import { IModule } from '../../../types/modules'

type IModulesCard = (props: { data: IModule; handleClick?: (id: string) => () => void }) => JSX.Element

const handleClickDefault = () => () => {}

export const ModulesCard: IModulesCard = ({ data, handleClick = handleClickDefault }) => (
  <button className={style.module} onClick={handleClick(data.id)}>
    <h4 className={style.title}>{data.title}</h4>
    <span className={style.count}>{data.phrases.length} терминов</span>
  </button>
)
