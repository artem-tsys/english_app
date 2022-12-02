import style from 'src/components/cards/phrase/phrase.module.scss'
import { IPhrase } from '../../../types/phrases'

export const CardBackface = ({ data }: { data: IPhrase }) => (
  <div className={style.card}>
    <span>{data.en}</span>
  </div>
)
