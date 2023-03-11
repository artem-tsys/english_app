import cn from 'classnames'
import { uniq } from 'lodash'
import { FC } from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { useTerm } from 'src/hooks/useTerm'
import { roundTermsIdsSelector } from 'src/redux/exercises/exercises.selectors'
import style from './list-round-terms.module.scss'

const RoundTerm: FC<{ id: string }> = ({ id }) => {
  const term = useTerm(id)

  if (!term) return null

  return (
    <li className={cn(style.terms__element, style.term)}>
      <p className={style.term__word}>{term.lang1}</p>
      <p className={style.term__word}>{term.lang2}</p>
    </li>
  )
}

export const ListRoundTerms: FC = () => {
  const termsIds = useAppSelector(roundTermsIdsSelector)
  const uniqTerms = uniq(termsIds)

  return (
    <div className={style.terms}>
      <p className={style.terms__title}>Термины из этого этапа</p>
      <ul className={style.terms__list}>
        {uniqTerms.map((termId) => (
          <RoundTerm id={termId} key={termId} />
        ))}
      </ul>
    </div>
  )
}
