import React, { FC } from 'react'
import { exercises } from 'src/components/shared/exercises/exercises'
import { typesExerciseAnswers } from 'src/components/shared/exercises/exercises.constants'
import { useLearned } from 'src/hooks/useLearned'
import { getRandomElement } from 'src/utils/getRandomElement'

export const Round: FC = () => {
  const { isLearned, term, questionLanguage, answerLanguage } = useLearned()

  if (isLearned) return null

  const typesAnswers = getRandomElement<string>(typesExerciseAnswers)
  const Component = exercises(typesAnswers)
  return <Component term={term} questionLanguage={questionLanguage} answerLanguage={answerLanguage} />
}
