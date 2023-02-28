import { useAppSelector } from 'src/hooks/redux'
import { useModule } from 'src/hooks/useModule'
import { activeTermIndexSelector, roundTermsIdsSelector } from 'src/redux/exercises/exercises.selectors'
import { ITerm } from 'src/types/terms'

type UseTerm = (id?: string) => ITerm

export const useTerm: UseTerm = (id) => {
  const termsRound = useAppSelector(roundTermsIdsSelector)
  const { terms } = useModule()
  const currentTermIndex = useAppSelector(activeTermIndexSelector)
  const currentTermId = id ?? termsRound[currentTermIndex]

  return terms.find((term) => term.id === currentTermId)
}
