import cn from 'classnames'
import { uniq } from 'lodash'
import { useAppSelector } from 'src/hooks/redux'
import { useModule } from 'src/hooks/useModule'
import { useTerm } from 'src/hooks/useTerm'
import { roundTermsIdsSelector } from 'src/redux/exercises/exercises.selectors'
import style from './list-round-terms.module.scss'

const RoundTerm = ({ id }) => {
  const term = useTerm(id)
  const { languages } = useModule()

  if (!term) return null

  return (
    <li className={cn(style.terms__element, style.term)}>
      <p className={style.term__word}>{term[languages[0]]}</p>
      <p className={style.term__word}>{term[languages[1]]}</p>
    </li>
  )
}

export const ListRoundTerms = (): JSX.Element => {
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
