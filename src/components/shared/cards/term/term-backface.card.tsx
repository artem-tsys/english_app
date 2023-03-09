import { FC } from 'react'
import style from 'src/components/shared/cards/term/term.module.scss'
import { ITerm } from 'src/types/terms'

type CardBackfaceProps = { data: ITerm }

export const CardBackface: FC<CardBackfaceProps> = ({ data }) => (
  <div className={style.card}>
    <span>{data.lang2}</span>
  </div>
)
