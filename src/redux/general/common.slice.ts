import { createSlice } from '@reduxjs/toolkit'
import { IncrementActiveTermIndex } from 'src/redux/exercises/exercises.slice'

/* eslint-disable no-param-reassign */
const initialState = {
  moduleId: null,
  popup: null,
  popupData: null,
  popupAnimateDestroy: false,
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    SHOW_POPUP: (state, { payload }) => {
      state.popup = payload.popup
      state.popupData = payload.popupData
    },
    HIDE_POPUP: (state) => {
      state.popup = null
      state.popupData = null
      state.popupAnimateDestroy = false
    },
    HIDE_POPUP_ANIMATE: (state) => {
      state.popupAnimateDestroy = true
    },
    UPDATE_MODULE_ID: (state, action) => {
      state.moduleId = action.payload
    },
    REMOVE_CURRENT_MODULE(state) {
      state.moduleId = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(IncrementActiveTermIndex, (state) => {
      state.popup = null
      state.popupData = null
    })
  },
})

export const { UPDATE_MODULE_ID, HIDE_POPUP_ANIMATE, REMOVE_CURRENT_MODULE, SHOW_POPUP, HIDE_POPUP } =
  commonSlice.actions
