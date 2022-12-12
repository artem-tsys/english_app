import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import style from 'src/components/shared/cards/modules/modules.card.module.scss'
import { IModule } from 'src/types/modules'

type IModulesCard = (props: { card: IModule; handleClick?: (id: string) => () => void }) => JSX.Element

const handleClickDefault = () => () => {}

export const ModulesCard: IModulesCard = ({ card, handleClick = handleClickDefault }) => (
  <button className={style.module} onClick={handleClick(card.id)}>
    <h4 className={style.title}>{card.title}</h4>
    <span className={style.count}>{card.terms.length} терминов</span>
  </button>
)
