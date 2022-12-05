import { createSlice } from '@reduxjs/toolkit'
import { UPDATE_ACTIVE_PHRASE_INDEX, UPDATE_MEMORIZATION } from 'src/redux/exercises/exercises.constans'
import { UPDATE_MODULE_ID } from 'src/redux/general/common'

/* eslint-disable no-param-reassign */

interface InitialState {
  memorization: {
    round: number
    activePhraseIndex: number
    learnedIds: string[]
  }
  cards: {
    learned: []
    unlearned: []
  }
}

const initialState: InitialState = {
  memorization: {
    round: 0,
    activePhraseIndex: 0,
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
    [UPDATE_ACTIVE_PHRASE_INDEX]: (state, { payload }) => {
      state.memorization.activePhraseIndex = payload
    },
    [UPDATE_MEMORIZATION]: (state, action) => {
      state.memorization = { ...state.memorization, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UPDATE_MODULE_ID, (state, action) => action.payload?.exercises ?? initialState)
  },
})

export const { UPDATE_MEMORIZATION: updateMemorization, UPDATE_ACTIVE_PHRASE_INDEX: updateActivePhraseIndex } =
  exercisesSlice.actions
