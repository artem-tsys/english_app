import { FC } from 'react'
import style from 'src/components/shared/cards/term/term.module.scss'
import { ITerm } from 'src/types/terms'

type CardFaceProps = { data: ITerm }

export const CardFace: FC<CardFaceProps> = ({ data }) => (
  <div className={style.card}>
    <span>{data.lang1}</span>
  </div>
)
