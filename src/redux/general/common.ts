import { createSlice } from '@reduxjs/toolkit'

/* eslint-disable no-param-reassign */
const initialState = {
  moduleId: null,
  popup: null,
  popupData: null,
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
    },
    UPDATE_MODULE_ID: (state, action) => {
      state.moduleId = action.payload
    },
    REMOVE_CURRENT_MODULE(state) {
      state.moduleId = null
    },
  },
})

export const { UPDATE_MODULE_ID, REMOVE_CURRENT_MODULE, SHOW_POPUP, HIDE_POPUP } = commonSlice.actions
