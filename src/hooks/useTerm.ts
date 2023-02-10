import { useAppSelector } from 'src/hooks/redux'
import { useModule } from 'src/hooks/useModule'
import { activeTermIndexSelector, roundTermsSelector } from 'src/redux/exercises/exercises.selectors'

export const useTerm = () => {
  const termsRound = useAppSelector(roundTermsSelector)
  const { terms } = useModule()
  const currentTermIndex = useAppSelector(activeTermIndexSelector)
  const currentTermId = termsRound[currentTermIndex]

  return terms.find((term) => term.id === currentTermId)
}
