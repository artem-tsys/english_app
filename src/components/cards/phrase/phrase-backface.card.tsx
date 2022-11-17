import { IPhrase } from '../../../types/phrases'

export const CardBackface = ({ data }: { data: IPhrase }) => (
  <span>{data.en}</span>
)
