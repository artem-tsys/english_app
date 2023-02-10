import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import {
  ACTIVE_TERM_FORWARD,
  ADD_LEANED_TERM,
  ADD_LEANED_TERM_ROUND,
  END_MEMORIZATION_MODE,
  ROUND_FORWARD,
  SUBMIT_LEARNED,
  UPDATE_TERMS_ROUND,
} from 'src/redux/exercises/exercises.constans'
import { UPDATE_MODULE_ID } from 'src/redux/general/common.slice'
import { IMemorizationIds } from 'src/types/terms'

/* eslint-disable no-param-reassign */
interface InitialState {
  learnedIds: string[]
  memorization: {
    isLearned: boolean
    roundNumber: number
    activeTermIndex: number
    termsRound: string[]
    learnedTermsRound: IMemorizationIds
  }
}

const initialRound = {
  activeTermIndex: 0,
  termsRound: [],
  learnedTermsRound: {},
}

const initialState: InitialState = {
  learnedIds: [],
  memorization: {
    isLearned: false,
    roundNumber: 1,
    ...initialRound,
  },
}

export const exercisesSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    [ADD_LEANED_TERM]: (state) => {
      const { learnedTermsRound } = state.memorization
      Object.entries(learnedTermsRound).forEach(([id, value]) => {
        if (value.length === INITIAL_LANGUAGES.length) {
          state.learnedIds.push(id)
        }
      })
    },
    [ADD_LEANED_TERM_ROUND]: (state, { payload }) => {
      const prevValue = state.memorization.learnedTermsRound[payload.id] ?? []
      const learnedId = { [payload.id]: [...prevValue, payload.value] }
      state.memorization.learnedTermsRound = { ...state.memorization.learnedTermsRound, ...learnedId }
    },
    [ROUND_FORWARD]: (state) => {
      state.memorization.roundNumber += 1
      state.memorization.activeTermIndex = 0
      state.memorization.learnedTermsRound = {}
    },
    [ACTIVE_TERM_FORWARD]: (state) => {
      state.memorization.activeTermIndex += 1
    },
    [SUBMIT_LEARNED]: (state, { payload }) => {
      state.learnedIds = { ...state.learnedIds, ...payload }
    },
    [UPDATE_TERMS_ROUND]: (state, { payload }) => {
      state.memorization.termsRound = payload
    },
    [END_MEMORIZATION_MODE]: (state) => {
      state.memorization.isLearned = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UPDATE_MODULE_ID, (state, action) => action.payload?.exercises ?? initialState)
    builder.addCase(END_MEMORIZATION_MODE, (state) => {
      state.memorization = {
        ...state.memorization,
        ...initialRound,
      }
    })
  },
})

export const {
  ACTIVE_TERM_FORWARD: activeTermForward,
  ADD_LEANED_TERM: addLearnedTerm,
  ROUND_FORWARD: roundForward,
  ADD_LEANED_TERM_ROUND: addLearnedTermRound,
  UPDATE_TERMS_ROUND: updateTermsRound,
  END_MEMORIZATION_MODE: endMemorizationMode,
} = exercisesSlice.actions
