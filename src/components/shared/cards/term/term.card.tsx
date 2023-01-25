import { useContext, useState } from 'react'
import { CardBackface } from 'src/components/shared/cards/term/term-backface.card'
import { CardFace } from 'src/components/shared/cards/term/term-face.card'
import style from 'src/components/shared/cards/term/term.module.scss'
import { sliderSlickContext } from 'src/context'
import { CardComponent } from 'src/types/modules'
import { ITerm } from 'src/types/terms'
import ReactCardFlip from 'src/utils/react-card-flip/react-card-flip'

export const TermCard: CardComponent<ITerm> = ({ card }) => {
  const [isFlipped, setFlipped] = useState(false)
  const { checkSwiping } = useContext(sliderSlickContext)

  const handlerSideChange = () => {
    if (checkSwiping()) return false
    setFlipped((state) => !state)
  }

  return (
    <button className={style.wrapper} onClick={handlerSideChange}>
      <ReactCardFlip isFlipped={isFlipped}>
        <CardFace data={card} />
        <CardBackface data={card} />
      </ReactCardFlip>
    </button>
  )
}
