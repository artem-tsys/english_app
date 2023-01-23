import style from 'src/components/shared/cards/term/term.module.scss'
import { ITerm } from 'src/types/terms'

export const CardFace = ({ data }: { data: ITerm }) => (
  <div className={style.card}>
    <span>{data.ua}</span>
  </div>
)
