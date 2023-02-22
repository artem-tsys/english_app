import React, { useEffect } from 'react'
import { exercises } from 'src/components/shared/exercises/exercises'
import { typesExerciseAnswers } from 'src/components/shared/exercises/exercises.constants'
import { useLearned } from 'src/hooks/useLearned'
import { getRandomElement } from 'src/utils/getRandomElement'

export const Round = () => {
  const { isLearned, term, questionLanguage, answerLanguage } = useLearned()

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('round', term)
  }, [])

  if (isLearned) return null

  const typesAnswers = getRandomElement(typesExerciseAnswers)
  const Component = exercises(typesAnswers)
  return <Component term={term} questionLanguage={questionLanguage} answerLanguage={answerLanguage} />
}
