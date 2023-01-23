import { createSlice } from '@reduxjs/toolkit'
import { INCREMENT_ACTIVE_PHRASE_INDEX, UPDATE_MEMORIZATION } from 'src/redux/exercises/exercises.constans'
import { UPDATE_MODULE_ID } from 'src/redux/general/common.slice'
import { IMemorizationIds } from 'src/types/terms' /* eslint-disable no-param-reassign */

/* eslint-disable no-param-reassign */

interface InitialState {
  memorization: {
    roundNumber: number
    activeTermIndex: number
    learnedIds: IMemorizationIds
  }
}

const initialState: InitialState = {
  memorization: {
    roundNumber: 1,
    activeTermIndex: 0,
    learnedIds: {},
  },
}

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    [INCREMENT_ACTIVE_PHRASE_INDEX]: (state) => {
      state.memorization.activeTermIndex += 1
    },
    [UPDATE_MEMORIZATION]: (state, { payload: { roundNumber, learnedIds } }) => {
      state.memorization = {
        ...state.memorization,
        activeTermIndex: 0,
        roundNumber,
        learnedIds: { ...state.memorization.learnedIds, ...learnedIds },
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UPDATE_MODULE_ID, (state, action) => {
      state = action.payload?.exercises ?? initialState
    })
  },
})

export const { UPDATE_MEMORIZATION: updateMemorization, INCREMENT_ACTIVE_PHRASE_INDEX: IncrementActiveTermIndex } =
  exercisesSlice.actions
