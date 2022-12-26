import { useEffect, useMemo, useState } from 'react'
import { exercises } from 'src/components/shared/exercises/exercises'
import { typesExerciseAnswers } from 'src/components/shared/exercises/exercises.constants'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { memorizationActiveTermIndexSelector, memorizationSelector } from 'src/redux/exercises/exercises.selectors'
import { updateMemorization } from 'src/redux/exercises/exercises.slice'
import { IMemorizationIds, ITerm, Languages } from 'src/types/terms'
import { getParamsTerm } from 'src/utils/getParamsTerm'
import { getRandomElement } from 'src/utils/getRandomElement'

type IRound = (props: { roundTerms: ITerm[]; languages: Languages[] }) => JSX.Element

const prepareLearnedIds = (idsMemorization: IMemorizationIds) =>
  Object.entries(idsMemorization).filter(([, memo]) => memo.length === 2)

export const Round: IRound = ({ roundTerms, languages }) => {
  const dispatch = useAppDispatch()
  const currentTermIndex = useAppSelector(memorizationActiveTermIndexSelector)
  const { roundNumber, learnedIds } = useAppSelector(memorizationSelector)
  const [memorizationIds, setMemorizationIds] = useState<IMemorizationIds>(learnedIds)

  const term = roundTerms[currentTermIndex]
  const typesAnswers = getRandomElement(typesExerciseAnswers)

  const { isLearned, questionLanguage, answerLanguage } = useMemo(
    () => getParamsTerm(languages, learnedIds[term.id] ?? []),
    [languages, term, learnedIds],
  )

  useEffect(() => {
    if (currentTermIndex > roundTerms.length) {
      const nextRoundNumber = roundNumber + 1
      const updatedLearnedIds = prepareLearnedIds(memorizationIds)

      dispatch(
        updateMemorization({
          round: nextRoundNumber,
          learnedIds: updatedLearnedIds,
        }),
      )
    }
  }, [currentTermIndex])

  if (isLearned) return null

  const Component = exercises(typesAnswers)
  return (
    <Component
      term={term}
      questionLanguage={questionLanguage}
      answerLanguage={answerLanguage}
      setMemorizationIds={setMemorizationIds}
    />
  )
}
