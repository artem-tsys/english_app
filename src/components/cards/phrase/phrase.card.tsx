import { FC, useState } from 'react'
import { CardComponent } from '../../../types/modules'
import { IPhrase } from '../../../types/phrases'
import { CardBackface } from './phrase-backface.card'
import { CardFace } from './phrase-face.card'
import style from './phrase.module.scss'

type SideCardName = 'face' | 'backface'

interface IPhraseSideProps {
  data: IPhrase
}

const mapSideCard: Record<SideCardName, FC<IPhraseSideProps>> = {
  face: CardFace,
  backface: CardBackface,
}

export const PhraseCard: CardComponent<IPhrase> = ({ data }) => {
  const [typeSide, setTypeSide] = useState<SideCardName>('face')
  const handlerSideChange = (): void => {
    setTypeSide((state: string) => (state === 'face' ? 'backface' : 'face'))
  }
  const SideOfCard: FC<IPhraseSideProps> = mapSideCard[typeSide]

  return (
    <button className={style.card} onClick={handlerSideChange}>
      <SideOfCard data={data} />
    </button>
  )
}
