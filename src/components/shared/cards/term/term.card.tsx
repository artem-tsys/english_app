import { useState } from 'react'
import ReactCardFlip from 'src/utils/react-card-flip/react-card-flip'
import { CardComponent } from 'src/types/modules'
import { ITerm } from 'src/types/terms'
import { CardBackface } from 'src/components/shared/cards/term/term-backface.card'
import { CardFace } from 'src/components/shared/cards/term/term-face.card'
import style from 'src/components/shared/cards/term/term.module.scss'

export const TermCard: CardComponent<ITerm> = ({ card }) => {
  const [isFlipped, setFlipped] = useState(false)
  const handlerSideChange = (): void => {
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
