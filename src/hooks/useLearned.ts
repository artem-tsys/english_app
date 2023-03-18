import { useMemo } from 'react'
import { useAppSelector } from 'src/hooks/redux'
import { useTerm } from 'src/hooks/useTerm'
import { learnedTermsSelector } from 'src/redux/exercises/exercises.selectors'
import { currentModuleSelector } from 'src/redux/modules/modules.selectors'
import { IParamsTerm, ITerm } from 'src/types/terms'
import { getParamsTerm } from 'src/utils/getParamsTerm'

type IUseLearned = () => {
  term: ITerm
} & IParamsTerm

export const useLearned: IUseLearned = () => {
  const { languages } = useAppSelector(currentModuleSelector)
  const learnedIds = useAppSelector(learnedTermsSelector)
  const term = useTerm()

  return useMemo(() => {
    const params = getParamsTerm(languages, learnedIds[term.id])

    return {
      ...params,
      term,
    }
  }, [term, learnedIds])
}
