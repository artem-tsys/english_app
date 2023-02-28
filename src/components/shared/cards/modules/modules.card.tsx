import { FC, useContext } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import style from 'src/components/shared/cards/modules/modules.card.module.scss'
import { sliderSlickContext } from 'src/context'
import { IModule } from 'src/types/modules'

export type ModulesCardProps = {
  card: IModule
  onClick: (id: string) => void
}

export const ModulesCard: FC<ModulesCardProps> = ({ card, onClick }) => {
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
