import { createSlice } from '@reduxjs/toolkit'

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
})

export const { UPDATE_MODULE_ID, HIDE_POPUP_ANIMATE, REMOVE_CURRENT_MODULE, SHOW_POPUP, HIDE_POPUP } =
  commonSlice.actions
