import { createSlice } from '@reduxjs/toolkit'
import { UPDATE_MEMORIZATION } from 'src/redux/exercises/exercises.constans'
import { actionSetModuleId } from '../general/common'

/* eslint-disable no-param-reassign */

const initialState = {
  memorization: {
    round: 0,
    learnedIds: [],
  },
  cards: {
    learned: [],
    unlearned: [],
  },
}

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    [UPDATE_MEMORIZATION]: (state, action) => {
      state.memorization = { ...state.memorization, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actionSetModuleId, (state, action) => action.payload?.exercises ?? initialState)
  },
})

// eslint-disable-next-line no-console
console.log(exercisesSlice.actions)
export const { UPDATE_MEMORIZATION: updateMemorization } = exercisesSlice.actions
