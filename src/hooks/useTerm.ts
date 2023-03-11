import { useMemo, useState } from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { activeTermIndexSelector, roundTermsIdsSelector } from 'src/redux/exercises/exercises.selectors'
import { currentModuleSelector } from 'src/redux/modules/modules.selectors'
import { ITerm } from 'src/types/terms'

type UseTerm = (id?: string) => ITerm

export const useTerm: UseTerm = (id) => {
  const termsRound = useAppSelector(roundTermsIdsSelector)
  const { terms } = useAppSelector(currentModuleSelector)
  const [term, setTerm] = useState(null)
  const currentTermIndex = useAppSelector(activeTermIndexSelector)
  const currentTermId = id ?? termsRound[currentTermIndex]

  return useMemo(() => {
    if (currentTermIndex < termsRound.length) {
      const newTerm = terms.find((item) => item.id === currentTermId)
      setTerm(newTerm)

      return newTerm
    }
    return term
  }, [currentTermIndex, terms, currentTermId])
}
