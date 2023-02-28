import { createSlice } from '@reduxjs/toolkit'
import { INITIAL_LANGUAGES } from 'src/constants/exercises.constants'
import { RESET_LANGUAGE, UPDATE_LANGUAGE } from 'src/redux/createModule/createModule.constants'
import { LanguagesInitial, LanguagesKeys } from 'src/types/languages'

/* eslint-disable no-param-reassign */
export interface InitialState {
  languages: LanguagesInitial
}

const initialState: InitialState = {
  languages: INITIAL_LANGUAGES,
}

export const createModuleSlice = createSlice({
  name: 'createModule',
  initialState,
  reducers: {
    [UPDATE_LANGUAGE]: (state, { payload: { languageKey, value } }) => {
      state.languages[languageKey] = value as LanguagesKeys
    },
    [RESET_LANGUAGE]: (state) => ({ ...state, languages: initialState.languages }),
  },
})

export const { UPDATE_LANGUAGE: updateLanguage, RESET_LANGUAGE: resetLanguage } = createModuleSlice.actions
