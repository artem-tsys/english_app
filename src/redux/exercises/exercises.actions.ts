import { createAction } from '@reduxjs/toolkit'
import { SUBMIT_LEARNED } from 'src/redux/exercises/exercises.constans'

export const submitLearned = createAction(SUBMIT_LEARNED)
