import { useState } from 'react'
import ReactCardFlip from 'src/utils/react-card-flip/react-card-flip'
import { CardComponent } from '../../../types/modules'
import { IPhrase } from '../../../types/phrases'
import { CardBackface } from './phrase-backface.card'
import { CardFace } from './phrase-face.card'
import style from './phrase.module.scss'

export const PhraseCard: CardComponent<IPhrase> = ({ data }) => {
  const [isFlipped, setFlipped] = useState(false)
  const handlerSideChange = (): void => {
    setFlipped((state) => !state)
  }

  return (
    <button className={style.wrapper} onClick={handlerSideChange}>
      <ReactCardFlip isFlipped={isFlipped}>
        <CardFace data={data} />
        <CardBackface data={data} />
      </ReactCardFlip>
    </button>
  )
}
