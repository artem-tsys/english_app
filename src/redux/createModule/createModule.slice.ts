import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import { RESET_LANGUAGE, UPDATE_LANGUAGE } from 'src/redux/createModule/createModule.constants'
import { LanguagesInitial } from 'src/types/terms'

/* eslint-disable no-param-reassign */

interface InitialState {
  languages: [LanguagesInitial, LanguagesInitial]
}

const initialState = {
  languages: [INITIAL_LANGUAGES[0], INITIAL_LANGUAGES[1]],
} as InitialState

export const createModuleSlice = createSlice({
  name: 'createModule',
  initialState,
  reducers: {
    [UPDATE_LANGUAGE]: (state, { payload: { languageKey, value } }) => {
      state.languages[languageKey] = value
    },
    [RESET_LANGUAGE]: (state) => ({ ...state, languages: initialState.languages }),
  },
})

export const { UPDATE_LANGUAGE: updateLanguage, RESET_LANGUAGE: resetLanguage } = createModuleSlice.actions
