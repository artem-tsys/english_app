import React, { FC } from 'react'
import { exercises } from 'src/components/shared/exercises/exercises'
import { typesExerciseAnswers } from 'src/components/shared/exercises/exercises.constants'
import { useLearned } from 'src/hooks/useLearned'
import { getRandomElement } from 'src/utils/getRandomElement'

export const Round: FC = () => {
  const { isLearned, term, questionLanguageKey, answerLanguageKey } = useLearned()

  if (isLearned) return null

  const typesAnswers = getRandomElement<string>(typesExerciseAnswers)
  const Component = exercises(typesAnswers)
  return <Component term={term} questionLanguageKey={questionLanguageKey} answerLanguageKey={answerLanguageKey} />
}
