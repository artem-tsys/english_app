import { useContext } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import style from 'src/components/shared/cards/modules/modules.card.module.scss'
import { sliderSlickContext } from 'src/context'
import { CardComponent, IModule } from 'src/types/modules'

export const ModulesCard: CardComponent<IModule> = ({ card, onClick }) => {
  const { checkSwiping } = useContext(sliderSlickContext)
  const handleClick = () => {
    if (checkSwiping()) return
    onClick(card.id)
  }

  return (
    <button className={style.module} onClick={handleClick}>
      <h4 className={style.title}>{card.title}</h4>
      <span className={style.count}>{card.terms.length} терминов</span>
    </button>
  )
}
